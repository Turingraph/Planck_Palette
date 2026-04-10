import { t_setss_arr, t_use_arr } from "../../atom/arr/act"
import * as a from "../../atom/type/alias"

export function init_use_state<t>(init:t)
{
	return {
		ss:init,
		setss:(()=>{}) as a.t_setss<t>
	}
}

export function init_use_arr<t extends {id:number}>(init:t[])
{
	return {
		ss:init,
		setss:(()=>{}) as t_setss_arr<t, keyof t>
	}
}
