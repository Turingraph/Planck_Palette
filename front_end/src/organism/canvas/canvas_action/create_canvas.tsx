import * as fc from "fabric"
import { RefObject } from "react"
import { t_dim } from "../utils/type"

const square_config = {
	fill:"#FFFFFF00",
	strokeWidth:0,
	selectable: false,
	cursor:'crosshair',
}

function default_grid_color(rgb:undefined|string, index:number, width:number)
{
	if (rgb)
		return rgb
	let gray = "#333333"
	if (index % 2 === 0 && Math.floor(index/width) % 2 === 1)
		gray = "#555555"
	if (index % 2 === 1 && Math.floor(index/width) % 2 === 0)
		gray = "#555555"
	return gray
}

export function create_grids(all_grids:t_dim, border:t_dim, grid:t_dim, hover:boolean = false)
{
	let group = [] as fc.Polyline[]
	let i = 0
	while (i < all_grids.w * all_grids.h)
	{
		const color = hover === false ? default_grid_color(undefined, i, all_grids.w) : "#FFF0"
		const left = i % all_grids.w
		const up = Math.floor(i / all_grids.w)
		const position = [
			{ x: grid.w * (left + 0) + border.w, y: grid.h * (up + 0) + border.h},
			{ x: grid.w * (left + 1) + border.w, y: grid.h * (up + 0) + border.h},
			{ x: grid.w * (left + 1) + border.w, y: grid.h * (up + 1) + border.h},
			{ x: grid.w * (left + 0) + border.w, y: grid.h * (up + 1) + border.h},
		]
		group.push(new fc.Polyline(position,{...square_config, ...{fill:color}}))
		i += 1
	}
	return group
}

const canvas_config = {
	cssOnly: true,
	defaultCursor:"default",
	// https://stackoverflow.com/questions/50470313/
	// removing-highlighting-blue-rectangle-for-selection-in-fabric-js
	selection:false
}

export function create_canvas(Ref_Canvas:RefObject<any>, 
	canvas:t_dim)
{
	const init_canvas = new fc.Canvas(Ref_Canvas.current,
	{...{
		width:  canvas.w,
		height: canvas.h,
	},...canvas_config})
	init_canvas.backgroundColor = "#f66"
	// https://stackoverflow.com/questions/41848370/
	// fabricjs-change-cursor-for-every-object
	init_canvas.on({
		"mouse:over":(e:any)=>{
			if (e.target)
				e.target.hoverCursor = init_canvas.defaultCursor;
		}
	})
	return init_canvas
}

export function create_border(canvas:t_dim, all_grids:t_dim, grid:t_dim)
{
	return {
		h:Math.floor((canvas.h - grid.h * all_grids.h)/2),
		w:Math.floor((canvas.w - grid.w * all_grids.w)/2)
	} as t_dim
}
