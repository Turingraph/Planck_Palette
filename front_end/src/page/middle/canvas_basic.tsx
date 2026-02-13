import * as fc from "fabric"
import { useContext, useEffect, useRef } from "react"
import { get_point_grids } from "../../atom/canvas/utils/paint"
import { t_dim } from "../../atom/canvas/utils/type"
import { scale_vector, vector_addition } from "../../atom/utils/linear_algebra"
import { hex_to_rgb, rgb_to_hex } from "../../atom/utils/rgb_func"
import { CONTEXT_USE_STATE_GLOBAL } from "../../molecule/hook/context"
import * as a from "../../atom/type/alias"
import { f_throttle } from "../../molecule/hook/Throttle"

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

function update_not_hover(grids:number[], group:fc.Polyline[], width:number) {
	let i = 0
	while (i < grids.length)
    {
	    group[grids[i]].set({
	        fill: default_grid_color(undefined, grids[i], width)
	    });
		i += 1
	}
}

function update_hover(grids:number[], group:fc.Polyline[], width:number) {
	let i = 0
	while (i < grids.length)
    {
	    group[grids[i]].set({
	        fill: rgb_to_hex(vector_addition(
	            hex_to_rgb(default_grid_color(undefined, grids[i], width)),
	            scale_vector(hex_to_rgb("#ffffff"), 0.2)
	        ))
	    });
		i += 1
	}
}

export default function CANVAS_BASIC({
	grid,
	all_grids,
	canvas,
}:{
	grid:t_dim
	all_grids:t_dim
	canvas:t_dim
})
{
	const Ref_Time = useRef<number>(0)
	const Ref_Canvas = useRef<null|any>(null)
	const Ref_Hover = useRef<undefined|number>(undefined)
	const SS_PixelSize = useContext(CONTEXT_USE_STATE_GLOBAL).pixel_size.ss
	useEffect(()=>{
			const init_canvas = new fc.Canvas(Ref_Canvas.current,
			{
				width:  canvas.h,
				height: canvas.w,
				cssOnly: true
			})
			init_canvas.backgroundColor = "#f66"
			init_canvas.backgroundColor = "#f66"
			const width = all_grids.w
			const height = all_grids.h
			const border = {
				h:Math.floor((canvas.h - grid.h * all_grids.h)/2),
				w:Math.floor((canvas.w - grid.w * all_grids.w)/2)
			} as t_dim
			let group = [] as fc.Polyline[]
			let i = 0
			while (i < width*height)
			{
				let color = default_grid_color(undefined, i, width)
				const left = i % width
				const up = Math.floor(i / width)
				let square = new fc.Polyline([
					{ x: grid.w * (left + 0) + border.w, y: grid.h * (up + 0) + border.h},
					{ x: grid.w * (left + 1) + border.w, y: grid.h * (up + 0) + border.h},
					{ x: grid.w * (left + 1) + border.w, y: grid.h * (up + 1) + border.h},
					{ x: grid.w * (left + 0) + border.w, y: grid.h * (up + 1) + border.h},
				],{
					fill:color,
					strokeWidth:0,
				})
				group.push(square)
				i += 1
			}
			init_canvas.add(new fc.Group(group, {subTargetCheck: true}))
			init_canvas.on({
				"mouse:out":()=>{
					if (Ref_Hover.current !== undefined){
						update_not_hover(
							get_point_grids(all_grids, {grid:Ref_Hover.current, size:SS_PixelSize}),
							group,
							width
						)
						Ref_Hover.current = undefined
						init_canvas.requestRenderAll()
					}
				},
				"mouse:move":(e:any)=>{
					f_throttle(Ref_Time, 10, (()=>{
					const affine_constant = {
						w:Ref_Canvas.current.getBoundingClientRect().left, 
						h:Ref_Canvas.current.getBoundingClientRect().top} as t_dim
					const mouse_position = {
						w:e.e.clientX - affine_constant.w, 
						h:e.e.clientY - affine_constant.h} as t_dim
					const grid_position = {
						w:Math.floor((mouse_position.w - border.w)/grid.w),
						h:Math.floor((mouse_position.h - border.h)/grid.h)
					} as t_dim
					const hover = grid_position.h*width + grid_position.w
					if (hover !== Ref_Hover.current)
					{
						if (Ref_Hover.current)
							update_not_hover(
								get_point_grids(all_grids, {grid:Ref_Hover.current, size:SS_PixelSize}),
								group, width)
						update_hover(
							get_point_grids(all_grids, {grid:hover, size:SS_PixelSize}),
							group, width)
						Ref_Hover.current = hover
						init_canvas.requestRenderAll()
					}
				}) as a.t_func)
				}
			})
			init_canvas.renderAll()
			return ()=>{init_canvas.dispose()}
		})
	return <div className="fill center_box">
		<canvas id="fabrik_canvas" ref={Ref_Canvas}></canvas>
	</div>
}
