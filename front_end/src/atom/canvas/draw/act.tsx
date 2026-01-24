import * as p from "../utils/paint";
import { t_canvas } from "../utils/type";
// import * as f from "./func";
import { t_act_canvas_draw } from "./type";

export default function act_canvas_draw(
	arr:t_canvas, 
	action:t_act_canvas_draw)
{
	let update_arr = {
		arr:[...arr.arr],
		width:arr.width
	} as t_canvas
	if (action.type === "DRAW_ERASER")
	{
		const grids = action.grids
		let i = 0
		while (i < grids.length)
		{
			update_arr = p.paint_point(
				update_arr,
				{...action, grid:grids[i], state:undefined}
			)
			i += 1;
		}
	}
	if (action.type === "DRAW_PEN")
	{
		const grids = action.grids
		let i = 0
		while (i < grids.length)
		{
			update_arr = p.paint_point(
				update_arr,
				{...action, grid:grids[i]}
			)
			i += 1;
		}
	}
	if (action.type === "DRAW_MIRROR")
	{
		const grids = action.grids
		let i = 0
		while (i < grids.length)
		{
			update_arr = p.paint_point_mirror(
				update_arr,
				{...action, grid:grids[i]}
			)
			i += 1;
		}
	}
	return update_arr
}
