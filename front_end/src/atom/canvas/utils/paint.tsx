import { t_canvas, t_canvas_grid, t_paint_area, t_paint_grid, t_paint_shape } from "./type"
import { flip_index_x, inside_box_x, inside_box_y } from "./utils"

export function paint_1_grid<
	k extends keyof t_canvas_grid>(
	arr:t_canvas,
	input:t_paint_area<k>
){
	arr.arr[input.grid][input.key] = input.state
	return arr
}

export function paint_brush<
	k extends keyof t_canvas_grid>(
	arr:t_canvas,
	input:t_paint_grid<k>,
	mode:"UP"|"DOWN"|"LEFT"|"RIGHT"|"MIDDLE_X"|"MIDDLE_Y"
){
	const size = input.size
	const grid = input.grid
	const width = arr.width
	let update_arr = {
	arr:[...arr.arr],
	width:arr.width
	} as t_canvas
	if (size < 1)
		return update_arr
	update_arr = paint_1_grid(
		update_arr, input
	)
	if (["MIDDLE_X", "MIDDLE_Y"].includes(mode))
	{
		const right=Math.floor((size+1)/2)
		const left = size % 2 === 0 ? right + 1 : right
		update_arr = paint_brush(
			update_arr,
			{...input, size:left},
			"MIDDLE_X" === mode ? "LEFT" : "UP"
		)
		update_arr = paint_brush(
			update_arr,
			{...input, size:right},
			"MIDDLE_X" === mode ? "RIGHT" : "DOWN"
		)
		return update_arr
	}
	const dir = ["UP", "LEFT"].includes(mode) ? -1 : 1
	let i = 1
	while (i < size)
	{
		if (["LEFT", "RIGHT"].includes(mode) && inside_box_x(grid, width, i*dir))
			update_arr = paint_1_grid(
				update_arr, 
				{...input, grid:grid + i*dir})
		if (["UP", "DOWN"].includes(mode) 
			&& inside_box_y(grid, width, i*dir, update_arr.arr.length))
			update_arr = paint_1_grid(
				update_arr, 
				{...input, grid:grid + i*width*dir})
		i += 1
	}
	return update_arr
}

export function paint_point<
	k extends keyof t_canvas_grid>(
	arr:t_canvas,
	input:t_paint_grid<k>
){
	const grid = input.grid
	const size = input.size
	const width = arr.width
	let update_arr = {
	arr:[...arr.arr],
	width:width
	} as t_canvas
	update_arr = paint_brush(update_arr, input, "MIDDLE_Y")
	let i = 1
	while (i < (size)/2)
	{
		if (inside_box_x(grid, width, i))
			update_arr = paint_brush(update_arr, {...input, grid:grid+i}, "MIDDLE_Y")
		if (inside_box_x(grid, width, -i))
			update_arr = paint_brush(update_arr, {...input, grid:grid-i}, "MIDDLE_Y")
		i += 1
	}
	if ((size)%2 === 0 && inside_box_x(grid, width, -i))
		update_arr = paint_brush(update_arr, {...input, grid:grid-i}, "MIDDLE_Y")
	return update_arr
}

export function paint_point_mirror<
	k extends keyof t_canvas_grid>(
	arr:t_canvas,
	input:t_paint_grid<k>
){
	arr = paint_point(arr, input)
	arr = paint_point(arr, {...input, grid:flip_index_x(input.grid, arr.width)})
	return arr
}

export function paint_rectangle<
	k extends keyof t_canvas_grid>(
	arr:t_canvas,
	input:t_paint_shape<k>
){
	const {
		"grid_1": omit_1, 
		"grid_2": omit_2, 
		...arg } = input;
	const size = input.size
	const g1 = input.grid_1 <= input.grid_2 ? input.grid_1 : input.grid_2
	const g2 = input.grid_1 <= input.grid_2 ? input.grid_2 : input.grid_1
	const w = arr.width
	const u = Math.floor(g1/w)
	const d = Math.floor(g2/w)
	const l = g1 % w
	const r = g2 % w
	let i = u
	while (i <= d)
	{
		if (i < size + u || i > d - size)
		{
			let j = l
			while (j <= r)
			{
				// https://stackoverflow.com/questions/43011742/
				// how-to-omit-specific-properties-from-an-object-in-javascript
				const {
					"size": omit_3, 
					...rest } = arg;
				arr = paint_1_grid(arr, {...rest, grid:i*w + j})
				j += 1
			}
		}
		else
		{
			arr = paint_brush(arr, {...arg, grid: i*w + l}, "RIGHT")
			arr = paint_brush(arr, {...arg, grid: i*w + r}, "LEFT")
		}
		i += 1
	}
	return (arr)
}

