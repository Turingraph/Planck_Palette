import { JSX, useContext, useState } from "react"
import * as a from "../../atom/type/alias"
import B_STR, { t_B_STR } from "../../molecule/button/b_str"
import INPUT_STRING from "../../molecule/input/input_string"
import SELECT_ONE_TAP from "../../molecule/selection_taps/select_one_tap"
import { CONTEXT_USE_STATE_GLOBAL } from "../../molecule/hook/context"
import { B_RGB_GRID } from "../../organism/button/b_rgb_grid"
import { SELECT_MULTI_TAPS } from "../../molecule/selection_taps/select_multi_taps"
import B_LOGO from "../../molecule/button/b_logo"
import add_logo from "../../asset/items/add.png"

export default function RGB_TABLE({
	editor_or_picker,
	f_clicks
}:{
	editor_or_picker:undefined|a.t_use_state<string>
	f_clicks:t_B_STR[]
})
{
	const {ss: SS_RGBArr, setss: setSS_RGBArr} = useContext(CONTEXT_USE_STATE_GLOBAL).rgb_arr
	const SS_NewRGB = useContext(CONTEXT_USE_STATE_GLOBAL).new_rgb.ss
	const [SS_SelectRGB, setSS_SelectRGB] = useState<number>(0)
	const rgb_palettes_grids = SS_RGBArr.map((item, index)=>{
		return <B_RGB_GRID rgb={item.rgb} key={index}/>
	})
	const input_string = editor_or_picker === undefined ? [] : [
		<INPUT_STRING
			use_state={editor_or_picker}
			title="Palette Name"
		/>
	]
	const buttons = input_string.concat(f_clicks.map((item,index)=>{
			return <B_STR title={item.title} func={item.func} long_str={true} key={index}/>
	}) as JSX.Element[])
	const b_add_new_rgb = <B_LOGO
		logo={add_logo as a.t_logo}
		func={(()=>{
			setSS_RGBArr({
				type:"PUSH",
				input:{
					rgb:SS_NewRGB,
					id:0, select:false
				}
			})
		}) as a.t_func}
	/>
	return <>
	<SELECT_ONE_TAP
	class_name={"middle_taps_x"}
	jsx_select_array={buttons}
	use_select_item={undefined}
	/>
	<hr className="invisible_line"/>
	{/*** RGB_PICKER ***/}
	{editor_or_picker !== undefined ? 
	<SELECT_ONE_TAP
		class_name={"left_taps"}
		jsx_select_array={rgb_palettes_grids}
		use_select_item={{ss:SS_SelectRGB, setss:setSS_SelectRGB}}
	/*** RGB_EDITOR ***/
	/> : <SELECT_MULTI_TAPS
		class_name={"left_taps"}
		jsx_select_array={[
			...rgb_palettes_grids, 
			b_add_new_rgb
			]}
		arr={{ss: SS_RGBArr, setss: setSS_RGBArr}}
	/>
	}
	</>
}