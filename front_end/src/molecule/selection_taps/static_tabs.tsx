import { JSX } from "react"

export default function STATIC_TAPS({
	class_name = "middle_taps_x",
	jsx_array,
}:{
	class_name?:"left_table_taps"|"middle_taps_x"|"middle_taps_y"|"left_taps"
	jsx_array:JSX.Element[],
}){
	return <div className={class_name}>
		{jsx_array.map((item, index:number)=>{
			return <span key={index} className="center_box">{item}</span>
		})}
	</div>
}
