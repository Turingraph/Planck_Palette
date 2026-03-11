import * as fc from "fabric"
import { RefObject } from "react"
import * as a from "../../../atom/type/alias"
import { t_dim, t_practical_config, t_practical_shape, t_shape } from "../utils/type"
import { get_point_grids } from "./draw_point"
import { draw_straight_line } from "./draw_straight_line"

export function update_grids(grids:number[], target:fc.Polyline[], 
	rgb:string|undefined) {
	let i = 0
	while (i < grids.length)
	{
		if (!rgb)
			target[grids[i]].set({fill: "#00000000"});
		else
			target[grids[i]].set({fill: rgb});
		i += 1
	}
}

export function paint_a_point(
	all_grids:t_dim, 
	current_grid:number,
	config:t_practical_config)
{
	// config.target = group_hover
	update_grids(
		get_point_grids(all_grids, {grid:current_grid, size:config.size}),
		config.target, config.rgb)
}

export function mouse_update_grid_global(
	Ref_FirstGrid:RefObject<number|undefined>, 
	Ref_PrevGrid:RefObject<number|undefined>, 
	Ref_CurrentGrid:RefObject<number|undefined>,
	config:t_practical_config,
	func:a.t_func_x<t_practical_shape>,
	real_grids:undefined|fc.Polyline[] = undefined,
)
{
	if (Ref_FirstGrid.current && Ref_PrevGrid.current)
	{
		func({
			...{...config,
			...{rgb:undefined}},
			...{
				grid_1:Ref_FirstGrid.current,
				grid_2:Ref_PrevGrid.current,
			}
		})
	}
	if (Ref_FirstGrid.current && Ref_CurrentGrid.current && real_grids !== undefined)
	{
		func({
			...{...config,
			...{rgb:undefined}},
			...{
				grid_1:Ref_FirstGrid.current,
				grid_2:Ref_CurrentGrid.current,
			}
		})
		func({
			...{...config,
			...{target:real_grids}},
			...{
				grid_1:Ref_FirstGrid.current,
				grid_2:Ref_CurrentGrid.current
			} as t_shape
		})
		Ref_FirstGrid.current = undefined
		Ref_PrevGrid.current = undefined
	}
	else if (Ref_FirstGrid.current && Ref_CurrentGrid.current)
	{
		func({
			...config,
			...{
				grid_1:Ref_FirstGrid.current,
				grid_2:Ref_CurrentGrid.current,
			}
		})
		Ref_PrevGrid.current = Ref_CurrentGrid.current
	}
}

export function mouse_update_grid_local(
	Ref_PrevGrid:RefObject<number|undefined>, 
	Ref_CurrentGrid:RefObject<number|undefined>,
	func:a.t_func_x<t_practical_shape>,
	config:t_practical_config
)
{
	if (Ref_PrevGrid.current && Ref_CurrentGrid.current)
	{
		func({
			...config,
			...{
				grid_1:Ref_PrevGrid.current,
				grid_2:Ref_CurrentGrid.current,
			}
		})
	}
	Ref_PrevGrid.current = Ref_CurrentGrid.current
}

export function draw_thicker_straight_line(dim:t_dim, shape:t_shape)
{
	let line = draw_straight_line(dim, shape)
	let output = [] as number[]
	let i = 0
	while (i < line.length)
	{
		output = output.concat(get_point_grids(dim, {size:shape.size, grid:line[i]}))
		i += 1
	}
	return output
}
