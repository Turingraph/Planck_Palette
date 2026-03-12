import LONG_STR from "../../atom/str/long_str";
import * as a from "../../atom/type/alias";
import style from "./input_number.module.css";

export default function INPUT_STRING({
	use_state,
	title = undefined,
	unit = undefined,
}:{
	use_state:a.t_use_state<string>,
	title?:undefined|string,
	unit?:undefined|string
})
{
	return <div className={`${style.div}`}>
	{title !== undefined ? <LONG_STR text={title}/> : <></>}
	<input 
	className={`${style.input}`}
	type="string" 
	onChange={e=>{
		use_state.setss(e.target.value)
	}} value={use_state.ss}/>
	{unit !== undefined ? <LONG_STR text={unit}/> : <></>}
	</div>
}
