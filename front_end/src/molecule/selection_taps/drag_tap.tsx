import { JSX, useContext } from "react";
import * as a from "../../atom/type/alias";
import { child_drag_start, child_mouse_down, CONTEXT_DRAG, parent_drag_end, parent_drag_enter } from "./useDragArr";

export const selected_taps = "3px solid blueviolet"
export const unselected_taps = "3px solid gray"

export default function DRAG_TAP({
	f_on_click = ((index:number)=>{}) as a.t_func_x<number>,
	select = false,
	item = <></>,
	index
}:{
	f_on_click?:a.t_func_x<number>
	select?:boolean
	item?:JSX.Element
	index:number
})
{
	const drag = useContext(CONTEXT_DRAG)
	return <span
		style={{
		opacity:index === drag?.SS_DragOldIndex ? "0.5" : "1",
		border:select ? "3px solid blueviolet" : "3px solid gray"}}
		onClick={()=>{f_on_click(index)}}
		draggable={drag ? true : false}
		onDragEnd={()=>{
			if (drag !== undefined)
			{
				if (drag?.Ref_DragNewIndex.current !== undefined && drag?.high_light === true)
					f_on_click(drag?.Ref_DragNewIndex.current)
				parent_drag_end(drag?.setSS_Arr, drag?.Ref_DragOldIndex, drag?.Ref_DragNewIndex, drag?.setSS_DragOldIndex)
			}}}
		onDragEnter={(e)=>{
			if (drag !== undefined)
				parent_drag_enter(e, drag?.Ref_DragNewIndex, index)}}>
			<div
			onMouseDown={()=>{
				if (drag !== undefined)
					child_mouse_down(drag?.Ref_DragOldIndex, index)}}
			onDragStart={()=>{
				if (drag !== undefined)
					child_drag_start(drag?.Ref_DragOldIndex, drag?.setSS_DragOldIndex, index)}}>
				{item}
			</div>
	</span>
}
