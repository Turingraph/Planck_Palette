import * as fc from "fabric";
import * as a from "../../../atom/type/alias";

export function event_mouse_up(
	main_canvas:fc.Canvas,
	func:a.t_func,
){
	main_canvas.on({
		"mouse:up":()=>{
			func()
		}
	})
}

