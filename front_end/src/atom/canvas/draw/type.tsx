import { t_paint_1_grid, t_paint_fixed_helper, t_paint_grids, t_paint_shape } from "../utils/type"

export const CANVAS_ACT_DRAW = [
	"DRAW_PEN",			// OK UI
	"DRAW_ERASER",		// XX UI
	"DRAW_REPLACE_RGB",	// XX UI
	"DRAW_LINE",		// XX UI
	"DRAW_RECTANGLE",	// XX UI
	"DRAW_CIRCLE",		// XX UI
	"DRAW_MIRROR",		// XX UI
	"DRAW_BACKET"		// XX UI
]

export type t_act_canvas_draw = (
	t_paint_fixed_helper<"rgb"> & {type:"DRAW_ERASER"}
) | (
	t_paint_grids<"rgb"> & {type:"DRAW_PEN"|"DRAW_MIRROR"}
) | (
	t_paint_shape<"rgb"> & {type:"DRAW_LINE"|"DRAW_CIRCLE"|"DRAW_RECTANGLE"}
) | (
	t_paint_1_grid<"rgb"> & {type:"DRAW_BACKET"|"DRAW_REPLACE_RGB"}
)
