import { useContext, useState } from "react"
import * as a from "../../atom/type/alias"
import useDragArr, { CONTEXT_DRAG } from "../../molecule/hook/useDragArr"
import RGB_PICKER from "./rgb_picker"
import RGB_EDITOR from "./rgb_editor"
import { CX_SS_PALETTE } from "./main"

export default function RGB_PALETTE()
{
	const [SS_RGBName, setSS_RGBName] = useState<string>("")
	const [SS_EditMode, setSS_EditMode] = useState<"RGBPicker"|"RGBEditor">("RGBPicker")
	const setSS_RGBArr = useContext(CX_SS_PALETTE).rgb_arr.setss
	const {
		Ref_DragOldIndex	,
		Ref_DragNewIndex	,
		SS_DragOldIndex		,
		setSS_DragOldIndex } = useDragArr()
	return <div className="cornice" style={{backgroundColor:"#4c3841"}}>
	<CONTEXT_DRAG 
		value={{
			Ref_DragOldIndex:Ref_DragOldIndex,
			Ref_DragNewIndex:Ref_DragNewIndex,
			SS_DragOldIndex	:SS_DragOldIndex,
			setSS_DragOldIndex:setSS_DragOldIndex,
			setSS_Arr:setSS_RGBArr
		}}>
		{SS_EditMode === "RGBPicker" ? 
		<RGB_PICKER 
			rgb_file_name={{ss:SS_RGBName, setss:setSS_RGBName}}
			change_ui_mode={(()=>{setSS_EditMode("RGBEditor")}) as a.t_func}/>:
		<RGB_EDITOR
			change_ui_mode={(()=>{setSS_EditMode("RGBPicker")}) as a.t_func}/>
		}
	</CONTEXT_DRAG>
	</div>
	}