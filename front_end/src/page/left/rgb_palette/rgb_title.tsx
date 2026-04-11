import { useState } from "react"
import * as a from "../../../atom/type/alias"
import B_STR, { t_B_STR } from "../../../molecule/button/b_str"
import SELECT_ONE_TAP from "../../../molecule/selection_taps/select_one_tap"
import INPUT_STRING from "../../../molecule/input/input_string"
import STR_DESCRIPTOR from "../../../atom/str/str_descriptor"

export default function RGB_TITLE({
	is_edit
}:{
	is_edit:a.t_use_state<boolean>
})
{
	const [SS_RGBName, setSS_RGBName] = useState<string>("")
	const input_string = <INPUT_STRING 
		title="RGB Set"
		use_state={{ss:SS_RGBName, setss:setSS_RGBName}}
	/>
	const picker_button = [input_string].concat(([
		{
			title:"Open",
			func:(()=>{console.log("LPop")}) as a.t_func,
			description:"Open RGB Set"
		},
		{
			title:"Export",
			func:(()=>{console.log("LPop")}) as a.t_func,
			description:"Export RGB Set"
		},
		{
			title:"Edit",
			func:(()=>{is_edit.setss(true)}) as a.t_func,
			description:"Edit RGB Set"
		}
	] as (t_B_STR & {description:a.t_str_hover|undefined})[]).map((item, index)=>{
		return <STR_DESCRIPTOR
			jsx_body={<B_STR title={item.title} func={item.func}/>}
			description={item.description}
		/>
	}))
	const edit_button = ([
		{
			title:"Select All",
			func:(()=>{console.log("LPop")}) as a.t_func,
			description:"Select All RGB items"
		},
		{
			title:"Unselect All",
			func:(()=>{console.log("LPop")}) as a.t_func,
			description:"Unselect All RGB items"
		},
		{
			title:"Delete 10 RGB",
			func:(()=>{console.log("LPop")}) as a.t_func,
			description:"Delete 10 Selected RGB items"
		},
		{
			title:"Save",
			func:(()=>{is_edit.setss(false)}) as a.t_func,
			description:"update all modification on RGB set"
		},
		{
			title:"Reset RGB",
			func:(()=>{is_edit.setss(false)}) as a.t_func,
			description:"reset all modification on RGB set"
		},
	] as (t_B_STR & {description:a.t_str_hover|undefined})[]).map((item, index)=>{
		return <STR_DESCRIPTOR
			jsx_body={<B_STR title={item.title} func={item.func}/>}
			description={item.description}
		/>
	})
	return <SELECT_ONE_TAP
		class_name={"left_taps"}
		jsx_select_array={is_edit.ss === true ? edit_button : picker_button}
		use_select_item={undefined}
	/>
}
