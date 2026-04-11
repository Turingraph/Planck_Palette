import { useRef } from "react";
import * as a from "../../../atom/type/alias";
import { f_throttle } from "../../../molecule/utils/Throttle";

// https://casesandberg.github.io/react-color/#examples
import { SketchPicker } from 'react-color';
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
	return <SketchPicker
			width={"220px"}
			presetColors={[]}
			color={new_rgb.ss}
			onChange={change_color}
			disableAlpha
		/>
}
