import { t_dim, t_shape } from "../utils/type"

export function draw_straight_line(dim:t_dim, shape:t_shape)
{
	let output = []
	const point_1_x = shape.grid_1 % dim.w
	const point_1_y = Math.floor(shape.grid_1 / dim.w)
	const point_2_x = shape.grid_2 % dim.w
	const point_2_y = Math.floor(shape.grid_2 / dim.w)
	const mode = Math.abs(point_1_x - point_2_x) < Math.abs(point_1_y - point_2_y) ? "Y" : "X"
	let start_x = point_1_x <= point_2_x ? point_1_x : point_2_x
	let stop_x = point_1_x <= point_2_x ? point_2_x : point_1_x
	let start_y = point_1_x <= point_2_x ? point_1_y : point_2_y
	let stop_y = point_1_x <= point_2_x ? point_2_y : point_1_y
	let pivot = point_1_x <= point_2_x ? shape.grid_1 : shape.grid_2
	if (mode === "Y")
	{
		start_x = point_1_y <= point_2_y ? point_1_y : point_2_y
		stop_x = point_1_y <= point_2_y ? point_2_y : point_1_y
		start_y = point_1_y <= point_2_y ? point_1_x : point_2_x
		stop_y = point_1_y <= point_2_y ? point_2_x : point_1_x
		pivot = point_1_y <= point_2_y ? shape.grid_1 : shape.grid_2
	}
	const dir = stop_y - start_y >= 0 ? 1 : -1
	const diff_x = stop_x - start_x
	const diff_y = Math.abs(stop_y - start_y)
	let decision = 2 * diff_y - diff_x
	let i = 0
	// WHEN i == 0
	// 		down <= mid <= up
	// 			y_0 <= (diff_y/diff_x)*1 + y_0 <= y_0 + 1
	// 			diff_x * y_0 <= diff_y + diff_x * y_0 <= diff_x * y_0 + diff_x
	// 		up - mid <= mid - down ? output.push(up) : output.push(down)
	// 			0 <= diff_y <= diff_x
	// 			diff_x - diff_y <= diff_y
	// 			0 <= 2 * diff_y - diff_x
	// WHEN i > 0
	// 		down <= mid <= up
	//			y <= (diff_y/diff_x)*i + y_0 <= y + 1
	//			diff_x * y <= diff_y * i + diff_x * y_0 <= diff_x * y + diff_x
	//			0 <= diff_y * i + diff_x * y_0 - diff_x * y <= diff_x
	//			0 <= diff_y * i + diff_x * (y_0 - y) <= diff_x
	// 		up - mid <= mid - down ? output.push(up) : output.push(down)
	//			diff_x - (diff_y * i + diff_x * (y_0 - y)) <= diff_y * i + diff_x * (y_0 - y)
	//			diff_x <= 2 * diff_y * i + 2 * diff_x * (y_0 - y)
	//			0 <= 2 * diff_y * i + 2 * diff_x * (y_0 - y) - diff_x
	//			0 <= 2 * diff_y * i - diff_x + 2 * diff_x * (y_0 - y)
	while (i < stop_x - start_x)
	{
		output.push(pivot)
		if (decision >= 0)
		{
			decision -= 2 * diff_x
			if (mode === "X")
				pivot += dim.w * dir
			else
				pivot += dir
		}
		if (mode === "X")
			pivot += 1
		else
			pivot += dim.w
		decision += 2 * diff_y
		i += 1
	}
	output.push(pivot)
	return output
}

export function draw_straight_line_freely(grid_1:t_dim, grid_2:t_dim)
{
	let output = [] as t_dim[]
	let start_x = grid_1.w <= grid_2.w ? grid_1.w : grid_2.w
	let stop_x = grid_1.w <= grid_2.w ? grid_2.w : grid_1.w
	let start_y = grid_1.w <= grid_2.w ? grid_1.h : grid_2.h
	let stop_y = grid_1.w <= grid_2.w ? grid_2.h : grid_1.h
	let pivot = grid_1.w <= grid_2.w ? grid_1 : grid_2
	const mode = Math.abs(grid_1.w - grid_2.w) <= Math.abs(grid_1.h - grid_2.h) ? "Y" : "X"
	if (mode === "Y")
	{
		start_x = grid_1.h <= grid_2.h ? grid_1.h : grid_2.h
		stop_x = grid_1.h <= grid_2.h ? grid_2.h : grid_1.h
		start_y = grid_1.h <= grid_2.h ? grid_1.w : grid_2.w
		stop_y = grid_1.h <= grid_2.h ? grid_2.w : grid_1.w
		pivot = grid_1.h <= grid_2.h ? grid_1 : grid_2
	}
	const diff_x = stop_x - start_x
	const diff_y = Math.abs(stop_y - start_y)
	const dir = stop_y - start_y >= 0 ? 1 : -1
	let decision = 2 * diff_y - diff_x
	let i = 0
	while (i < stop_x - start_x)
	{
		output.push(structuredClone(pivot))
		if (decision >= 0)
		{
			decision -= 2 * diff_x
			if (mode === "X")
				pivot.h += dir
			else
				pivot.w += dir
		}
		if (mode === "X")
			pivot.w += 1
		else
			pivot.h += 1
		decision += 2 * diff_y
		i += 1
	}
	output.push(structuredClone(pivot))
	return output
}

export function draw_straight_line_freely_in_canvas(dim:t_dim, grid_1:t_dim, grid_2:t_dim)
{
	let output = [] as number[]
	const long_straight_line = draw_straight_line_freely(grid_1, grid_2)
	let i = 0
	while (i < long_straight_line.length)
	{
		if (long_straight_line[i].w >= 0 &&
			long_straight_line[i].h >= 0 &&
			long_straight_line[i].w < dim.w &&
			long_straight_line[i].h < dim.h
		)
			output.push(long_straight_line[i].h * dim.w + long_straight_line[i].w)
		i += 1
	}
	return output
}
