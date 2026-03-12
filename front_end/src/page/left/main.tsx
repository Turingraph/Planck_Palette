import { createContext } from "react"
import * as a from "../../atom/type/alias"
import LAYOUT_SIDEBAR from "../../organism/layout/layout_sidebar"
import MULTI_MODES_PAGE from "../../organism/layout/multi_modes_page"
import RGB_PALETTE from "./rgb_palette"
import SIMULATION from "./simulation"
import { t_rgb_palettes } from "../../atom/arr/type"
import { t_use_arr } from "../../atom/arr/act"
import { init_use_arr, init_use_state } from "../../molecule/utils/format_object"

export const CX_SS_PALETTE = createContext<{
	new_rgb:a.t_use_state<string>,
	rgb_arr:t_use_arr<t_rgb_palettes, keyof t_rgb_palettes>}>({
	new_rgb:init_use_state("#000000"),
	rgb_arr:init_use_arr([] as t_rgb_palettes[])
})

export default function LEFT({
	new_rgb,
	rgb_arr
}:{
	new_rgb:a.t_use_state<string>,
	rgb_arr:t_use_arr<t_rgb_palettes, keyof t_rgb_palettes>
})
{
	return <CX_SS_PALETTE value={{new_rgb:new_rgb, rgb_arr:rgb_arr}}>
		<div className="fill"><LAYOUT_SIDEBAR
			axis_x={false}
			grid_template_rows={"1fr" as a.t_css}
			jsx_array={[
				<MULTI_MODES_PAGE
				jsx_array={[
					{title:"Palette", body:<RGB_PALETTE/>},
					{title:"Simulation", body:<SIMULATION/>},
					{title:"QR Code", body:<SIMULATION/>},
					{title:"Gen AI", body:<SIMULATION/>},
					{title:"Non Euclidean", body:<SIMULATION/>},
				]}/>,
			]}
		/></div>
	</CX_SS_PALETTE>
}