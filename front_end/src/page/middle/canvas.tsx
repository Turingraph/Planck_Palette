import { useContext, useEffect, useReducer, useState } from "react"
import { is_arr_has } from "../../atom/arr/utils"
import act_canvas from "../../atom/canvas/main"
import { init_canvas } from "../../atom/canvas/utils/utils"
import * as a from "../../atom/type/alias"
import { GLOBAL_CONTEXT_USE_STATE } from "../../molecule/hook/global_context"
import style from "./canvas.module.css"
import { t_paint_state } from "../../atom/canvas/utils/type"
import { t_act_canvas_draw } from "../../atom/canvas/draw/type"
import { t_act_canvas_select } from "../../atom/canvas/select/type"

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

function on_click_paint_1_grid(
	SS_ToolMode:number, 
	// pencil:Omit<t_paint_grids<"rgb">, "grid">,
	pencil:t_paint_state<"rgb"> & {size:number},
	index:number
){
	if (SS_ToolMode === 0)
		return {...pencil, ...{type:"DRAW_PEN", grid:index}}
	if (SS_ToolMode === 1)
		return {...pencil, ...{type:"DRAW_ERASER", grid:index}}
	if (SS_ToolMode === 3)
		return {...pencil, ...{type:"DRAW_MIRROR", grid:index}}
}

function on_hover_grid(
	SS_PixelSize:number,
	select:boolean,
	grid:number
){
	return {key:"select" as "select", size:SS_PixelSize, 
		state:select, grid:grid} as t_act_canvas_select
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
	const [SS_Canvas, setSS_Canvas] = useReducer(act_canvas, init_canvas(canvas_height, canvas_width))
	useEffect(()=>{
		if (SS_ToolMode > 3 && SS_PixelSize !== 1)
			setSS_PixelSize(1)
		else if (SS_ToolMode <= 3 && SS_PixelSize !== PixelSize)
			setSS_PixelSize(PixelSize)
	}, [PixelSize, SS_PixelSize, SS_ToolMode])
	return <div
		className={`${style.canvas}`}
		style ={{
			gridTemplateRows:"repeat("+canvas_height+", "+grid_height+")",
			gridTemplateColumns:"repeat("+canvas_width+", "+grid_width+")"
		}}
	>{
		SS_Canvas.arr.map((item, index:number)=>{
			return <div key={index} 
			onMouseEnter={()=>{setSS_Canvas(on_hover_grid(SS_PixelSize, true , index))}}
			onMouseLeave={()=>{setSS_Canvas(on_hover_grid(SS_PixelSize, false, index))}}
			onClick={()=>{
				setSS_Canvas(on_click_paint_1_grid(
					SS_ToolMode, 
					{state:SS_NewRGB, key:"rgb" as "rgb", size:SS_PixelSize},
					index,
				) as t_act_canvas_draw)
				if (SS_ToolMode === 10)
				{
					if (item.rgb !== undefined)
						setSS_NewRGB(item.rgb)
				}
				if ([0, 3].includes(SS_ToolMode))
				{
					if (is_arr_has(SS_RGBArr, SS_NewRGB, "rgb") === false)
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