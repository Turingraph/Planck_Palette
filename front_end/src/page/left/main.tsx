import * as a from "../../atom/type/alias"
import LAYOUT_SIDEBAR from "../../organism/layout/layout_sidebar"
import MULTI_MODES_PAGE from "../../organism/layout/multi_modes_page"
import PAINT_TOOLS from "./paint_tools"
import RGB_PALETTE from "./rgb_palette"
import SIMULATION from "./simulation"

export default function LEFT()
{
	return <div className="fill"><LAYOUT_SIDEBAR
		axis_x={false}
		grid_template_rows={"1fr 65px" as a.t_css}
		jsx_array={[
			<MULTI_MODES_PAGE
			jsx_array={[
				{title:"Palette", body:<RGB_PALETTE/>},
				{title:"Simulation", body:<SIMULATION/>},
				{title:"QR Code", body:<SIMULATION/>},
				{title:"Gen AI", body:<SIMULATION/>},
				{title:"Non Euclidean", body:<SIMULATION/>},
			]}/>,
			<PAINT_TOOLS/>
		]}
	/></div>
}