import * as a from "../../atom/type/alias"
import RGB_TABLE from "./rgb_table"

export default function RGB_PICKER({
	change_ui_mode,
	rgb_file_name
}:{
	change_ui_mode:a.t_func
	rgb_file_name:a.t_use_state<string>
})
{
	return <RGB_TABLE
		editor_or_picker={rgb_file_name}
		f_clicks={[
			{title:"Open", func:(()=>{console.log("Darken")}) as a.t_func},
			{title:"Export", func:(()=>{console.log("Darken")}) as a.t_func},
			{title:"Edit", func:(()=>{change_ui_mode()}) as a.t_func},
		]}
	/>
}