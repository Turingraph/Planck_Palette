import { useState } from "react"
import B_STR from "../../../molecule/button/b_str"
import INPUT_STRING from "../../../molecule/input/input_string"
import { insert_use_state } from "../../../molecule/utils/format_object"
import * as a from "../../../atom/type/alias"

export default function RGB_TITLE()
{
	const [SS_RGBName, setSS_RGBName] = useState<string>("")
	const input_string = <INPUT_STRING 
		title="RGB File"
		use_state={insert_use_state(SS_RGBName, setSS_RGBName)}
	/>
	return <div className="fill">
		<div className="center_box">
			{input_string}
		</div>
		<div className="center_box">
			<B_STR title={"Open RGB File"} func={(()=>{console.log("LPop")}) as a.t_func} />
			<B_STR title={"Export RGB File"} func={(()=>{console.log("LPop")}) as a.t_func} />
		</div>
	</div>
}