import STR_DESCRIPTOR from "../../atom/str/str_descriptor"
import * as a from "../../atom/type/alias"
import { CONTEXT_OTHER_JSX } from "../../atom/utils/context"
import B_LOGO from "../../molecule/button/b_logo"
import INPUT_NUMBER from "../../molecule/input/input_number"
import SELECT_ONE_TAP from "../../molecule/selection_taps/select_one_tap"
import { ARR_DRAW } from "./constant"

export default function PAINT_TOOLS({
	pixel_size,
	draw_mode
}:{
	pixel_size:a.t_use_state<number>
	draw_mode:a.t_use_state<number>
})
{
	return 	<div 
className="center_box"
style={{
	backgroundColor:"#30d0f0",
	width:"60px", 
	height:"700px"
}}
>
	<CONTEXT_OTHER_JSX value={{
		front:[
		<STR_DESCRIPTOR
		jsx_body={<INPUT_NUMBER 
		use_state={pixel_size}/>}
		description={"Set pen size" as a.t_str_hover}
		/>
		],
		back:undefined
	}}>
	<SELECT_ONE_TAP
	class_name={"middle_taps_y"}
	jsx_select_array={ARR_DRAW.map((item, index:number)=>{
		return <B_LOGO
		description={item.description}
		logo={item.logo}
		func={item.func}
		/>})}
	use_select_item={draw_mode}
	/>
	</CONTEXT_OTHER_JSX>
</div>
}