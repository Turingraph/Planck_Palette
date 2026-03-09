import * as fc from "fabric";
import * as a from "../../../atom/type/alias";
import { f_throttle } from "../../../molecule/hook/Throttle";

export function event_on_click_grid(
	main_canvas:fc.Canvas,
	func:a.t_func_x<number>,
	f_get_grid_index:a.t_func_xy<any, number|undefined>,
)
{
	main_canvas.on({
		"mouse:down":(e)=>{
			const index = f_get_grid_index(e)
			if (index !== undefined)
			{
				func(index)
				main_canvas.requestRenderAll()
			}
		}
	})
}

export function event_draw_throttle(
	main_canvas:fc.Canvas,
	func:a.t_func_x<number>,
	f_get_grid_index:a.t_func_xy<any, number|undefined>,
	Ref_Time:{current:number}
)
{
	main_canvas.on({
		"mouse:move":(e)=>{
			f_throttle(Ref_Time, 10, (()=>{
				const index = f_get_grid_index(e)
				if (index !== undefined)
				{
					func(index)
					main_canvas.requestRenderAll()
				}
			}) as a.t_func)
		}
	})
}

export function event_draw_throttle_local(
	main_canvas:fc.Canvas,
	f_get_grid_index:a.t_func_xy<{
		e:any, prev_grid:(number|undefined)
	}, number|undefined>,
	f_mouse_down:a.t_func_x<{grid_1:number, grid_2:number}>,
	Ref_Time:{current:number}
)
{
	const Ref_PrevGrid = {current:undefined} as {current:undefined|number}
	event_on_click_grid(
		// main_canvas
		main_canvas, 
		// func
		((input:number)=>{
			Ref_PrevGrid.current = input
		}) as a.t_func_x<number>, 
		// f_get_grid_index
		((input:any)=>{
			return (f_get_grid_index({
			e:input, 
			prev_grid:Ref_PrevGrid.current}))
		}) as a.t_func_xy<any, number|undefined>)
	event_draw_throttle(
		// main_canvas
		main_canvas,
		// func
		((input:number)=>{
			if (Ref_PrevGrid.current !== undefined)
			{
				f_mouse_down({
					grid_1:Ref_PrevGrid.current,
					grid_2:Math.abs(input)
				})
			}
			if (input < 0)
				Ref_PrevGrid.current = undefined
			else
				Ref_PrevGrid.current = input
		}) as a.t_func_x<number>, 
		// f_get_grid_index
		((input:any)=>{
			return f_get_grid_index({
			e:input, 
			prev_grid:Ref_PrevGrid.current})
		}) as a.t_func_xy<any, number|undefined>, 
		Ref_Time)
}
