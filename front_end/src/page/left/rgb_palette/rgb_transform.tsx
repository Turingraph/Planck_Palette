import B_STR, { t_B_STR } from "../../../molecule/button/b_str"
import * as a from "../../../atom/type/alias";
import STR_DESCRIPTOR from "../../../atom/str/str_descriptor";
import SELECT_ONE_TAP from "../../../molecule/selection_taps/select_one_tap";
import INPUT_NUMBER from "../../../molecule/input/input_number";
import { useState } from "react";
import LAYOUT_SIDEBAR from "../../../organism/layout/layout_sidebar";
import STR from "../../../atom/str/str";
import STR_HEADER from "../../../atom/str/str_header";

export default function RGB_TRANSFORM({
	rgb_picker
}:{
	rgb_picker:any
})
{
	const [SS_RGB_PCADim, setSS_RGB_PCADim] = useState<number>(1)
	const [SS_RGB_KMean, setSS_RGB_KMean] = useState<number>(1)
	const { Hue } = require('react-color/lib/components/common');
	const transform_button = ([
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
		axis_x={false}
			grid_template_rows={"145px 1fr 40px" as a.t_css}
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
	return <div className="fill" style={{backgroundColor:"crimson"}}>
	<div className="middle_taps_y">
		<B_STR width={"100%" as a.t_css} title={"Add #000000 RGB"} func={(()=>{console.log("LPop")}) as a.t_func} />
		<hr className="invisible_line"/>
		{/* <Hue
			// pointer={rgb_picker}
			onChange={(()=>{})}
			// direction={ 'horizontal' } 
			/> */}
		<hr className="invisible_line"/>

		{transform_button}
	</div>
	{/* <div className="center_box">
		<B_STR width={"100%" as a.t_css} title={"Add New Color"} func={(()=>{console.log("LPop")}) as a.t_func} />
	</div> */}
	</div>
}