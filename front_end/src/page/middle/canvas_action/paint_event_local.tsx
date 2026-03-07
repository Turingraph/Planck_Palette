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
			if (index)
			{
				func(index)
				main_canvas.requestRenderAll()
			}
		}
	})
}

export function event_draw_fast(
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

export function event_mouse_paint_local(
	main_canvas:fc.Canvas,
	f_get_grid_index:a.t_func_xy<{
		e:any, prev_grid:(number|undefined)
	}, number|undefined>,
	f_on_click:a.t_func_x<number>,
	f_mouse_down:a.t_func_x<{grid_1:number, grid_2:number}>,
	Ref_Time:{current:number}
)
{
	const Ref_PrevGrid = {current:undefined} as {current:undefined|number}
	const get_grid_index_inout_canvas = (input:any)=>{
		return f_get_grid_index({
			e:input, 
			prev_grid:Ref_PrevGrid.current})
	}
	event_on_click_grid(
		main_canvas, 
		((input:number)=>{
			f_on_click(input)
			Ref_PrevGrid.current = input
		}) as a.t_func_x<number>, 
		((input:any)=>{
			return get_grid_index_inout_canvas(input)
		}) as a.t_func_xy<any, number|undefined>)
	event_draw_fast(
		main_canvas, 
		((input:number)=>{
			if (Ref_PrevGrid.current !== undefined)
			f_mouse_down({
				grid_1:Ref_PrevGrid.current,
				grid_2:input
			})
			Ref_PrevGrid.current = input
		}) as a.t_func_x<number>, 
		((input:any)=>{
			return get_grid_index_inout_canvas(input)
		}) as a.t_func_xy<any, number|undefined>, 
		Ref_Time)
	main_canvas.on({
		"mouse:out":(()=>{
			Ref_PrevGrid.current = undefined
		})
	})
}

// BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
	// event_draw_fast(
	// 	main_canvas, 
	// 	((input:number)=>{
	// 		console.log("input", input)
	// 		if (Ref_PrevGrid.current !== undefined)
	// 		f_mouse_down({
	// 			grid_1:Ref_PrevGrid.current,
	// 			grid_2:input
	// 		})
	// 		Ref_PrevGrid.current = input
	// 	}) as a.t_func_x<number>, 
	// 	((input:any)=>{
	// 		console.log("get_grid_index_inout_canvas(input)", get_grid_index_inout_canvas(input))
	// 		return get_grid_index_inout_canvas(input)
	// 	}) as a.t_func_xy<any, number|undefined>, 
	// 	Ref_Time)

// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
	// main_canvas.on({
	// 	"mouse:move":(e)=>{
	// 		f_throttle(Ref_Time, 10, (()=>{
	// 			const index = f_get_grid_index({e:e, prev_grid:Ref_PrevGrid.current})
	// 			if (index !== undefined)
	// 			{
	// 				console.log("Ref_PrevGrid.current", Ref_PrevGrid.current)
	// 				if (Ref_PrevGrid.current !== undefined)
	// 				f_mouse_down({
	// 					grid_1:Ref_PrevGrid.current,
	// 					grid_2:index
	// 				})
	// 				Ref_PrevGrid.current = index
	// 			}
	// 		}) as a.t_func)
	// 	}
	// })

// export function event_mouse_paint_local(
// 	main_canvas:fc.Canvas,
// 	f_get_grid_index:a.t_func_xy<{
// 		e:any, prev_grid:number|undefined
// 	}, number|undefined>,
// 	f_on_click:a.t_func_x<t_practical_point>,
// 	f_mouse_down:a.t_func_x<t_practical_shape>
// ){
// 	event_on_click_grid(
// 		main_canvas,
// 		((input:number)=>{
// 			f_on_click({
// 				grid:input,
// 				size:1,
// 			})
// 		}) as a.t_func_x<number>,
// 		f_get_grid_index
// 	)
// }

/*
export function event_draw_fast_global(
	main_canvas:fc.Canvas,
	f_mouse_down:a.t_func_x<t_practical_shape>,
	Ref_FirstGrid:RefObject<undefined|number>,
	Ref_PrevGrid:RefObject<undefined|number>,
	Ref_CurrentGrid:RefObject<undefined|number>,
	f_get_grid_index:a.t_func_xy<any, number|undefined>,
)
{
	event_on_click_grid(main_canvas, ((input:number)=>{
		f_mouse_down()
		Ref_PrevGrid.current = input
		Ref_FirstGrid.current = input
	}) as a.t_func_x<number>, f_get_grid_index)
	event_draw_fast()
}
*/