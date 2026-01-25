import { t_paint_shape } from "../utils/type"

export const CANVAS_ACT_SKETCH = [
	"SKETCH_RECTANGLE",
	"SKETCH_CIRCLE",
]

export type t_act_canvas_sketch = (
	t_paint_shape<"sketch_rgb"> & {type:"SKETCH_RECTANGLE"|"SKETCH_CIRCLE"|"SKETCH_LINE"}
)
