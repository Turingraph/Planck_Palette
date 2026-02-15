import * as fc from "fabric"
import * as a from "../../atom/type/alias"

export type t_dim = {
	w:number,
	h:number
}

export type t_point = {
	grid:number,
	size:number
}

export type t_points = {
	grids:number[],
	size:number
}

export type t_rgb_point = t_point & {
	rgb:string|undefined
}

export type t_rgb_points = t_points & {
	rgb:string|undefined
}

export type t_canvas_on_click = {
	func:a.t_func_x<t_rgb_point & {target:fc.Polyline[]}>,
	target:"HOVER"|"NORMAL"
}

export type t_canvas_mouse_down = {
	func:a.t_func_x<t_rgb_points & {target:fc.Polyline[]}>,
	target:"HOVER"|"NORMAL",
	//push_method:a.t_func_x<number>
}
