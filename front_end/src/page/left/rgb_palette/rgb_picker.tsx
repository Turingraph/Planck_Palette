import { useRef } from "react";
import * as a from "../../../atom/type/alias";
import { f_throttle } from "../../../molecule/utils/Throttle";

// https://casesandberg.github.io/react-color/#examples
import { ChromePicker } from 'react-color';
import B_STR from "../../../molecule/button/b_str";

export function RGB_PICKER({
	new_rgb
}:{
	new_rgb:a.t_use_state<string>
})
{
	const Ref_Time = useRef<number>(0)
	const change_color = (color:any) => {
		f_throttle(
			Ref_Time,
			7,
			(()=>{new_rgb.setss(color.hex)}) as a.t_func
		)
	};
	return <div style={{height:"150px"}}>
		<ChromePicker
			color={new_rgb.ss}
			onChange={change_color}
		/>
		<div className="fill">
		<div className="center_box">
		<B_STR width={"100%" as a.t_css} title={"Add New Color"} func={(()=>{console.log("LPop")}) as a.t_func} />
	</div>
	</div>
	</div>
}
