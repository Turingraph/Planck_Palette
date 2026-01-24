import * as p from "../utils/paint";
import { t_canvas } from "../utils/type";
// import * as f from "./func";
import { t_act_canvas_select } from "./type";

export default function act_canvas_select(
	arr:t_canvas, 
	action:t_act_canvas_select)
{
	let update_arr = {
		arr:[...arr.arr],
		width:arr.width
	} as t_canvas
	if (action.type === "SELECT_HOVER")
		update_arr = p.paint_point(
			update_arr,
			action
		)
	return update_arr
}
