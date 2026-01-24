import CANVAS from "./canvas";

export default function MIDDLE()
{
	return <div 
	className="fill center_box" 
	style={{backgroundColor:"#00FF00"}}>
		<CANVAS
		canvas_height={32}
		canvas_width={32}
		/>
	</div>
}