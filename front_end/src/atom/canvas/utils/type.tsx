/*
plan_rgb is used when
1.	Draw rectangle/circle/straight line, 
	because user need to be able to change the shape of
	rectangle/circle/straight line when holding mouse
	based on its starting position (grid_1) and 
	its current position (grid_2) before leave the mouse.
2.	Transforming color (e.g. replace #AA77CC with #4466FF)
*/

// export type t_set_obj<
//     k extends keyof object, e extends object[k]> = {
//     state:e,
//     key:k
// }

export type t_canvas_grid = {
	select:boolean,
	rgb:string|undefined,
	plan_rgb:string|undefined
}

export type t_canvas = {
	width:number,
	arr:t_canvas_grid[]
}

// arg = argument

export type t_paint_state<k extends keyof t_canvas_grid> = {
	state:t_canvas_grid[k],
	key:k
}

export type t_paint_1_grid<k extends keyof t_canvas_grid> = 
t_paint_state<k> & {grid:number}

export type t_paint_grids<k extends keyof t_canvas_grid> = 
t_paint_1_grid<k> & {size:number}

export type t_paint_shape<k extends keyof t_canvas_grid> = 
t_paint_grids<k> & {grid_2:number}

export type t_paint_helper<k extends keyof t_canvas_grid> = Omit<t_paint_grids<k>, "key">
export type t_paint_fixed_helper<k extends keyof t_canvas_grid> = Omit<t_paint_grids<k>, keyof t_paint_state<k>>
export type t_paint_helper_shape<k extends keyof t_canvas_grid> = Omit<t_paint_shape<k>, "key">
