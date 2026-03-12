import { t_setss_arr, t_use_arr } from "../../atom/arr/act"
import * as a from "../../atom/type/alias"

export function insert_use_state<t>(ss:t, setss:a.t_setss<t>)
{
	return {ss:ss, setss:setss} as a.t_use_state<t>
}

export function insert_use_arr<
	t extends {id:number},
	k extends keyof t>(ss:t[], setss:t_setss_arr<t,k>)
{
	return {ss:ss, setss:setss} as t_use_arr<t,k>
}

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
