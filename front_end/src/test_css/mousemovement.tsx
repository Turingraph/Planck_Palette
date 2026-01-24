import { useRef, useState } from "react"
import "./main.css"

// https://youtu.be/cjIswDCKgu0?si=Dwmw63-HxAauQOpm

/*
https://www.geeksforgeeks.org/reactjs/how-to-debounce-or-throttle-input-changes-in-react/
*/

export default function MOUSEMOVEMENT_CSS(){
	const [SS_Mouse, setSS_Mouse] = useState<[number, number]>([0,0]);
	const lastThrottleTime = useRef(0);
	const Ref_DoItAgain = useRef<boolean>(true)
	return <div
		style={{
			width:"100vh",
			height:"100vh",
			backgroundColor:"#6644FF"
		}}
		onMouseMove={(e)=>{
			const now = Date.now();
			if (now - lastThrottleTime.current >= 250)
			{
				setSS_Mouse([e.clientX, e.clientY])
				lastThrottleTime.current = now
				Ref_DoItAgain.current = true
			}
			if (Ref_DoItAgain.current === true)
			{
				setSS_Mouse([e.clientX, e.clientY])
				Ref_DoItAgain.current = false
			}
		}}
	>
		<h1>{"Position: ["+SS_Mouse[0].toString()+", "+SS_Mouse[1].toString()+"]"}</h1>
	</div>
}
