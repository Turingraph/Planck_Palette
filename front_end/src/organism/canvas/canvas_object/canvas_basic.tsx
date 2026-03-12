import * as fc from "fabric"
import { useContext, useEffect, useRef } from "react"
import * as a from "../../../atom/type/alias"
import { create_border, create_canvas, create_grids } from "../canvas_action/create_canvas"
import { do_hover, event_hover, event_mouse_down } from "../canvas_action/hover_event"
import { event_on_click_grid, event_draw_throttle_global } from "../canvas_action/paint_event"
import { get_edge_index, is_mouse_in_canvas, mouse_to_ith_grid } from "../utils/calculate_hover_position"
import { t_canvas_on_click, t_practical_shape } from "../utils/type"
import { CONTEXT_CANVAS, CX_SS_PAINT_TOOL } from "../utils/context"

// https://www.geeksforgeeks.org/javascript/
// fabric-js-polygon-lockmovementx-property/
const group_config = {
	subTargetCheck: true,
	selectable: false,
	lockMovementX: true,
	lockMovementY: true,
}

export default function CANVAS_BASIC({
	pixel_size = 1,
	f_on_click,
	f_mouse_down = ((input)=>{}) as a.t_func_x<t_practical_shape>,
}:{
	pixel_size?:number,
	f_on_click:t_canvas_on_click,
	f_mouse_down?:a.t_func_x<t_practical_shape>,
})
{
	const pixel_rgb = useContext(CX_SS_PAINT_TOOL).new_rgb.ss
	const {grid, all_grids, canvas} = useContext(CONTEXT_CANVAS)
	const Ref_TimeHover = useRef<number>(0)
	const Ref_TimePaint = useRef<number>(0)
	const Ref_Canvas = useRef<null|any>(null)
	const Ref_MouseDown = useRef<boolean>(false)
	const width = all_grids.w
	const border = create_border(canvas, all_grids, grid)
	const get_grid_index_inout_canvas = function(e:any, prev_grid:undefined|number = undefined)
	{
		const {mouse_position, hover} = mouse_to_ith_grid(
			Ref_Canvas, {w:e.e.clientX, h:e.e.clientY}, grid, border, width)
		if (is_mouse_in_canvas(mouse_position, canvas))
			return hover
		if (prev_grid !== undefined)
		{
			let output = get_edge_index(prev_grid, width, all_grids, grid, mouse_position)
			return output !== undefined ? output * -1 : undefined
		}
		return undefined
	}
	useEffect(()=>{
			const main_canvas = create_canvas(Ref_Canvas, canvas)
			let group = create_grids(all_grids, border, grid, false)
			let group_hover = create_grids(all_grids, border, grid, true)
			main_canvas.add(new fc.Group(group, group_config))
			main_canvas.add(new fc.Group(group_hover, group_config))
			event_hover(
				main_canvas, ((e:any)=>{
					if (Ref_MouseDown.current === true)
						return undefined
					return get_grid_index_inout_canvas(e)
				}) as a.t_func_xy<any, number|undefined>, 
				do_hover(all_grids, group_hover, pixel_size), Ref_TimeHover
			)
			event_mouse_down(main_canvas, Ref_MouseDown)
			event_on_click_grid(
				main_canvas,
				((input:number)=>{
					f_on_click({
						grid:input,
						rgb:pixel_rgb,
						size:pixel_size,
						target:group
					})
				}) as a.t_func_x<number>,
				((input:any)=>{
					return get_grid_index_inout_canvas(input, undefined)
				}) as a.t_func_xy<any, number|undefined>,
			)
			/*
			event_draw_throttle_local(
				// main_canvas
				main_canvas,
				// f_get_grid_index
				((input:{e:any, prev_grid:(number|undefined)})=>{
					return get_grid_index_inout_canvas(input.e, input.prev_grid)
				}) as a.t_func_xy<{e:any, prev_grid:(number|undefined)}, number|undefined>,
				// f_mouse_down
				((input:{grid_1:number,grid_2:number})=>{
					if (Ref_MouseDown.current === true)
						f_mouse_down({
							grid_1:input.grid_1,
							grid_2:input.grid_2,
							rgb:pixel_rgb,
							size:pixel_size,
							target:group
						})
				}) as a.t_func_x<{grid_1:number,grid_2:number}>,
				// Ref_Time
				Ref_TimePaint
			)			
			*/
			const global_grid_config = {
				rgb:pixel_rgb,
				target:group_hover,
				size:pixel_size
			}
			event_draw_throttle_global(
				// main_canvas
				main_canvas,
				// f_get_grid_index
				((input:{e:any, prev_grid:(number|undefined)})=>{
					return get_grid_index_inout_canvas(input.e, input.prev_grid)
				}) as a.t_func_xy<{e:any, prev_grid:(number|undefined)}, number|undefined>,
				// config
				global_grid_config,
				// f_mouse_down
				f_mouse_down as a.t_func_x<t_practical_shape>,
				group,
				// Ref_Time
				Ref_TimePaint
			)
			main_canvas.renderAll()
			return ()=>{main_canvas.dispose()}
		})
	return <div className="fill center_box">
		<canvas id="fabrik_canvas" ref={Ref_Canvas}></canvas>
	</div>
}
