import CANVAS_CLICK_USER from "./canvas_object/canvas_click_user";
import * as a from "../../atom/type/alias"
import { CONTEXT_CANVAS, CX_SS_PAINT_TOOL } from "./utils/context";

export default function MIDDLE({
	new_rgb,
	pixel_size,
	draw_mode
}:{
	new_rgb:a.t_use_state<string>
	pixel_size:a.t_use_state<number>
	draw_mode:a.t_use_state<number>
})
{
	return <CX_SS_PAINT_TOOL
		value={{
			pixel_size:pixel_size,
			new_rgb:new_rgb,
			draw_mode:draw_mode
		}}
	><div 
	className="fill center_box" 
	style={{backgroundColor:"#00FF00"}}>
		<CONTEXT_CANVAS value={{
			grid:{w:25, h:25},
			all_grids:{w:32,h:32},
			canvas:{w:800,h:800}
		}}>
		{/* <MY_TIME/> */}
		{/* <CANVAS_BASIC/> */}
		<CANVAS_CLICK_USER/>
		{/* <MOUSE/> */}
		{/* <FABRIK/> */}
		</CONTEXT_CANVAS>
	</div></CX_SS_PAINT_TOOL>
}

/*
To Do Now
1.	Handle mouse-out event when draw straight line (GLOBAL mode and mouse_update_grid)
2.	Add more functionality.
*/
