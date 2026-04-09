import LONG_STR from "../../atom/str/long_str";
import STR from "../../atom/str/str";
import * as a from "../../atom/type/alias";

export type t_B_STR = {
	title:string,
	func:a.t_func
}

export default function B_STR({
	title,
	func,
	long_str = false,
	width = undefined
}:t_B_STR & {long_str?:boolean, width?:undefined|a.t_css})
{
	const width_style = width !== undefined ? {width:width} : {}
	return <button onClick={func} className={`tap`} style={width_style}>
		{long_str === false ? <STR text={title}/> : <LONG_STR text={title}/>}
	</button>
}

/*
List of Button
1.	Open file
2.	Save file
3.	Create New Project
4.	Import Image
5.	Get Image as PNG/JPG
*/
