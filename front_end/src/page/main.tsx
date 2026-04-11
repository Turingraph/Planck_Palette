import { useReducer, useState } from "react";
import act_arr from "../atom/arr/act";
import { t_rgb_palettes } from "../atom/arr/type";
import * as a from "../atom/type/alias";
import MIDDLE from "../organism/canvas/main";
import LAYOUT_HEADER from "../organism/layout/layout_header";
import LAYOUT_SIDEBAR from "../organism/layout/layout_sidebar";
import LEFT from "./left/main";
import "./main.css";
import style from "./main.module.css";
import RIGHT from "./right/main";
import { ARR_SAVE, header_height } from "./utils/constant";
import PAINT_TOOLS from "./utils/paint_tools";

export default function MAIN()
{
	const [SS_NewRGB, setSS_NewRGB] = useState<string>("#000000")
	const [SS_DrawMode, setSS_DrawMode] = useState<number>(0)
	const [SS_PixelSize, setSS_PixelSize] = useState<number>(1)
	const [SS_RGBArr, setSS_RGBArr] = useReducer(
		act_arr, [] as t_rgb_palettes[])
	return <div className={`${style.main}`}>
	<LAYOUT_HEADER
		header_height={header_height}
		header_class_name={"left_taps"}
		tap_lists={ARR_SAVE}
		jsx_body={<LAYOUT_SIDEBAR
		axis_x={false}
		jsx_array={[
			<LEFT
				new_rgb={{ss:SS_NewRGB, setss:setSS_NewRGB}}
				rgb_arr={{ss:SS_RGBArr, setss:setSS_RGBArr}}
			/>, 
			<PAINT_TOOLS
				pixel_size={{ss:SS_PixelSize, setss:setSS_PixelSize}}
				draw_mode={{ss:SS_DrawMode, setss:setSS_DrawMode}}
			/>, 
			<MIDDLE
				pixel_size={{ss:SS_PixelSize, setss:setSS_PixelSize}}
				draw_mode={{ss:SS_DrawMode, setss:setSS_DrawMode}}
				new_rgb={{ss:SS_NewRGB, setss:setSS_NewRGB}}
			/>, 
			<RIGHT/>]}
		grid_template_rows={"460px 60px 1fr 300px" as a.t_css}
	/>}/></div>
}