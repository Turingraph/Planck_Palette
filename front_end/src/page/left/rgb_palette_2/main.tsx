import { useState } from "react"
import * as a from "../../../atom/type/alias"
import RGB_TABLE_EDITOR from "./rgb_table_editor"
import RGB_TABLE_PICKER from "./rgb_table_picker"

export default function RGB_PALETTE_2()
{
	const [SS_RGBName, setSS_RGBName] = useState<string>("")
	const [SS_EditMode, setSS_EditMode] = useState<"RGBPicker"|"RGBEditor">("RGBPicker")
	return <div className="fill" style={{backgroundColor:"#4c3841"}}>
		{SS_EditMode === "RGBPicker" ? 
		<RGB_TABLE_PICKER 
			rgb_file_name={{ss:SS_RGBName, setss:setSS_RGBName}}
			change_ui_mode={(()=>{setSS_EditMode("RGBEditor")}) as a.t_func}/>:
		<RGB_TABLE_EDITOR
			change_ui_mode={(()=>{setSS_EditMode("RGBPicker")}) as a.t_func}/>
		}
	</div>
	}