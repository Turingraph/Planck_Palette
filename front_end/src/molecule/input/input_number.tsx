import { useState } from "react";
import STR_HOVER from "../../atom/str/str_hover";
import * as a from "../../atom/type/alias";
import style from "./input_number.module.css";

export default function INPUT_NUMBER({
	use_state,
	description = undefined,
	min = 1,
	max = 255
}:{
	use_state:a.t_use_state<number>,
	description?:undefined|a.t_str_hover
	min?:number
	max?:number
})
{
	const [SS_OnMouseEnter, setSS_OnMouseEnter] = useState<boolean>(true);
	return <div 
	onMouseEnter={()=>{setSS_OnMouseEnter(false)}}
	onMouseLeave={()=>{setSS_OnMouseEnter(true)}}
	style={{width:"100%"}}
	className={`${style.div}`}>
		<input 
		className={`${style.input}`}
		type="number" 
		onChange={e=>{
			if (isNaN(Number(e.target.value)) === false && Number(e.target.value) >= min && Number(e.target.value) <= max)
				use_state.setss(Number(e.target.value))
		}} value={use_state.ss}/>
	{description !== undefined ? <STR_HOVER str_hover={description as string} is_hover={SS_OnMouseEnter}/> : <></>}
	</div>
}

// https://stackoverflow.com/questions/15583639/
// why-child-input-field-is-wider-than-parent-div/15583683
