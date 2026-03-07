import * as fc from "fabric"
import * as a from "../../../atom/type/alias"

export type t_dim = {
	w:number,
	h:number
}

export type t_canvas_dim = {
	grid:t_dim
	all_grids:t_dim
	canvas:t_dim
}

//----------------------------------------------------------------------

export type t_rgb = {rgb:string|undefined}
export type t_practical = t_rgb & {target:fc.Polyline[]}
export type t_practical_config = t_practical & {size:number}

//----------------------------------------------------------------------

export type t_point = {
	grid:number,
	size:number
}

export type t_rgb_point = t_point & t_rgb

export type t_practical_point = t_point & t_practical

export type t_canvas_on_click = a.t_func_x<t_practical_point>

//----------------------------------------------------------------------

export type t_shape = Omit<t_point, "grid"> & {grid_1:number, grid_2:number}

export type t_rgb_shape = t_shape & t_rgb

export type t_practical_shape = t_shape & t_practical

export type t_canvas_mouse_down = {
	scale:"GLOBAL"|"LOCAL",
	func:a.t_func_x<t_practical_shape>
}
