import { useEffect, useReducer, useState } from "react"
import act_arr, { t_use_arr } from "../../../atom/arr/act"
import { t_rgb_palettes } from "../../../atom/arr/type"
import * as a from "../../../atom/type/alias"
import LAYOUT_SIDEBAR from "../../../organism/layout/layout_sidebar"
import RGB_TITLE from "./rgb_title"
import { RGB_PICKER } from "./rgb_picker"
import RGB_TABLE from "./rgb_table"
import RGB_TRANSFORM from "./rgb_transform"
import { reset_key_value } from "../../../atom/arr/utils"
import B_STR from "../../../molecule/button/b_str"
import SELECT_ONE_TAP from "../../../molecule/selection_taps/select_one_tap"
import RGB_RANDOM from "./rgb_random"

export default function RGB_PALETTE({
	new_rgb,
	rgb_arr
}:{
	new_rgb:a.t_use_state<string>,
	rgb_arr:t_use_arr<t_rgb_palettes, keyof t_rgb_palettes>
})
{
	const [SS_Edit_RGB_Arr, setSS_Edit_RGB_Arr] = useReducer(act_arr, rgb_arr.ss)
	const [SS_IsEdit, setSS_IsEdit] = useState<boolean>(false)
	const const_rgb_arr = SS_IsEdit ? {ss:SS_Edit_RGB_Arr, setss:setSS_Edit_RGB_Arr} : rgb_arr
	useEffect(()=>{
		if (SS_IsEdit === true)
			setSS_Edit_RGB_Arr({type:"SET", input:rgb_arr.ss})
		else
			reset_key_value(SS_Edit_RGB_Arr, false, "select")
	}, [SS_IsEdit])
	return <LAYOUT_SIDEBAR
			grid_template_rows={"280px 42px 1fr" as a.t_css}
			jsx_array={[
				<LAYOUT_SIDEBAR
					axis_x={false}
					grid_template_rows={"245px 1fr" as a.t_css}
					jsx_array={[
						<div className="fill middle_taps_y" style={{backgroundColor:"crimson"}}>
							<RGB_PICKER new_rgb={new_rgb}/>
							<RGB_RANDOM rgb_arr={rgb_arr}/>
						</div>,
						<RGB_TRANSFORM new_rgb={new_rgb} rgb_arr={const_rgb_arr} is_edit={SS_IsEdit}/>,
					]}
				/>
				,
				<div className="fill center_box">
					<RGB_TITLE 
						is_edit={{ss:SS_IsEdit, setss:setSS_IsEdit}}
						rgb_arr={rgb_arr}
						edit_rgb_arr={{ss:SS_Edit_RGB_Arr, setss:setSS_Edit_RGB_Arr}}
					/>
				</div>,
				<RGB_TABLE new_rgb={new_rgb} is_edit={SS_IsEdit} rgb_arr={const_rgb_arr}/>
			]}
		/>
}

// 245px + 1fr = 460px

/*
To Do Next
1.	Hue/Saturation
2.	PCA and K-Mean
3.	Pan and Zoom
4.	Undo-Redo
5.	Button Hover
6.	Canvas interacting with rgb_palette
*/
