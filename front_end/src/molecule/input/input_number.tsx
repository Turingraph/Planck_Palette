import { useState } from "react";
import STR_HOVER from "../../atom/str/str_hover";
import * as a from "../../atom/type/alias";
import style from "./index.module.css";

export default function INPUT_NUMBER({
	use_state,
	min = 1,
	max = 255
}:{
	use_state:a.t_use_state<number>,
	min?:number
	max?:number
})
{
	return <div className={"middle_taps_x"}>
		<input 
		className={`${style.input} fill`}
		type="number" 
		onChange={e=>{
			if (isNaN(Number(e.target.value)) === false && Number(e.target.value) >= min && Number(e.target.value) <= max)
				use_state.setss(Number(e.target.value))
		}} value={use_state.ss}/>
	</div>
}

// https://stackoverflow.com/questions/15583639/
// why-child-input-field-is-wider-than-parent-div/15583683
