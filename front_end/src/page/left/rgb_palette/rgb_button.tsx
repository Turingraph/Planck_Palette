import { useState } from "react"
import * as a from "../../../atom/type/alias"
import B_STR from "../../../molecule/button/b_str"
import SELECT_ONE_TAP from "../../../molecule/selection_taps/select_one_tap"

export default function RGB_BUTTON()
{
	const [SS_RGBName, setSS_RGBName] = useState<string>("")
	const edit_buttons = [
		<B_STR title={"Palette Picker"} func={(()=>{console.log("LPop")}) as a.t_func} />,
		<B_STR title={"Palette Editor"} func={(()=>{console.log("LPop")}) as a.t_func} />,
		<B_STR title={"Simulation"} func={(()=>{console.log("LPop")}) as a.t_func} />,
		<B_STR title={"Geometry"} func={(()=>{console.log("LPop")}) as a.t_func} />,
	]
	return <SELECT_ONE_TAP
		class_name={"left_taps"}
		jsx_select_array={edit_buttons}
		use_select_item={undefined}
	/>
	}
