import * as fc from "fabric"
import { useContext, useEffect, useRef } from "react"
import { get_point_grids, update_grids } from "./paint"
import { t_canvas_on_click, t_dim, t_rgb_point } from "./type"
import * as a from "../../atom/type/alias"
import { f_throttle } from "../../molecule/hook/Throttle"
import { CONTEXT_CANVAS } from "../../molecule/hook/context"

const canvas_config = {
	cssOnly: true,
	defaultCursor:"default",
	// https://stackoverflow.com/questions/50470313/
	// removing-highlighting-blue-rectangle-for-selection-in-fabric-js
	selection:false
}

const square_config = {
	fill:"#FFFFFF00",
	strokeWidth:0,
	selectable: false,
	cursor:'crosshair',
}

const group_config = {
	subTargetCheck: true,
	selectable: false,
	lockMovementX: true,
	lockMovementY: true,
}

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

export default function CANVAS_BASIC({
	pixel_size = 1,
	pixel_rgb,
	f_on_click,
	f_mouse_down = {
		func:((input)=>{}) as a.t_func_x<t_rgb_point & {target:fc.Polyline[]}>,
		target:"NORMAL"
	},
}:{
	pixel_size?:number,
	pixel_rgb:string|undefined,
	f_on_click:t_canvas_on_click,
	f_mouse_down?:t_canvas_on_click,
})
{
	const {grid, all_grids, canvas} = useContext(CONTEXT_CANVAS)
	const Ref_Time = useRef<number>(0)
	const Ref_Canvas = useRef<null|any>(null)
	const Ref_Hover = useRef<undefined|number>(undefined)
	const Ref_MouseDown = useRef<boolean>(false)
	// const pixel_size = useContext(CONTEXT_USE_STATE_GLOBAL).pixel_size.ss
	useEffect(()=>{
			const init_canvas = new fc.Canvas(Ref_Canvas.current,
			{...{
				width:  canvas.w,
				height: canvas.h,
			},...canvas_config})
			init_canvas.backgroundColor = "#f66"
			const width = all_grids.w
			const height = all_grids.h
			const border = {
				h:Math.floor((canvas.h - grid.h * all_grids.h)/2),
				w:Math.floor((canvas.w - grid.w * all_grids.w)/2)
			} as t_dim
			let group = [] as fc.Polyline[]
			let group_hover = [] as fc.Polyline[]
			let i = 0
			while (i < width*height)
			{
				const color = default_grid_color(undefined, i, width)
				const left = i % width
				const up = Math.floor(i / width)
				const position = [
					{ x: grid.w * (left + 0) + border.w, y: grid.h * (up + 0) + border.h},
					{ x: grid.w * (left + 1) + border.w, y: grid.h * (up + 0) + border.h},
					{ x: grid.w * (left + 1) + border.w, y: grid.h * (up + 1) + border.h},
					{ x: grid.w * (left + 0) + border.w, y: grid.h * (up + 1) + border.h},
				]
				group.push(new fc.Polyline(position,{...square_config, ...{fill:color}}))
				group_hover.push(new fc.Polyline(position,square_config))
				i += 1
			}
			// https://www.geeksforgeeks.org/javascript/
			// fabric-js-polygon-lockmovementx-property/
			init_canvas.add(new fc.Group(group, group_config))
			init_canvas.add(new fc.Group(group_hover, group_config))
			function mouse_update_grid(e:any, func:a.t_func_x<number>)
			{
				const affine_constant = {
					w:Ref_Canvas.current.getBoundingClientRect().left, 
					h:Ref_Canvas.current.getBoundingClientRect().top} as t_dim
				const mouse_position = {
					w:e.e.clientX - affine_constant.w, 
					h:e.e.clientY - affine_constant.h} as t_dim
				const grid_position = {
					w:Math.floor((mouse_position.w - border.w)/grid.w),
					h:Math.floor((mouse_position.h - border.h)/grid.h)
				} as t_dim
				const hover = grid_position.h*width + grid_position.w
				if (mouse_position.w >= 0 && 
					mouse_position.h >= 0 && 
					mouse_position.w <= canvas.w && 
					mouse_position.h <= canvas.h 
				)
				{
					func(hover)
					Ref_Hover.current = hover
					init_canvas.requestRenderAll()
				}
			}
			function do_not_hover()
			{
				if (Ref_Hover.current)
					update_grids(
						get_point_grids(all_grids, {grid:Ref_Hover.current, size:pixel_size}),
						group_hover, "#FFFFFF00")
			}
			init_canvas.on({
				// https://stackoverflow.com/questions/41848370/
				// fabricjs-change-cursor-for-every-object
				"mouse:over":(e:any)=>{
					if (e.target)
						e.target.hoverCursor = init_canvas.defaultCursor;
				},
				"mouse:out":()=>{
					if (Ref_Hover.current !== undefined){
						do_not_hover()
						if (Ref_MouseDown.current === true && f_mouse_down.target === "HOVER")
							f_mouse_down.func({grid:Ref_Hover.current, rgb:undefined, size:pixel_size, target:group_hover})		
						Ref_MouseDown.current = false
						Ref_Hover.current = undefined
						init_canvas.requestRenderAll()
					}
				},
				"mouse:down":(e:any)=>{
					Ref_MouseDown.current = true
					do_not_hover()
					mouse_update_grid(e, ((input:number)=>{
						f_on_click.func({grid:input, size:pixel_size, rgb:pixel_rgb,
							target:f_on_click.target === "HOVER" ? group_hover : group})
					}) as a.t_func_x<number>)
				},
				"mouse:up":()=>{
					if (Ref_MouseDown.current === true && Ref_Hover.current && f_mouse_down.target === "HOVER")
					{
						f_mouse_down.func({grid:Ref_Hover.current, rgb:pixel_rgb, size:pixel_size, target:group})
						f_mouse_down.func({grid:Ref_Hover.current, rgb:undefined, size:pixel_size, target:group_hover})
					}
					Ref_MouseDown.current = false
				},
				"mouse:move":(e:any)=>{
					f_throttle(Ref_Time, 10, (()=>{
					mouse_update_grid(e,((input:number)=>{
						do_not_hover()
						if (Ref_MouseDown.current === false)
							update_grids(
								get_point_grids(all_grids, {grid:input, size:pixel_size}),
								group_hover, "#FFFFFF55")
						else
						{
							let target = group
							if (Ref_Hover.current && f_mouse_down.target === "HOVER")
							{
								target = group_hover
								f_mouse_down.func({grid:Ref_Hover.current, size:pixel_size, 
									rgb:undefined, target:target})
							}
							f_mouse_down.func({grid:input, size:pixel_size, 
								rgb:pixel_rgb, target:target})
						}
					}) as a.t_func_x<number>)
					}) as a.t_func)
				}
			})
			init_canvas.renderAll()
			return ()=>{init_canvas.dispose()}
		})
	return <div className="fill center_box">
		<canvas id="fabrik_canvas" ref={Ref_Canvas}></canvas>
	</div>
}
