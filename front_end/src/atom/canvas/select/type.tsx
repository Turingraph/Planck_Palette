import { t_paint_grids, t_paint_shape } from "../utils/type"

export const CANVAS_ACT_SELECT = [
	"SELECT_HOVER",			// OK
	"SELECT_HOVER_MIRROR",	// OK
	"SELECT_RECTANGLE",		// XX UI
	"SELECT_CROP"			// XX UI
]

export type t_act_canvas_select = (
	t_paint_grids<"select"> & {type:"SELECT_HOVER"|"SELECT_HOVER_MIRROR"}
) | (t_paint_shape<"select"> & {type:"SELECT_RECTANGLE"|"SELECT_CROP"})
