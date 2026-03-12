import * as a from "../../atom/type/alias"
import RGB_TABLE from "./rgb_table"

export default function RGB_EDITOR({
	change_ui_mode
}:{
	change_ui_mode:a.t_func
})
{
	return <RGB_TABLE
		editor_or_picker={undefined}
		f_clicks={[
			{title:"Select All", func:(()=>{console.log("Darken")}) as a.t_func},
			{title:"Unselect All", func:(()=>{console.log("Darken")}) as a.t_func},
			{title:"Modify Color", func:(()=>{console.log("Darken")}) as a.t_func},
			{title:"Save", func:(()=>{change_ui_mode()}) as a.t_func},
			{title:"Cancel", func:(()=>{change_ui_mode()}) as a.t_func},
		]}
	/>
}