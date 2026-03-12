import { useRef } from "react"
import * as a from "../../atom/type/alias"
import { f_throttle } from "../utils/Throttle"

export function INPUT_RGB({
	new_rgb
}:{
	new_rgb:a.t_use_state<string>
})
{
	const Ref_Time = useRef<number>(0)
	return <input 
		style={{width:"55px"}}
		type="color" 
		onChange={e=>{
			f_throttle(Ref_Time, 200, (()=>{
				new_rgb.setss(e.target.value)
			}) as a.t_func)
		}}
		value={new_rgb.ss}
	></input>
}
