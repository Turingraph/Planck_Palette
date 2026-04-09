import { useContext } from "react"
import * as a from "../../../atom/type/alias"
import { CX_SS_PALETTE } from "./context"
import RGB_TABLE from "./rgb_table"

export default function RGB_TABLE_PICKER({
	change_ui_mode,
	rgb_file_name
}:{
	change_ui_mode:a.t_func
	rgb_file_name:a.t_use_state<string>
})
{
	const rgb_arr = useContext(CX_SS_PALETTE).rgb_arr
	return <RGB_TABLE
		editor_or_picker={rgb_file_name}
		rgb_arr={rgb_arr}
		f_clicks={[
			{title:"Open", func:(()=>{console.log("Darken")}) as a.t_func},
			{title:"Export", func:(()=>{console.log("Darken")}) as a.t_func},
			{title:"Edit", func:(()=>{change_ui_mode()}) as a.t_func},
		]}
	/>
}