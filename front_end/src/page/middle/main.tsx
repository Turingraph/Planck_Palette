import { t_dim } from "../../atom/canvas/utils/type";
import CANVAS_BASIC from "./canvas_basic";
import MOUSE from "./mouse";
import MY_TIME from "./my_time";

export default function MIDDLE()
{
	return <div 
	className="fill center_box" 
	style={{backgroundColor:"#00FF00"}}>
		{/* <MY_TIME/> */}
		<CANVAS_BASIC
			grid={{
				w:25,
				h:25
			} as t_dim}
			all_grids={{
				w:32,
				h:32
			} as t_dim}
			canvas={{
				w:800,
				h:800
			} as t_dim}/>
		{/* <MOUSE/> */}
		{/* <FABRIK/> */}
	</div>
}

/*
To Do Now
1.	Optimizing canvas_throttle (if it possible to do so)
2.	Add more functionality.
*/
