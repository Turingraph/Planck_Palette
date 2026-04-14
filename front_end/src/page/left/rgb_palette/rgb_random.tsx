import { t_use_arr } from "../../../atom/arr/act";
import { t_rgb_palettes } from "../../../atom/arr/type";
import B_STR from "../../../molecule/button/b_str";
import SELECT_ONE_TAP from "../../../molecule/selection_taps/select_one_tap";
import * as a from "../../../atom/type/alias"
import { useState } from "react";
import { hex_to_rgb, rgb_to_hex } from "../../../atom/utils/rgb_func";
import { get_value_arr, is_arr_has } from "../../../atom/arr/utils";
import { get_means, get_random_int, get_random_normal, get_random_uniform, get_variance } from "../../../atom/utils/random";

export function get_random_rgb()
{
	return rgb_to_hex([
	get_random_int(256),
	get_random_int(256),
	get_random_int(256),
])
}

export function get_minmax_rgb(rgb_arr:string[])
{
	let max_r = 0
	let min_r = 255
	let max_g = 0
	let min_g = 255
	let max_b = 0
	let min_b = 255
	let i = 0
	while (i < rgb_arr.length)
	{
		let rgb = hex_to_rgb(rgb_arr[i])
		if (max_r < rgb[0])
			max_r = rgb[0]
		if (max_g < rgb[1])
			max_g = rgb[1]
		if (max_b < rgb[2])
			max_b = rgb[2]
		if (min_r > rgb[0])
			min_r = rgb[0]
		if (min_g > rgb[1])
			min_g = rgb[1]
		if (min_b > rgb[2])
			min_b = rgb[2]
		i += 1;
	}
	return [min_r, max_r, min_g, max_g, min_b, max_b] as [number,number,number,number,number,number]
}

export function get_random_uniform_rgb(minmax_rgb:[number,number,number,number,number,number])
{
	return rgb_to_hex([
		get_random_uniform(minmax_rgb[0], minmax_rgb[1]),
		get_random_uniform(minmax_rgb[2], minmax_rgb[3]),
		get_random_uniform(minmax_rgb[4], minmax_rgb[5]),
	])
}

export function get_ustd_rgb(rgb_arr:string[])
{
	let r_arr = []
	let g_arr = []
	let b_arr = []
	let i = 0
	while (i < rgb_arr.length)
	{
		let rgb = hex_to_rgb(rgb_arr[i])
		r_arr.push(rgb[0])
		g_arr.push(rgb[1])
		b_arr.push(rgb[2])
		i += 1
	}
	return [
		get_means(r_arr),
		Math.sqrt(get_variance(r_arr)),
		get_means(g_arr),
		Math.sqrt(get_variance(g_arr)),
		get_means(b_arr),
		Math.sqrt(get_variance(b_arr)),
	] as [number,number,number,number,number,number]
}

export function get_random_normal_rgb(ustd_rgb:[number,number,number,number,number,number])
{
	return rgb_to_hex([
		get_random_normal(ustd_rgb[0], ustd_rgb[1]),
		get_random_normal(ustd_rgb[2], ustd_rgb[3]),
		get_random_normal(ustd_rgb[4], ustd_rgb[5]),
	])
}


/*
ChatGPT recommended me to use other distribution including
1.	Beta distribution
2.	Log Normal Distribution
3.	Dirichlet distribution

However, I won't add those feature in the eraly version of my app.
*/

export default function RGB_RANDOM({
	rgb_arr
}:{
	rgb_arr:t_use_arr<t_rgb_palettes, keyof t_rgb_palettes>
})
{
	const [SS_RandomMode, setSS_RandomMode] = useState<string>("Random")
	const prerequisite = 5
	return <SELECT_ONE_TAP
		use_select_item={undefined}
		jsx_select_array={[
			<B_STR title="add random color" func={(()=>{
				let new_rgb = get_random_rgb()
				if (rgb_arr.ss.length < prerequisite || SS_RandomMode === "Random")
				{
					new_rgb = get_random_rgb()
					while (is_arr_has(rgb_arr.ss, new_rgb, "rgb") === true)
						new_rgb = get_random_rgb()
				}
				if (rgb_arr.ss.length >= prerequisite && SS_RandomMode === "Uniform")
				{
					let minmax_rgb = get_minmax_rgb(get_value_arr(rgb_arr.ss, "rgb"))
					new_rgb = get_random_uniform_rgb(minmax_rgb)
					while (is_arr_has(rgb_arr.ss, new_rgb, "rgb") === true)
						new_rgb = get_random_uniform_rgb(minmax_rgb)
				}
				if (rgb_arr.ss.length >= prerequisite && SS_RandomMode === "Normal")
				{
					let minmax_rgb = get_ustd_rgb(get_value_arr(rgb_arr.ss, "rgb"))
					new_rgb = get_random_normal_rgb(minmax_rgb)
					while (is_arr_has(rgb_arr.ss, new_rgb, "rgb") === true)
						new_rgb = get_random_normal_rgb(minmax_rgb)
				}
				rgb_arr.setss({
					type:"PUSH",
					input:{id:0, rgb:new_rgb, select:false}
				})
			}) as a.t_func}/>,
			/* https://react.dev/reference/react-dom/components/select */
			<select className="select" 
				onChange={(e:any)=>{
					setSS_RandomMode(e.target.value)
				}}
				value={SS_RandomMode}>
				<option value="Random">Random</option>
				<option value="Uniform">Uniform</option>
				<option value="Normal">Normal</option>
			</select>]}
		/>
}