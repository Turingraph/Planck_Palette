import * as p from "../utils/paint";
import { t_canvas } from "../utils/type";
import { t_act_canvas_sketch } from "./type";

export default function act_canvas_sketch(
	arr:t_canvas,
	action:t_act_canvas_sketch
){
	let update_arr = {
		arr:[...arr.arr],
		width:arr.width
	} as t_canvas
	if (action.type === "SKETCH_RECTANGLE")
	{
		update_arr = p.paint_rectangle(
			update_arr,
			action
		)
	}
	return update_arr
}
