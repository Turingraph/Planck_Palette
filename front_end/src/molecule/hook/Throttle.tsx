import { RefObject } from "react";
import * as a from "../../atom/type/alias";

export function RefThrottle<t>(
	Ref_Time:RefObject<number>, 
	Ref_Input:RefObject<t|undefined>, 
	delay:number,
	func:a.t_func_x<t>
)
{
	const now = Date.now();
	if (now - Ref_Time.current >= delay)
	{
		Ref_Time.current = now
		if (Ref_Input.current !== undefined)
			func(Ref_Input.current)
		Ref_Input.current = undefined
	}
}

export function Throttle<t>(
	Ref_Time:RefObject<number>, 
	input:t, 
	delay:number,
	func:a.t_func_x<t>
)
{
	const now = Date.now();
	if (now - Ref_Time.current >= delay)
	{
		Ref_Time.current = now
		func(input)
	}
}

