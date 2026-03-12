import { createContext } from "react"
import * as a from "../../../atom/type/alias"
import { t_canvas_dim } from "./type"
import { init_use_state } from "../../../molecule/utils/format_object"

export const CONTEXT_CANVAS = createContext<
	t_canvas_dim>({
	grid:{w:25, h:25},
	all_grids:{w:32,h:32},
	canvas:{w:800,h:800}
})

export const CX_SS_PAINT_TOOL = createContext<{
	pixel_size:a.t_use_state<number>,
	draw_mode:a.t_use_state<number>,
	new_rgb:a.t_use_state<string>}>({
	pixel_size:init_use_state(1),
	draw_mode:init_use_state(0),
	new_rgb:init_use_state("#000000"),
})
