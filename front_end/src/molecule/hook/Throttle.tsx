import * as a from "../../atom/type/alias";

export function f_throttle(
	Ref_Time:{current:number}, 
	delay:number,
	func:a.t_func
)
{
	const now = Date.now();
	if (now - Ref_Time.current >= delay)
	{
		Ref_Time.current = now
		func()
	}
}
