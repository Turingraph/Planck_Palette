import B_STR, { t_B_STR } from "../../../molecule/button/b_str"
import STR_DESCRIPTOR from "../../../atom/str/str_descriptor";
import INPUT_NUMBER from "../../../molecule/input/input_number";
import { useEffect, useState } from "react";
import LAYOUT_SIDEBAR from "../../../organism/layout/layout_sidebar";
import STR from "../../../atom/str/str";
import { margin_x } from "../../../atom/type/css";
import * as a from "../../../atom/type/alias"
import INPUT_RANGE from "../../../molecule/input/input_range";
import { t_use_arr } from "../../../atom/arr/act";
import { t_rgb_palettes } from "../../../atom/arr/type";
import { count_selected_items, is_arr_has } from "../../../atom/arr/utils";

// https://www.w3schools.com/hTml/html_colors_hsl.asp

export default function RGB_TRANSFORM({
	new_rgb,
	rgb_arr,
	is_edit
}:{
	new_rgb:a.t_use_state<string>
	rgb_arr:t_use_arr<t_rgb_palettes, keyof t_rgb_palettes>
	is_edit:boolean
})
{
	const [SS_RGB_PCADim, setSS_RGB_PCADim] = useState<number>(1)
	const selected_rgb = is_edit ? count_selected_items(rgb_arr.ss, true, "select") : 0
	const [SS_RGB_KMean, setSS_RGB_KMean] = useState<number>(selected_rgb < 2 ? selected_rgb : 1)
	const [SS_Min_KMean, setSS_Min_KMean] = useState<number>(0)
	const [SS_Max_KMean, setSS_Max_KMean] = useState<number>(0)
	// https://www.w3schools.com/hTml/html_colors_hsl.asp
	// https://youtu.be/4emFL4aV9WM?si=_hUOx08uOuet23o5
	// (00:31)
	const [SS_H, setSS_H] = useState<number>(0)
	const [SS_S, setSS_S] = useState<number>(0)
	const [SS_L, setSS_L] = useState<number>(0)
	useEffect(()=>{
		if (SS_H > 50)
			new_rgb.setss("#0000FF")
	}, [SS_H])
	useEffect(()=>{
		const min = selected_rgb < 2 ? selected_rgb : 1
		const max = selected_rgb < 2 ? selected_rgb : selected_rgb - 1
		setSS_Min_KMean(min)
		setSS_Max_KMean(max)
		if (SS_RGB_KMean < min)
			setSS_RGB_KMean(min)
		else if (SS_RGB_KMean > max)
			setSS_RGB_KMean(max)
	}, [selected_rgb])
	const transform_ranges = ([
		{
			title:"H",
			use_state:{ss:SS_H, setss:setSS_H},
		},
		{
			title:"S",
			use_state:{ss:SS_S, setss:setSS_S},
		},
		{
			title:"L",
			use_state:{ss:SS_L, setss:setSS_L},
		},
	] as {title:string, use_state:a.t_use_state<number>, description:a.t_str_hover}[]).map((item, index)=>{
		return <LAYOUT_SIDEBAR
			key={index}
			axis_x={false}
			grid_template_rows={"20px 1fr" as a.t_css}
			jsx_array={[
				<STR text={item.title}/>,
				<INPUT_RANGE use_state={item.use_state} width={"100%" as a.t_css}/>
			]}
		/>
	})
	const transform_buttons = ([
		{
			title:"PCA " + selected_rgb + " RGB as",
			func:(()=>{console.log("LPop")}) as a.t_func,
			description:"Reduce the dimension of " + selected_rgb + " selected RGB color to " + SS_RGB_PCADim + "D RGB subspace",
			min:1,
			max:2,
			use_state:{ss:SS_RGB_PCADim, setss:setSS_RGB_PCADim},
			unit:"dim"

		},
		{
			title:"K-Mean " + selected_rgb + " RGB to",
			func:(()=>{console.log("LPop")}) as a.t_func,
			description:"Compress " + selected_rgb + " selected RGB to " + SS_RGB_KMean + " selected RGB",
			min:SS_Min_KMean,
			max:SS_Max_KMean,
			use_state:{ss:SS_RGB_KMean, setss:setSS_RGB_KMean},
			unit:"RGB"
		},
	] as (t_B_STR & {description:a.t_str_hover|undefined,
		use_state:a.t_use_state<number>, min:number, max:number, unit:string})[]).map((item, index)=>{
		return <LAYOUT_SIDEBAR
			key={index}
			axis_x={false}
			grid_template_rows={"135px 1fr 35px" as a.t_css}
			jsx_array={[
				<STR_DESCRIPTOR
					jsx_body={<B_STR title={item.title} func={item.func}/>}
					description={item.description}
				/>,
				<INPUT_NUMBER min={item.min} max={item.max} use_state={item.use_state}/>,
				<STR text={item.unit}/>
			]}
		/>
	})
	const b_add_new_color = <B_STR width={"100%" as a.t_css} title={"Add " + new_rgb.ss + " RGB"} func={(()=>{
		if (is_arr_has(rgb_arr.ss, new_rgb.ss, "rgb") === false)
			rgb_arr.setss({type:"PUSH", input:{id:0, select:false, rgb:new_rgb.ss}})}) as a.t_func} />
	return <LAYOUT_SIDEBAR
		grid_template_rows={"1fr 10px 110px" as a.t_css}
		jsx_array={[<div className="middle_taps_y" style={{backgroundColor:"greenyellow", width:"calc(100% - " + margin_x * 2 + "px )"}}>
			<STR text="Hue/Saturation"/>
			{transform_ranges}
			{b_add_new_color}
		</div>,
		<div></div>,
		<div className="middle_taps_y" style={{backgroundColor:"blueviolet", marginLeft:margin_x + "px", marginRight:margin_x + "px"}}>
			<STR text={"Transform " + selected_rgb + " RGBs"}/>
			{transform_buttons}
		</div>]}
	/>
}