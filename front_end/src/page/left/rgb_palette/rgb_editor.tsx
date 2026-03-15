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
	const f_select_all = function(select:boolean){
		const update_rgb_arr = [...SS_UpdateRGBArr]
		let i = 0
		while (i < SS_UpdateRGBArr.length)
		{
			update_rgb_arr[i].select = select
			i += 1
		}
		setSS_UpdateRGBArr({type:"SET", input:update_rgb_arr})
	}
	return <RGB_TABLE
		editor_or_picker={undefined}
		rgb_arr={{ss:SS_UpdateRGBArr, setss:setSS_UpdateRGBArr}}
		f_clicks={[
			{title:"Select All", func:(()=>{f_select_all(true)}) as a.t_func},
			{title:"Unselect All", func:(()=>{f_select_all(false)}) as a.t_func},
			{title:"Modify Color", func:(()=>{console.log("Darken")}) as a.t_func},
			{title:"Save", func:(()=>{
				f_select_all(false)
				setSS_RGBArr({type:"SET", input:SS_UpdateRGBArr})
				change_ui_mode()}) as a.t_func},
			{title:"Cancel", func:(()=>{
				f_select_all(false)
				change_ui_mode()}) as a.t_func},
		]}
	/>
}