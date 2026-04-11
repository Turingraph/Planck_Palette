import * as a from "../../atom/type/alias";

// https://www.w3schools.com/jsref/dom_obj_range.asp
// https://stackoverflow.com/questions/36122034/
// jsx-react-html5-input-slider-doesnt-work

export default function INPUT_RANGE({
	use_state,
	width = "100%" as a.t_css,
}:{
	use_state:a.t_use_state<number>,
	width?:a.t_css
})
{
	return <input style={{width:width}} type="range" value={use_state.ss} onChange={
		(e:any)=>{use_state.setss(e.target.value)}
	}></input>
}