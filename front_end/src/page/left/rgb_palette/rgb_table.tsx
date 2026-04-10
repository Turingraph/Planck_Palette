import { useState, useRef, useEffect } from "react"
import { t_use_arr } from "../../../atom/arr/act"
import { t_rgb_palettes } from "../../../atom/arr/type"
import { SELECT_MULTI_TAPS } from "../../../molecule/selection_taps/select_multi_taps"
import SELECT_ONE_TAP from "../../../molecule/selection_taps/select_one_tap"
import useDragArr, { CONTEXT_DRAG } from "../../../molecule/selection_taps/useDragArr"
import { B_RGB_PALETTE } from "../../../organism/button/b_rgb_palette"
import * as a from "../../../atom/type/alias"

export default function RGB_TABLE({
	is_edit,
	rgb_arr
}:{
	is_edit:boolean
	rgb_arr:t_use_arr<t_rgb_palettes, keyof t_rgb_palettes>
})
{
	const [SS_SelectRGB, setSS_SelectRGB] = useState<number>(0)
	const Ref_Table = useRef<any>(null)
	const [SS_TableHeight, setSS_TableHeight] = useState<number>(0)
	const {
		Ref_DragOldIndex	,
		Ref_DragNewIndex	,
		SS_DragOldIndex		,
		setSS_DragOldIndex } = useDragArr()
	useEffect(()=>{
		if (Ref_Table.current)
			setSS_TableHeight(Ref_Table.current?.getBoundingClientRect().y)
	}, [SS_SelectRGB, rgb_arr.ss, is_edit])
	const rgb_palettes_grids = rgb_arr.ss.map((item, index)=>{
		return <B_RGB_PALETTE rgb={item.rgb} key={index} 
		f_delete={(is_edit !== undefined ? undefined : ()=>{
			rgb_arr.setss({type:"DELETE", id:rgb_arr.ss[index].id})}) as a.t_func}/>
	})
	return <CONTEXT_DRAG 
		value={{
			Ref_DragOldIndex:Ref_DragOldIndex,
			Ref_DragNewIndex:Ref_DragNewIndex,
			SS_DragOldIndex	:SS_DragOldIndex,
			setSS_DragOldIndex:setSS_DragOldIndex,
			setSS_Arr:rgb_arr.setss,
			high_light:is_edit === undefined ? false : true
		}}>
	<div ref={Ref_Table} className="fill" style={{
		backgroundColor:"blueviolet",
		height:"calc(100vh - " + SS_TableHeight + "px)", 
		overflowY: "auto"}}>
	{/*** RGB_PICKER ***/}
	{is_edit === false ? 
	<SELECT_ONE_TAP
		class_name={"left_table_taps"}
		jsx_select_array={rgb_palettes_grids}
		use_select_item={{ss:SS_SelectRGB, setss:setSS_SelectRGB}}
	/*** RGB_EDITOR ***/
	/> : <SELECT_MULTI_TAPS
		class_name={"left_table_taps"}
		jsx_select_array={rgb_palettes_grids}
		arr={rgb_arr}
	/>}</div>
	</CONTEXT_DRAG>
}