/*
export function paint_brush(
	arr:t_canvas,
	rgb:undefined|string|boolean,
	grid:number,
	size:number,
	mode:"UP"|"DOWN"|"LEFT"|"RIGHT"|"MIDDLE_X"|"MIDDLE_Y"
){
	console.log("Nujabes")
	const width = arr.width
	let update_arr = {
	arr:[...arr.arr],
	width:width
	} as t_canvas
	if (size < 1)
		return update_arr
	if (["MIDDLE_X", "MIDDLE_Y"].includes(mode))
	{
		update_arr = paint_brush(
			update_arr,
			rgb,
			grid,
			size % 2 === 0 ? Math.floor(size/2) + 1 : Math.floor(size/2),
			"MIDDLE_X" === mode ? "LEFT" : "UP"
		)
		update_arr = paint_brush(
			update_arr,
			rgb,
			grid,
			Math.floor(size/2),
			"MIDDLE_X" === mode ? "RIGHT" : "DOWN"
		)
		return update_arr
	}
	update_arr = paint_1_grid(update_arr, grid, rgb)
	const height = Math.floor(update_arr.arr.length/width)
	const [y, x] = get_yx(grid, width)
	let i = 1 * (mode === "UP" ? -1 : 1)
	let j = 1 * (mode === "LEFT" ? -1 : 1)
	if (["UP", "DOWN"].includes(mode))
		j = 0
	else
		i = 0
	while (Math.abs(i) < size && Math.abs(j) < size && valid_2d(
		height,
		y + i,
		width,
		x + j
	))
	{
		update_arr = paint_1_grid(update_arr, access_yx([y + i, x + j], width), rgb)
		if (i > 0)
			i += 1 * (mode === "UP" ? -1 : 1)
		if (j > 0)
			j += 1 * (mode === "LEFT" ? -1 : 1)
	}
	return update_arr
}

export function paint_point(
	arr:t_canvas,
	rgb:undefined|string|boolean,
	grid:number,
	size:number,
){
	const height = Math.floor(arr.arr.length/arr.width)
	const [y, x] = get_yx(grid, arr.width)
	let i = 0
	while (i < Math.floor(size/2) && valid_2d(
		height,
		y + i,
		arr.width,
		x
	))
	{
		arr = paint_brush(
			arr,
			rgb,
			access_yx([y + i, x], arr.width),
			size,
			"MIDDLE_X"
		)
		arr = paint_brush(
			arr,
			rgb,
			access_yx([y - i, x], arr.width),
			size,
			"MIDDLE_X"
		)
	}
	if (size % 2 === 0)
	{
		arr = paint_brush(
			arr,
			rgb,
			access_yx([y - i, x], arr.width),
			size,
			"MIDDLE_X"
		)
	}
	return arr
}

export function paint_rectangle_donut(
	arr:t_canvas,
	rgb:undefined|string|boolean,
	size:number,
	rectangle:[number,number]
){
	let [up, left] = get_yx(rectangle[0], arr.width)
	let [down, right] = get_yx(rectangle[1], arr.width)
	left = swap_less_than(left, right)[0]
	right = swap_less_than(left, right)[1]
	up = swap_less_than(up, down)[0]
	down = swap_less_than(up, down)[1]
	let i = up
	while (i <= down)
	{
		let j = left
		if (i < up + size || i > down - size)
		{
			while (j <= right)
			{
				arr = paint_brush(
					arr, rgb, 
					access_yx([i, j], arr.width), 1, "UP")
				j += 1
			}
		}
		else
		{
			arr = paint_brush(arr, rgb, access_yx([i, j], arr.width), size, "RIGHT")
			arr = paint_brush(arr, rgb, access_yx([i, right - j], arr.width), size, "LEFT")
		}
		i += 1
	}
}

export function paint_rectangle(
	arr:t_canvas,
	rgb:undefined|boolean|string,
	rectangle:[number,number]
){
	let [up, left] = get_yx(rectangle[0], arr.width)
	let [down, right] = get_yx(rectangle[1], arr.width)
	left = swap_less_than(left, right)[0]
	right = swap_less_than(left, right)[1]
	up = swap_less_than(up, down)[0]
	down = swap_less_than(up, down)[1]
	let i = up
	while (i <= down)
	{
		let j = left
		while (j <= right)
		{
			arr = paint_1_grid(arr, access_yx([i, j], arr.width), rgb)
			j += 1
		}
		i += 1
	}
	return arr
}

export function paint_outside_rectangle(
	arr:t_canvas,
	rgb:undefined|boolean|string,
	rectangle:[number,number]
){
	let [up, left] = get_yx(rectangle[0], arr.width)
	let [down, right] = get_yx(rectangle[1], arr.width)
	left = swap_less_than(left, right)[0]
	right = swap_less_than(left, right)[1]
	up = swap_less_than(up, down)[0]
	down = swap_less_than(up, down)[1]
	const height = Math.floor(arr.arr.length/arr.width)
	let i = 0
	while (i < height)
	{
		let j = 0
		while (j < arr.width)
		{
			if ((i < up || i > down || j < left || j > right) 
				&& valid_2d(height, i, arr.width, j))
				arr = paint_1_grid(arr, access_yx([i, j], arr.width), rgb)
			j += 1
		}
		i += 1
	}
	return arr
}

export function paint_scale(
	arr:t_canvas,
	rgb:undefined|boolean|string,
	grid:number,
	width:number,
	height:number
){
	const [y,x] = get_yx(grid, arr.width)
	let i = 0
	while (i < height)
	{
		arr = paint_brush(arr, rgb, access_yx([y + i, x], arr.width), width, "RIGHT")
		i += 1
	}
	return arr
}
*/

