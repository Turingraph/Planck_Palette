import * as fc from "fabric";
import * as a from "../../../atom/type/alias";
import { f_throttle } from "../../../molecule/hook/Throttle";
import { t_practical_config, t_practical_shape } from "../utils/type";

export function event_on_click_grid(
	main_canvas:fc.Canvas,
	func:a.t_func_x<number>,
	f_get_grid_index:a.t_func_xy<any, number|undefined>,
	event_type:"mouse:down"|"mouse:up" = "mouse:down"
)
{
	const f_event = function(e:any) {
		const index = f_get_grid_index(e)
		if (index !== undefined)
		{
			func(index)
			main_canvas.requestRenderAll()
		}
	}
	if (event_type === "mouse:down")
		main_canvas.on({
			"mouse:down":f_event
		})
	if (event_type === "mouse:up")
		main_canvas.on({
			"mouse:up":f_event
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
	// "mouse:down"
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
	// "mouse:move"
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

export function event_draw_throttle_global(
	main_canvas:fc.Canvas,
	f_get_grid_index:a.t_func_xy<{
		e:any, prev_grid:(number|undefined)
	}, number|undefined>,
	config:t_practical_config,
	f_mouse_down:a.t_func_x<t_practical_shape>,
	real_grids:fc.Polyline[],
	Ref_Time:{current:number}
)
{
	const Ref_FirstGrid = {current:undefined} as {current:undefined|number}
	const Ref_PrevGrid = {current:undefined} as {current:undefined|number}
	const paint_hover = function(input:number, is_mouse_up:boolean) {
			if (Ref_FirstGrid.current !== undefined && Ref_PrevGrid.current !== undefined)
				{
					const clean_config = { ...config }
					clean_config.rgb = undefined
					f_mouse_down({
						...clean_config,
						...{
							grid_1:Ref_FirstGrid.current,
							grid_2:Ref_PrevGrid.current
						},
					})
				}
			if (Ref_FirstGrid.current !== undefined)
			{
				const clean_config = { ...config }
				if (is_mouse_up)
					clean_config.target = real_grids
				f_mouse_down({
					...clean_config,
					...{
						grid_1:Ref_FirstGrid.current,
						grid_2:Math.abs(input),
					},
				})
				if (is_mouse_up)
				{
					Ref_FirstGrid.current = undefined
					Ref_PrevGrid.current = undefined
				}
			}
			Ref_PrevGrid.current = Math.abs(input)
	}
	// "mouse:down"
	event_on_click_grid(
		// main_canvas
		main_canvas, 
		// func
		((input:number)=>{
			Ref_FirstGrid.current = input
			Ref_PrevGrid.current = input
		}) as a.t_func_x<number>, 
		// f_get_grid_index
		((input:any)=>{
			return (f_get_grid_index({
			e:input, 
			prev_grid:Ref_FirstGrid.current}))
		}) as a.t_func_xy<any, number|undefined>)
	// "mouse:move"
	event_draw_throttle(
		// main_canvas
		main_canvas,
		// func
		((input:number)=>{paint_hover(input, false)}) as a.t_func_x<number>,
		// f_get_grid_index
		((input:any)=>{
			return f_get_grid_index({
			e:input, 
			prev_grid:Ref_FirstGrid.current})
		}) as a.t_func_xy<any, number|undefined>, 
		Ref_Time)
	// "mouse:up"
	event_on_click_grid(
		// main_canvas
		main_canvas, 
		// func
		((input:number)=>{paint_hover(input, true)}) as a.t_func_x<number>,
		// f_get_grid_index
		((input:any)=>{
			return (f_get_grid_index({
			e:input, 
			prev_grid:Ref_FirstGrid.current}))
		}) as a.t_func_xy<any, number|undefined>,
		"mouse:up"
	)
}
