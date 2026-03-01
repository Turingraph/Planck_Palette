import * as fc from "fabric"
import { useContext, useEffect, useRef } from "react"
import * as a from "../../atom/type/alias"
import { f_throttle } from "../../molecule/hook/Throttle"
import { CONTEXT_CANVAS } from "../../molecule/hook/context"
import { draw_straight_line_freely_in_canvas, get_point_grids, update_grids } from "./paint"
import { t_canvas_mouse_down, t_canvas_on_click, t_dim, t_practical_shape } from "./type"

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

// https://www.geeksforgeeks.org/javascript/
// fabric-js-polygon-lockmovementx-property/
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
		scale:"LOCAL",
		func:((input)=>{}) as a.t_func_x<t_practical_shape>
	},
}:{
	pixel_size?:number,
	pixel_rgb:string|undefined,
	f_on_click:t_canvas_on_click,
	f_mouse_down?:t_canvas_mouse_down,
})
{
	const {grid, all_grids, canvas} = useContext(CONTEXT_CANVAS)
	const Ref_Time = useRef<number>(0)
	const Ref_Canvas = useRef<null|any>(null)
	const Ref_CurrentGrid = useRef<number>(0)
	const Ref_PrevGrid = useRef<undefined|number>(undefined)
	const Ref_FirstGrid = useRef<undefined|number>(undefined)
	const Ref_MouseDown = useRef<boolean>(false)
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
			init_canvas.add(new fc.Group(group, group_config))
			init_canvas.add(new fc.Group(group_hover, group_config))
			function mouse_update_grid(e:any, func:a.t_func_x<number>, include_edge:boolean = false)
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
					Ref_CurrentGrid.current = hover
					init_canvas.requestRenderAll()
				}
				else if (Ref_MouseDown.current === true && include_edge === true)
				{
					const mouse_position_index = {
						w:Math.floor(mouse_position.w/grid.w),
						h:Math.floor(mouse_position.h/grid.h),
					}
					if (f_mouse_down.scale === "GLOBAL" && Ref_FirstGrid.current && Ref_PrevGrid.current)
					{
						f_mouse_down.func({size:pixel_size, rgb:undefined, target:group_hover,
							grid_1:Ref_FirstGrid.current, grid_2:Ref_PrevGrid.current})
					}
					const first_grid_index = Ref_FirstGrid.current ? {
						w:Ref_FirstGrid.current % width,
						h:Math.floor(Ref_FirstGrid.current/width)
					} : undefined
					const prev_grid_index = Ref_PrevGrid.current ? {
						w:Ref_PrevGrid.current % width,
						h:Math.floor(Ref_PrevGrid.current/width)
					} : undefined
					if (first_grid_index !== undefined && f_mouse_down.scale === "GLOBAL" && Ref_FirstGrid.current)
					{
						const edge_girds = draw_straight_line_freely_in_canvas(all_grids, first_grid_index, mouse_position_index)
						const edge_current = edge_girds[0] === Ref_FirstGrid.current ? edge_girds[edge_girds.length - 1] : edge_girds[0]
						f_mouse_down.func({size:pixel_size, rgb:pixel_rgb, target:group_hover,
							grid_1:Ref_FirstGrid.current, grid_2:edge_current})
						Ref_PrevGrid.current = Ref_CurrentGrid.current
						Ref_CurrentGrid.current = edge_current
					}
					if (prev_grid_index !== undefined && f_mouse_down.scale === "LOCAL" && Ref_PrevGrid.current)
					{
						const edge_girds = draw_straight_line_freely_in_canvas(all_grids, prev_grid_index, mouse_position_index)
						const edge_current = edge_girds[0] === Ref_PrevGrid.current ? edge_girds[edge_girds.length - 1] : edge_girds[0]
						f_mouse_down.func({size:pixel_size, rgb:pixel_rgb, target:group,
							grid_1:Ref_PrevGrid.current, grid_2:edge_current})
						Ref_PrevGrid.current = undefined
						Ref_MouseDown.current = false
					}
					init_canvas.requestRenderAll()
				}
			}
			function do_not_hover()
			{
				update_grids(
					get_point_grids(all_grids, {grid:Ref_CurrentGrid.current, size:pixel_size}),
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
					if (Ref_CurrentGrid.current !== undefined){
						do_not_hover()
						init_canvas.requestRenderAll()
					}
				},
				"mouse:down":(e:any)=>{
					Ref_MouseDown.current = true
					do_not_hover()
					mouse_update_grid(e, ((input:number)=>{
						f_on_click({grid:input, size:pixel_size, rgb:pixel_rgb,
							target:group})
						Ref_PrevGrid.current = input
						Ref_FirstGrid.current = input
					}) as a.t_func_x<number>)
				},
				"mouse:up":()=>{
					if (f_mouse_down.scale === "GLOBAL" && Ref_FirstGrid.current && Ref_PrevGrid.current)
						f_mouse_down.func({size:pixel_size, rgb:undefined, target:group_hover,
							grid_1:Ref_FirstGrid.current, grid_2:Ref_PrevGrid.current})
					if (f_mouse_down.scale === "GLOBAL" && Ref_FirstGrid.current && Ref_CurrentGrid.current)
					{
						f_mouse_down.func({size:pixel_size, rgb:undefined, target:group_hover,
							grid_1:Ref_FirstGrid.current, grid_2:Ref_CurrentGrid.current})
						f_mouse_down.func({size:pixel_size, rgb:pixel_rgb, target:group,
							grid_1:Ref_FirstGrid.current, grid_2:Ref_CurrentGrid.current})
					}
					Ref_PrevGrid.current = undefined
					Ref_FirstGrid.current = undefined
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
							if (f_mouse_down.scale === "GLOBAL" && Ref_FirstGrid.current && Ref_PrevGrid.current)
								f_mouse_down.func({size:pixel_size, rgb:undefined, target:group_hover,
									grid_1:Ref_FirstGrid.current, grid_2:Ref_PrevGrid.current})
							if (f_mouse_down.scale === "GLOBAL" && Ref_FirstGrid.current && Ref_CurrentGrid.current)
								f_mouse_down.func({size:pixel_size, rgb:pixel_rgb, target:group_hover,
									grid_1:Ref_FirstGrid.current, grid_2:Ref_CurrentGrid.current})
							else if (f_mouse_down.scale === "LOCAL" && Ref_PrevGrid.current && Ref_CurrentGrid.current)
								f_mouse_down.func({size:pixel_size, rgb:pixel_rgb, target:group,
									grid_1:Ref_PrevGrid.current, grid_2:Ref_CurrentGrid.current})
							Ref_PrevGrid.current = Ref_CurrentGrid.current
						}
					}) as a.t_func_x<number>, true)
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
