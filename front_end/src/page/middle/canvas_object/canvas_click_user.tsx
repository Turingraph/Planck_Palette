import * as fc from "fabric";
import { useContext } from "react";
import * as a from "../../../atom/type/alias";
import { CONTEXT_CANVAS, CONTEXT_USE_STATE_GLOBAL } from "../../../molecule/hook/context";
import { draw_thicker_straight_line, update_grids } from "../draw/draw_fc_canvas";
import { get_point_grids } from "../draw/draw_point";
import { t_practical_shape, t_rgb_point } from "../utils/type";
import CANVAS_BASIC from "./canvas_basic";
// import CANVAS_BASIC from "../canvas_action/canvas_basic";

/*
export default function CANVAS_CLICK_USER()
{
	// const tool_mode = useContext(CONTEXT_SS_GLOBAL_STUDIO).tool_mode
	const pixel_rgb = useContext(CONTEXT_USE_STATE_GLOBAL).new_rgb.ss
	const pixel_size = useContext(CONTEXT_USE_STATE_GLOBAL).pixel_size.ss
	const all_grids = useContext(CONTEXT_CANVAS).all_grids
	let jsx_body = <CANVAS_BASIC
		pixel_size={pixel_size}
		pixel_rgb={pixel_rgb}
		f_on_click={((input)=>{
			// console.log("grids", get_point_grids(all_grids, {grid:input.grid, size:input.size}))
				update_grids(
					get_point_grids(all_grids, {grid:input.grid, size:input.size}),
					input.target, pixel_rgb)
			}) as a.t_func_x<t_rgb_point & {target:fc.Polyline[]}>
		}
		f_mouse_down={{
			scale:"LOCAL",
			func:((input)=>{
			update_grids(
				draw_thicker_straight_line(
					all_grids,
					{
						size:input.size,
						grid_1:input.grid_1,
						grid_2:input.grid_2
					}
				), 
				input.target,
				input.rgb)
		}) as a.t_func_x<t_practical_shape>}}
	/>
	return <>{jsx_body}</>
}
*/

export default function CANVAS_CLICK_USER()
{
	// const tool_mode = useContext(CONTEXT_SS_GLOBAL_STUDIO).tool_mode
	const pixel_rgb = useContext(CONTEXT_USE_STATE_GLOBAL).new_rgb.ss
	const pixel_size = useContext(CONTEXT_USE_STATE_GLOBAL).pixel_size.ss
	const all_grids = useContext(CONTEXT_CANVAS).all_grids
	let jsx_body = <CANVAS_BASIC
		pixel_size={pixel_size}
		f_on_click={((input)=>{
			// console.log("grids", get_point_grids(all_grids, {grid:input.grid, size:input.size}))
				update_grids(
					get_point_grids(all_grids, {grid:input.grid, size:input.size}),
					input.target, pixel_rgb)
			}) as a.t_func_x<t_rgb_point & {target:fc.Polyline[]}>
		}
		f_mouse_down={((input:t_practical_shape)=>{
			// console.log("input.rgb", input.rgb)
			update_grids(
				draw_thicker_straight_line(
					all_grids,
					{
						size:input.size,
						grid_1:input.grid_1,
						grid_2:input.grid_2
					}
				), 
				input.target,
				input.rgb)
		}) as a.t_func_x<t_practical_shape>}
	/>
	return <>{jsx_body}</>
}
