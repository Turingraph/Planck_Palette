import * as fc from "fabric";
import { useContext } from "react";
import * as a from "../../../atom/type/alias";
import { draw_thicker_straight_line, update_grids } from "../draw/draw_fc_canvas";
import { get_point_grids } from "../draw/draw_point";
import { t_practical_shape, t_rgb_point } from "../utils/type";
import CANVAS_BASIC from "./canvas_basic";
import { CONTEXT_CANVAS, CX_SS_PAINT_TOOL } from "../utils/context";

export default function CANVAS_CLICK_USER()
{
	// const tool_mode = useContext(CONTEXT_SS_GLOBAL_STUDIO).tool_mode
	const pixel_rgb = useContext(CX_SS_PAINT_TOOL).new_rgb.ss
	const pixel_size = useContext(CX_SS_PAINT_TOOL).pixel_size.ss
	const all_grids = useContext(CONTEXT_CANVAS).all_grids
	// const {ss: SS_RGBArr, setss: setSS_RGB_Arr} = useContext(CONTEXT_USE_STATE_GLOBAL).rgb_arr
	let jsx_body = <CANVAS_BASIC
		pixel_size={pixel_size}
		f_on_click={((input)=>{
				update_grids(
					get_point_grids(all_grids, {grid:input.grid, size:input.size}),
					input.target, pixel_rgb)
			}) as a.t_func_x<t_rgb_point & {target:fc.Polyline[]}>
		}
		f_mouse_down={((input:t_practical_shape)=>{
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
			// if (???)
			// 	setSS_RGB_Arr({
			// 		type:"PUSH",
			// 		input:{
			// 			id:0, 
			// 			rgb:pixel_rgb, 
			// 			select:false
			// 		}
			// })
		}) as a.t_func_x<t_practical_shape>}
	/>
	return <>{jsx_body}</>
}
