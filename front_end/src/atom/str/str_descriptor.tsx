import { JSX, useState } from "react"
import * as a from "../type/alias"
import STR_HOVER from "./str_hover"

export default function STR_DESCRIPTOR({
	jsx_body,
	description = undefined
}:{
	jsx_body:JSX.Element
	description?:a.t_str_hover|undefined
}){
	const [SS_OnMouseEnter, setSS_OnMouseEnter] = useState<boolean>(true);
	return <div
	onMouseEnter={()=>{setSS_OnMouseEnter(false)}}
	onMouseLeave={()=>{setSS_OnMouseEnter(true)}}
	>
	{jsx_body}
	{description !== undefined ? <STR_HOVER str_hover={description as string} is_hover={SS_OnMouseEnter}/> : <></>}
	</div>
}
