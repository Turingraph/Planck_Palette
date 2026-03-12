import * as a from "../../atom/type/alias";

import bucket from "../../asset/draw/bucket.png";
import circle from "../../asset/draw/circle.png";
import eraser from "../../asset/draw/eraser.png";
import line from "../../asset/draw/line.png";
import mirror_pen from "../../asset/draw/mirror_pen.png";
import pen from "../../asset/draw/pen.png";
import rectangle from "../../asset/draw/rectangle.png";
import replace_rgb from "../../asset/draw/replace_rgb.png";

import crop from "../../asset/transform/crop.png";
import flip from "../../asset/transform/flip.png";
import rotate from "../../asset/transform/rotate.png";
import upside_down from "../../asset/transform/upside_down.png";

import rectangle_select from "../../asset/utils/rectangle_select.png";
import rgb_picker from "../../asset/utils/rgb_picker.png";

import { t_B_LOGO } from "../../molecule/button/b_logo";
import { t_B_STR } from "../../molecule/button/b_str";
import { t_page_with_title } from "../../organism/layout/type";

export const ARR_DRAW:t_B_LOGO[] = [
	{
		description:"Pen" as a.t_str_hover,		// 3
		logo:pen as a.t_logo,
		func:(()=>{}) as a.t_func
	},
	{
		description:"Eraser" as a.t_str_hover,	// 3
		logo:eraser as a.t_logo,
		func:(()=>{}) as a.t_func
	},
	{
		description:"Draw straight Line" as a.t_str_hover, // 2
		logo:line as a.t_logo,
		func:(()=>{}) as a.t_func
	},
	{
		description:"Mittor Pen" as a.t_str_hover,	// 3
		logo:mirror_pen as a.t_logo,
		func:(()=>{}) as a.t_func
	},
	{
		description:"Bucket" as a.t_str_hover,	// 1
		logo:bucket as a.t_logo,
		func:(()=>{}) as a.t_func
	},
	{
		description:"Replace selected color with new color" as a.t_str_hover, // 1
		logo:replace_rgb as a.t_logo,
		func:(()=>{}) as a.t_func
	},
	{
		description:"Draw rectangle" as a.t_str_hover,	// 2
		logo:rectangle as a.t_logo,
		func:(()=>{}) as a.t_func
	},
	{
		description:"Draw Circle" as a.t_str_hover,	// 2
		logo:circle as a.t_logo,
		func:(()=>{}) as a.t_func
	},
	{
		description:"Move selected Rectangle area to new area" as a.t_str_hover,
		logo:rectangle_select as a.t_logo,
		func:(()=>{}) as a.t_func
	},
	{
		description:"Crop Canvas" as a.t_str_hover,
		logo:crop as a.t_logo,
		func:(()=>{}) as a.t_func
	},
	{
		description:"Pick rgb color" as a.t_str_hover,	// 0
		logo:rgb_picker as a.t_logo,
		func:(()=>{}) as a.t_func
	}]

export const ARR_TRANSFORM:t_B_LOGO[] = [
	{
		description:"Flip Canvas in left direction" as a.t_str_hover,
		logo:flip as a.t_logo,
		func:(()=>{}) as a.t_func
	},
	{
		description:"Rotate Canvas" as a.t_str_hover,
		logo:rotate as a.t_logo,
		func:(()=>{}) as a.t_func
	},
	{
		description:"Make Canvas become upside down" as a.t_str_hover,
		logo:upside_down as a.t_logo,
		func:(()=>{}) as a.t_func
	},
]

export const ARR_SAVE:t_B_STR[] = [
	{
		title:"save as",
		func:(()=>{}) as a.t_func
	},
	{
		title:"import image",
		func:(()=>{}) as a.t_func
	},	
	{
		title:"export project",
		func:(()=>{}) as a.t_func
	},	
	{
		title:"create new project",
		func:(()=>{}) as a.t_func
	},
]

const CSS_TEST_DIV = {
	height:"100px",
	width:"100px",
	borderColor:"black",
	borderStyle:"solid",
}

export const ARR_EDITOR_MODES:t_page_with_title[] = [	
	{
		body:<div style={{...CSS_TEST_DIV, ...{backgroundColor:"BlueViolet"}}}>Get Color from f(x, y) = z multiplied by Quaternion Field</div>,
		title:"Image to Pixel"
	},	{
		body:<div style={{...CSS_TEST_DIV, ...{backgroundColor:"Gray"}}}>Edit Canvas</div>,
		title:"Canvas Editor"
	},	{
		body:<div style={{...CSS_TEST_DIV, ...{backgroundColor:"Orange"}}}>Finite Element Method</div>,
		title:"Simulation"
	},
]
