import { useEffect, useRef, useState } from "react"
import * as fc from "fabric"

export default function MOUSE()
{
	const [SS_Position, setSS_Position] = useState<[number,number]>([0,0])
	const Ref_Time = useRef<number>(0)
	const Ref_Canvas = useRef<null|any>(null)
	useEffect(()=>{
		console.log(SS_Position)
		const init_canvas = new fc.Canvas(Ref_Canvas.current,
		{
			width:  500,
			height: 500,
			cssOnly: true
		})
		init_canvas.backgroundColor = "#f66"
		init_canvas.on({
		"mouse:out":()=>{
			setSS_Position([0,0])
		},
		"mouse:move":(e:any)=>{
			const New_Time = Date.now()
			if (New_Time - Ref_Time.current > 100){
				setSS_Position([
					(e.e.clientX - Ref_Canvas.current.getBoundingClientRect().left)/10, 
					(e.e.clientY - Ref_Canvas.current.getBoundingClientRect().top)/10
				])
				Ref_Time.current = New_Time
			}
		}})
		init_canvas.renderAll()
		return ()=>{init_canvas.dispose()}
	})
	// return <div>
	// 	<h1>Position: {SS_Position[0]}, {SS_Position[1]}</h1>
	// 	<div style={{
	// 		width:"600px",
	// 		height:"600px",
	// 		backgroundColor:"#96B",
	// 	}}
	// 	onMouseMove={(e)=>{
			// const New_Time = Date.now()
			// if (New_Time - Ref_Time.current > 100){
			// 	setSS_Position([e.clientX, e.clientY])
			// 	Ref_Time.current = New_Time
			// }
	// 	}}
	// 	></div>
	// </div>
	return <div>
		<h1>Position: {SS_Position[0]}, {SS_Position[1]}</h1>
		<div className="fill center_box">
		<canvas id="fabrik_canvas" ref={Ref_Canvas}></canvas>
	</div>
	</div>
}

	// const Ref_DoItAgain = useRef<boolean>(true)
	// ...
	// if (Ref_DoItAgain.current === true)
			// {
			// 	setSS_Position([e.clientX, e.clientY])
			// 	Ref_DoItAgain.current = false
			// }