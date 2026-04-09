import { t_use_arr } from "../../atom/arr/act"
import { t_rgb_palettes } from "../../atom/arr/type"
import * as a from "../../atom/type/alias"
import RGB_PALETTE from "./rgb_palette/main"

export default function LEFT({
	new_rgb,
	rgb_arr
}:{
	new_rgb:a.t_use_state<string>,
	rgb_arr:t_use_arr<t_rgb_palettes, keyof t_rgb_palettes>
})
{
	return <RGB_PALETTE new_rgb={new_rgb} rgb_arr={rgb_arr}/>
}

/* 
// This line of code is used for add future feature e.g. 
// finite element method, non Euclidean Geometry etc.
<MULTI_MODES_PAGE
	jsx_array={[
		{title:"Palette", body:<RGB_PALETTE/>},
		{title:"Simulation", body:<SIMULATION/>},
		{title:"QR Code", body:<SIMULATION/>},
		{title:"Gen AI", body:<SIMULATION/>},
		{title:"Non Euclidean", body:<SIMULATION/>},
]}/>
*/
