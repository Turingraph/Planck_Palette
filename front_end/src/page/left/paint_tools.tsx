import { useContext } from "react"
import { CONTEXT_OTHER_JSX } from "../../atom/hook/context"
import * as a from "../../atom/type/alias"
import B_LOGO from "../../molecule/button/b_logo"
import { CONTEXT_USE_STATE_GLOBAL } from "../../molecule/hook/context"
import INPUT_NUMBER from "../../molecule/input/input_number"
import { INPUT_RGB } from "../../molecule/input/input_rgb"
import SELECT_ONE_TAP from "../../molecule/selection_taps/select_one_tap"
import { ARR_DRAW } from "../utils/arr"

export default function PAINT_TOOLS()
{
	const {ss: SS_NewRGB	, setss: setSS_NewRGB} = useContext(CONTEXT_USE_STATE_GLOBAL).new_rgb
	const {ss: SS_DrawMode	, setss: setSS_DrawMode} = useContext(CONTEXT_USE_STATE_GLOBAL).draw_mode
	const {ss: SS_PixelSize	, setss: setSS_PixelSize} = useContext(CONTEXT_USE_STATE_GLOBAL).pixel_size
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
		<INPUT_RGB
		new_rgb={{ss:SS_NewRGB, setss:setSS_NewRGB}}
		/>,
		<INPUT_NUMBER 
		description={"Set pen size" as a.t_str_hover}
		use_state={{ss:SS_PixelSize, setss:setSS_PixelSize}}/>
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
	use_select_item={{ss:SS_DrawMode, setss:setSS_DrawMode}}
	/>
	</CONTEXT_OTHER_JSX>
</div>
}