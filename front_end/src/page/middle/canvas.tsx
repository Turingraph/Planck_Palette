import { useContext, useEffect, useReducer, useRef, useState } from "react"
import { is_arr_has } from "../../atom/arr/utils"
import { t_act_canvas_draw } from "../../atom/canvas/draw/type"
import act_canvas, { t_setss_canvas } from "../../atom/canvas/main"
import { t_act_canvas_select } from "../../atom/canvas/select/type"
import { t_paint_state } from "../../atom/canvas/utils/type"
import { init_canvas } from "../../atom/canvas/utils/utils"
import * as a from "../../atom/type/alias"
import { GLOBAL_CONTEXT_USE_STATE } from "../../molecule/hook/global_context"
import { RefThrottle } from "../../molecule/hook/Throttle"
import style from "./canvas.module.css"

function default_grid_color(rgb:undefined|string, index:number, width:number)
{
	if (rgb)
		return rgb
	let gray = "#333333"
	if (index % 2 === 0 && Math.floor(index/width) % 2 === 1)
		gray = "#555555"
	if (index % 2 === 1 && Math.floor(index/width) % 2 === 0)
		gray = "#555555"
	return gray
}

function highlight_grid(select:boolean)
{
	return 	<div className="fill" style={{
	backgroundColor:select ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0)"
	}}></div>
}

function on_click_paint_pen(
	SS_ToolMode:number, 
	// pencil:Omit<t_paint_grids<"rgb">, "grid">,
	pencil:t_paint_state<"rgb"> & {size:number},
	index:number[],
	setSS_Canvas:t_setss_canvas
){
	if (SS_ToolMode === 0)
		setSS_Canvas({...pencil, ...{type:"DRAW_PEN", grids:index}} as t_act_canvas_draw)
	if (SS_ToolMode === 1)
		setSS_Canvas({...pencil, ...{type:"DRAW_ERASER", grids:index}} as t_act_canvas_draw)
	if (SS_ToolMode === 3)
		setSS_Canvas({...pencil, ...{type:"DRAW_MIRROR", grids:index}} as t_act_canvas_draw)
}

function on_hover_grid(
	SS_PixelSize:number,
	select:boolean,
	grid:number,
	setSS_Canvas:t_setss_canvas
){
	setSS_Canvas({key:"select" as "select", size:SS_PixelSize, 
		state:select, grid:grid} as t_act_canvas_select)
}

export default function CANVAS({
	canvas_width,
	grid_width = "25px" as a.t_css,
	canvas_height,
	grid_height = "25px" as a.t_css,
}:{
	canvas_width:number
	grid_width?:a.t_css
	canvas_height:number
	grid_height?:a.t_css
})
{
	const {ss: SS_RGBArr, setss: setSS_RGBArr} = useContext(GLOBAL_CONTEXT_USE_STATE).rgb_arr
	const SS_ToolMode = useContext(GLOBAL_CONTEXT_USE_STATE).tool_mode.ss
	const {ss: SS_NewRGB, setss: setSS_NewRGB } = useContext(GLOBAL_CONTEXT_USE_STATE).new_rgb
	const PixelSize = useContext(GLOBAL_CONTEXT_USE_STATE).pixel_size.ss
	const [SS_PixelSize, setSS_PixelSize] = useState<number>(PixelSize)
	const Ref_MouseDown = useRef<boolean>(false)
	const [SS_Canvas, setSS_Canvas] = useReducer(act_canvas, init_canvas(canvas_height, canvas_width))
	const Ref_Time = useRef(0)
	const Ref_GridStateArr = useRef<number[]|undefined>(undefined)
	useEffect(()=>{
		if (SS_ToolMode > 3 && SS_PixelSize !== 1)
			setSS_PixelSize(1)
		else if (SS_ToolMode <= 3 && SS_PixelSize !== PixelSize)
			setSS_PixelSize(PixelSize)
	}, [PixelSize, SS_PixelSize, SS_ToolMode])
	return <div
		className={`${style.canvas} no_ghost_drag`}
		style ={{
			gridTemplateRows:"repeat("+canvas_height+", "+grid_height+")",
			gridTemplateColumns:"repeat("+canvas_width+", "+grid_width+")"
		}}
		draggable={false}
	>{
		SS_Canvas.arr.map((item, index:number)=>{
			return <div key={index} 
			className="no_ghost_drag"
			draggable={false}
			onMouseEnter={()=>{on_hover_grid(SS_PixelSize, true , index, setSS_Canvas)}}
			onMouseLeave={()=>{on_hover_grid(SS_PixelSize, false, index, setSS_Canvas)}}
			onMouseDown={()=>{Ref_MouseDown.current = true}}
			onMouseUp={()=>{
				Ref_MouseDown.current = false
				Ref_GridStateArr.current = []
			}}
			onClick={()=>{
				on_click_paint_pen(
					SS_ToolMode, 
					{state:SS_NewRGB, key:"rgb" as "rgb", size:SS_PixelSize},
					[index],
					setSS_Canvas
				)
				if ([0, 3].includes(SS_ToolMode) && 
					is_arr_has(SS_RGBArr, SS_NewRGB, "rgb") === false)
					setSS_RGBArr({type:"PUSH", input:{id:0, rgb:SS_NewRGB, select:false}})
			}}
			onMouseMove={()=>{
			if (Ref_MouseDown.current === true)
			{
				if (!Ref_GridStateArr.current)
					Ref_GridStateArr.current = []
				Ref_GridStateArr.current.push(index)
				RefThrottle(Ref_Time, Ref_GridStateArr, 100,
					((input:number[])=>{
						on_click_paint_pen(
							SS_ToolMode, 
							{state:SS_NewRGB, key:"rgb" as "rgb", size:SS_PixelSize},
							input,
							setSS_Canvas
						)
					}) as a.t_func_x<number[]>)
				if (SS_ToolMode === 10)
				{
					if (item.rgb !== undefined)
						setSS_NewRGB(item.rgb)
				}
				if ([0, 3].includes(SS_ToolMode) && 
					is_arr_has(SS_RGBArr, SS_NewRGB, "rgb") === false)
					setSS_RGBArr({type:"PUSH", input:{id:0, rgb:SS_NewRGB, select:false}})
			}
		}}
			style={{
				backgroundColor:default_grid_color(
				item.plan_rgb ? item.plan_rgb : item.rgb, index, SS_Canvas.width),
				width:grid_width,
				height:grid_height,
			}}>
			{highlight_grid(item.select)}
			</div>
		})
	}</div>
}