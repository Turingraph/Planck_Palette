import { useReducer, useState } from "react";
import act_arr from "../atom/arr/act";
import { t_rgb_palettes } from "../atom/arr/type";
import * as a from "../atom/type/alias";
import { insert_use_arr, insert_use_state } from "../molecule/utils/format_object";
import MIDDLE from "../organism/canvas/main";
import LAYOUT_HEADER from "../organism/layout/layout_header";
import LAYOUT_SIDEBAR from "../organism/layout/layout_sidebar";
import LEFT from "./left/main";
import "./main.css";
import style from "./main.module.css";
import RIGHT from "./right/main";
import { ARR_SAVE, header_height } from "./utils/constant";
import PAINT_TOOLS from "./utils/paint_tools";
import { rgb_arr_test } from "./utils/test_constant";

export default function MAIN()
{
	const [SS_NewRGB, setSS_NewRGB] = useState<string>("#000000")
	const [SS_DrawMode, setSS_DrawMode] = useState<number>(0)
	const [SS_PixelSize, setSS_PixelSize] = useState<number>(1)
	const [SS_RGBArr, setSS_RGBArr] = useReducer(
		act_arr, rgb_arr_test.map((item,index)=>{
			return {id:index, select:false, rgb:item}
		}) as t_rgb_palettes[])
	return <div className={`${style.main}`}>
	<LAYOUT_HEADER
		header_height={header_height}
		header_class_name={"left_taps"}
		tap_lists={ARR_SAVE}
		jsx_body={<LAYOUT_SIDEBAR
		axis_x={false}
		jsx_array={[
			<LEFT
				new_rgb={insert_use_state(SS_NewRGB, setSS_NewRGB)}
				rgb_arr={insert_use_arr(SS_RGBArr, setSS_RGBArr)}
			/>, 
			<PAINT_TOOLS
				pixel_size={insert_use_state(SS_PixelSize, setSS_PixelSize)}
				draw_mode={insert_use_state(SS_DrawMode, setSS_DrawMode)}
				new_rgb={insert_use_state(SS_NewRGB, setSS_NewRGB)}
			/>, 
			<MIDDLE
				pixel_size={insert_use_state(SS_PixelSize, setSS_PixelSize)}
				draw_mode={insert_use_state(SS_DrawMode, setSS_DrawMode)}
				new_rgb={insert_use_state(SS_NewRGB, setSS_NewRGB)}
			/>, 
			<RIGHT/>]}
		grid_template_rows={"450px 65px 1fr 300px" as a.t_css}
	/>}/></div>
}