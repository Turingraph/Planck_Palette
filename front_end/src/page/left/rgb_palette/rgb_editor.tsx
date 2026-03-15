import { useContext, useReducer } from "react"
import * as a from "../../../atom/type/alias"
import { CX_SS_PALETTE } from "./context"
import RGB_TABLE from "./rgb_table"
import act_arr from "../../../atom/arr/act"

export default function RGB_EDITOR({
	change_ui_mode
}:{
	change_ui_mode:a.t_func
})
{
	const {ss: SS_RGBArr, setss: setSS_RGBArr} = useContext(CX_SS_PALETTE).rgb_arr
	const [SS_UpdateRGBArr, setSS_UpdateRGBArr] = useReducer(act_arr, [...SS_RGBArr])
	return <RGB_TABLE
		editor_or_picker={undefined}
		rgb_arr={{ss:SS_UpdateRGBArr, setss:setSS_UpdateRGBArr}}
		f_clicks={[
			{title:"Select All", func:(()=>{console.log("Darken")}) as a.t_func},
			{title:"Unselect All", func:(()=>{console.log("Darken")}) as a.t_func},
			{title:"Modify Color", func:(()=>{console.log("Darken")}) as a.t_func},
			{title:"Save", func:(()=>{
				setSS_RGBArr({type:"SET", input:SS_UpdateRGBArr})
				change_ui_mode()}) as a.t_func},
			{title:"Cancel", func:(()=>{change_ui_mode()}) as a.t_func},
		]}
	/>
}