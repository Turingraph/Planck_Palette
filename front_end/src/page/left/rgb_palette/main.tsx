import { useState } from "react"
import { t_use_arr } from "../../../atom/arr/act"
import { t_rgb_palettes } from "../../../atom/arr/type"
import * as a from "../../../atom/type/alias"
import LAYOUT_SIDEBAR from "../../../organism/layout/layout_sidebar"
import RGB_BUTTON from "./rgb_button"
import { RGB_PICKER } from "./rgb_picker"
import RGB_TABLE from "./rgb_table"
import RGB_TITLE from "./rgb_title"

/*
I have 2 rules of designing UXUI
1. There should be some UI part that always shown whatever user click as long as user depending on it e.g. always show color options and color picker even when user click layer, animation, converting image to pixel art, using Gen AI etc. UI mode as long as user depending on them
2. Those UI part (from rule no.1) should not change its placement when user click some other UXUI mode unless user intend to change the CSS layout.

This also have the implication that I should make my color palettes able to change its mode (safe picker vs editing color palette) while avoiding change the UI layout.

*/

/*
To Do Now
1.	Add UXUI mode (Safe Color Picker and Color Editor Mode)
2.	Add HUV transformation, select all, delete selected, and unselect all
3.	Avoid using rgb_button.tsx
4.	use symbol instead.
*/

export default function RGB_PALETTE({
	new_rgb,
	rgb_arr
}:{
	new_rgb:a.t_use_state<string>,
	rgb_arr:t_use_arr<t_rgb_palettes, keyof t_rgb_palettes>
})
{
	const [SS_IsEdit, setSS_IsEdit] = useState<boolean>(false)
	return <LAYOUT_SIDEBAR
			grid_template_rows={"270px 1fr" as a.t_css}
			jsx_array={[
				<LAYOUT_SIDEBAR
					axis_x={false}
					grid_template_rows={"220px 1fr" as a.t_css}
					jsx_array={[
						<RGB_PICKER new_rgb={new_rgb}/>,
						<RGB_TITLE/>
					]}
				/>
				,
				<RGB_TABLE is_edit={SS_IsEdit} rgb_arr={rgb_arr}/>
			]}
		/>
}
