import B_STR, { t_B_STR } from "../../../molecule/button/b_str"
import STR_DESCRIPTOR from "../../../atom/str/str_descriptor";
import INPUT_NUMBER from "../../../molecule/input/input_number";
import { useEffect, useState } from "react";
import LAYOUT_SIDEBAR from "../../../organism/layout/layout_sidebar";
import STR from "../../../atom/str/str";
import { margin_x } from "../../../atom/type/css";
import * as a from "../../../atom/type/alias"
import INPUT_RANGE from "../../../molecule/input/input_range";

// https://www.w3schools.com/hTml/html_colors_hsl.asp

export default function RGB_TRANSFORM({
	new_rgb
}:{
	new_rgb:a.t_use_state<string>
})
{
	const [SS_RGB_PCADim, setSS_RGB_PCADim] = useState<number>(1)
	const [SS_RGB_KMean, setSS_RGB_KMean] = useState<number>(1)
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
			title:"PCA 10 RGB as",
			func:(()=>{console.log("LPop")}) as a.t_func,
			description:"Reduce the dimension of 10 selected RGB color to " + SS_RGB_PCADim + "D RGB subspace",
			min:1,
			max:2,
			use_state:{ss:SS_RGB_PCADim, setss:setSS_RGB_PCADim},
			unit:"dim"

		},
		{
			title:"K-Mean 10 RGB to",
			func:(()=>{console.log("LPop")}) as a.t_func,
			description:"Compress 10 selected RGB to " + SS_RGB_KMean + " selected RGB",
			min:1,
			max:9,
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
	return <LAYOUT_SIDEBAR
		grid_template_rows={"1fr 10px 110px" as a.t_css}
		jsx_array={[<div className="middle_taps_y" style={{backgroundColor:"greenyellow", width:"calc(100% - " + margin_x * 2 + "px )"}}>
			<STR text="Hue/Saturation"/>
			{transform_ranges}
			<B_STR width={"100%" as a.t_css} title={"Add #000000 RGB"} func={(()=>{console.log("LPop")}) as a.t_func} />
		</div>,
		<div></div>,
		<div className="middle_taps_y" style={{backgroundColor:"blueviolet", marginLeft:margin_x + "px", marginRight:margin_x + "px"}}>
			<STR text="Advance Setting"/>
			{transform_buttons}
		</div>]}
	/>
}