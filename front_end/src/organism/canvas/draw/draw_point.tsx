import { t_dim, t_point } from "../utils/type"

export function inside_box_x(grid:number, width:number, i:number)
{
	const y = (grid+1) % width !== 0 ? Math.floor((grid + 1)/width) : Math.floor(grid/width)
	if (y * width <= grid+i && grid+i < (y + 1) * width)
		return true
	return false
}

export function inside_box_y(grid:number, width:number, i:number, length:number)
{
	if (0 <= grid + i * width && grid + i * width < length)
		return true
	return false
}

export function get_brush_grids(
	dim:t_dim,
	point:t_point,
	mode:"UP"|"DOWN"|"LEFT"|"RIGHT"|"MIDDLE_X"|"MIDDLE_Y",
){
	const size = point.size
	const grid = point.grid
	const width = dim.w
	const dir = ["UP", "LEFT"].includes(mode) ? -1 : 1
	let output = [] as number[]
	if (["MIDDLE_X", "MIDDLE_Y"].includes(mode))
	{
		output.push(grid)
		const right=Math.floor((size+1)/2)
		const left = size % 2 === 0 ? right + 1 : right
		output = output.concat(get_brush_grids(dim,
			{...point, size: left},
			mode === "MIDDLE_X" ? "LEFT" : "UP"
		))
		output = output.concat(get_brush_grids(dim,
			{...point, size: right},
			mode === "MIDDLE_X" ? "RIGHT" : "DOWN"
		))
		return output
	}
	let i = 1
	while (i < size)
	{
		if (["LEFT", "RIGHT"].includes(mode) && inside_box_x(grid, width, i*dir))
			output.push(i*dir + grid)
		if (["UP", "DOWN"].includes(mode) 
			&& inside_box_y(grid, width, i*dir, width * dim.h))
			output.push(i*width*dir + grid)
		i += 1
	}
	return output
}

export function get_point_grids(
	dim:t_dim,
	point:t_point,
	mode:"LEFT"|"RIGHT"|"MIDDLE_X" = "MIDDLE_X",
	last:number|undefined = undefined
){
	const size = last ? last : point.size
	const grid = point.grid
	const dir = "LEFT" === mode ? -1 : 1
	let output = [] as number[]
	if (mode === "MIDDLE_X")
	{
		output = output.concat(get_brush_grids(dim, point, "MIDDLE_Y"))
		const right=Math.floor((size+1)/2)
		const left = size % 2 === 0 ? right + 1 : right
		output = output.concat(get_point_grids(dim, point, "LEFT", left))
		output = output.concat(get_point_grids(dim, point,"RIGHT", right))
		return output
	}
	let i = 1
	while (i < size)
	{
		if (inside_box_x(grid, dim.w, i*dir))
			output = output.concat(get_brush_grids(dim,
			{...point, grid:i*dir + grid}, "MIDDLE_Y"))
		i += 1
	}
	return output
}
