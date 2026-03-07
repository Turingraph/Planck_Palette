import * as fc from "fabric";
import { RefObject } from "react";
import * as a from "../../../atom/type/alias";
import { f_throttle } from "../../../molecule/hook/Throttle";
import { paint_a_point } from "../draw/draw_fc_canvas";
import { t_dim } from "../utils/type";

export function do_hover(
	all_grids:t_dim,
	target:fc.Polyline[],
	size:number
){
	function output_func(input:{grid:number, rgb:undefined|string})
	{
		paint_a_point(
			all_grids,
			input.grid,
			{size:size, target:target, rgb:input.rgb}
		)
	}
	return output_func as a.t_func_x<{grid:number, rgb:undefined|string}>
}

export function event_hover(
	main_canvas:fc.Canvas,
	f_get_grid_index:a.t_func_xy<any, number|undefined>,
	f_hover:a.t_func_x<{grid:number, rgb:undefined|string}>,
	Ref_Time:RefObject<number>
){
	const Ref_CurrentGrid = {current:undefined} as {current:undefined|number}
	const do_not_hover = function() {
		if (Ref_CurrentGrid.current !== undefined)
		{
			f_hover({
				grid:Ref_CurrentGrid.current,
				rgb:undefined
			})
			main_canvas.requestRenderAll()
		}
	}
	const move_hover = function(e:any) {
		f_throttle(Ref_Time, 10, (()=>{
		if (Ref_CurrentGrid.current !== undefined)
		{
			f_hover({
				grid:Ref_CurrentGrid.current,
				rgb:undefined
			})
		}
		const hover_grid = f_get_grid_index(e)
		if (hover_grid !== undefined)
		{
			f_hover({
				grid:hover_grid,
				rgb:"#FFFFFF55"
			})
			main_canvas.requestRenderAll()
		}
		Ref_CurrentGrid.current = hover_grid
		}) as a.t_func)
	}
	main_canvas.on({
		"mouse:out":do_not_hover,
		"mouse:down":do_not_hover,
		"mouse:move":(e)=>move_hover(e)
	})
	return Ref_CurrentGrid
}

export function event_mouse_down(
	main_canvas:fc.Canvas,
	Ref_MouseDown:RefObject<boolean>
){
	main_canvas.on({
		"mouse:down":()=>{
			Ref_MouseDown.current = true
		},
		"mouse:up":()=>{
			Ref_MouseDown.current = false
		}
	})
}

// https://stackoverflow.com/questions/18737058/
// how-to-remove-event-listener-from-fabricjs-canvas
// export function remove_event(
// 	main_canvas:fc.Canvas,
// 	event_type:"mouse:down"|"mouse:up"|"mouse:out"|"mouse:move",
// 	event_handle:any
// ){
// 	main_canvas.off(event_type, event_handle)
// }
