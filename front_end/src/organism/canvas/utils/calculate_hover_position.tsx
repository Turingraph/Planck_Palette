import { RefObject } from "react"
import { t_dim } from "./type"
import { draw_straight_line_freely_in_canvas } from "../draw/draw_straight_line"

export function mouse_to_ith_grid(
	Ref_Canvas:RefObject<any>,
	mouse:t_dim,
	grid:t_dim,
	border:t_dim,
	width:number
)
{
	const affine_const = {
		w:Ref_Canvas.current.getBoundingClientRect().left, 
		h:Ref_Canvas.current.getBoundingClientRect().top} as t_dim
	const mouse_position = {
		w:mouse.w - affine_const.w,
		h:mouse.h - affine_const.h,
	}
	const grid_position = {
		w:Math.floor((mouse_position.w - border.w)/grid.w),
		h:Math.floor((mouse_position.h - border.h)/grid.h)
	}
	const hover = grid_position.h*width + grid_position.w
	return {mouse_position, hover}
}

export function is_mouse_in_canvas(mouse:t_dim, canvas:t_dim)
{
	if (mouse.w >= 0 &&
		mouse.h >= 0 &&
		mouse.w <= canvas.w &&
		mouse.h <= canvas.h
	)
	return true
	return false
}

export function one_dim_to_two_dim(grid:number|undefined, width:number)
{
	return grid ? {
		w:grid % width,
		h:Math.floor(grid/width)
	} : undefined
}

export function get_edge_index(
	prev_grid:number|undefined,
	width:number,
	all_grids:t_dim,
	grid:t_dim,
	mouse:t_dim,
)
{
	const mouse_position_index = {
		w:Math.floor(mouse.w/grid.w),
		h:Math.floor(mouse.h/grid.h),
	}
	const prev_grid_index = one_dim_to_two_dim(prev_grid, width)
	if (prev_grid_index)
	{
		const edge_girds = draw_straight_line_freely_in_canvas(all_grids, prev_grid_index, mouse_position_index)
		const edge_current = edge_girds[0] === prev_grid ? edge_girds[edge_girds.length - 1] : edge_girds[0]
		return edge_current
	}
	return undefined
}
