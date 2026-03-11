import { CONTEXT_CANVAS } from "../../molecule/hook/context";
// import CANVAS_BASIC from "./canvas_basic";
import CANVAS_CLICK_USER from "./canvas_object/canvas_click_user";
// import MOUSE from "./mouse";
// import MY_TIME from "./my_time";

export default function MIDDLE()
{
	return <div 
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
	</div>
}

/*
To Do Now
1.	Handle mouse-out event when draw straight line (GLOBAL mode and mouse_update_grid)
2.	Add more functionality.
*/
