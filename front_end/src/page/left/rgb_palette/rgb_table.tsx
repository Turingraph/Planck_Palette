import { JSX, useContext, useEffect, useState } from "react"
import add_logo from "../../../asset/items/add.png"
import * as a from "../../../atom/type/alias"
import B_LOGO from "../../../molecule/button/b_logo"
import B_STR, { t_B_STR } from "../../../molecule/button/b_str"
import INPUT_STRING from "../../../molecule/input/input_string"
import { SELECT_MULTI_TAPS } from "../../../molecule/selection_taps/select_multi_taps"
import SELECT_ONE_TAP from "../../../molecule/selection_taps/select_one_tap"
import { B_RGB_PALETTE } from "../../../organism/button/b_rgb_palette"
import { CX_SS_PALETTE } from "./context"
import { t_use_arr } from "../../../atom/arr/act"
import { t_rgb_palettes } from "../../../atom/arr/type"

export default function RGB_TABLE({
	editor_or_picker,
	f_clicks,
	rgb_arr
}:{
	editor_or_picker:undefined|a.t_use_state<string>
	f_clicks:t_B_STR[]
	rgb_arr:t_use_arr<t_rgb_palettes, keyof t_rgb_palettes>
})
{
	const {ss:SS_NewRGB, setss:setSS_NewRGB} = useContext(CX_SS_PALETTE).new_rgb
	const [SS_SelectRGB, setSS_SelectRGB] = useState<number>(0)
	useEffect(()=>{
		if (editor_or_picker !== undefined && rgb_arr.ss.length > 0 && SS_SelectRGB < rgb_arr.ss.length)
			setSS_NewRGB(rgb_arr.ss[SS_SelectRGB].rgb)
	}, [SS_SelectRGB, rgb_arr.ss, setSS_NewRGB, editor_or_picker])
	const rgb_palettes_grids = rgb_arr.ss.map((item, index)=>{
		return <B_RGB_PALETTE rgb={item.rgb} key={index} 
		f_delete={(editor_or_picker !== undefined ? undefined : ()=>{
			rgb_arr.setss({type:"DELETE", id:rgb_arr.ss[index].id})}) as a.t_func}/>
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
			rgb_arr.setss({
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
		arr={rgb_arr}
	/>
	}
	</>
}