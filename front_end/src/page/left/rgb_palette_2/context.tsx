import { createContext } from "react";
import { t_use_arr } from "../../../atom/arr/act";
import { t_rgb_palettes } from "../../../atom/arr/type";
import * as a from "../../../atom/type/alias";
import { init_use_arr, init_use_state } from "../../../molecule/utils/format_object";

export const CX_SS_PALETTE = createContext<{
	new_rgb:a.t_use_state<string>,
	rgb_arr:t_use_arr<t_rgb_palettes, keyof t_rgb_palettes>}>({
	new_rgb:init_use_state("#000000"),
	rgb_arr:init_use_arr([] as t_rgb_palettes[])
})
