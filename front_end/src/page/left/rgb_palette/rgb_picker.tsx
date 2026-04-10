import { useEffect, useRef } from "react";
import * as a from "../../../atom/type/alias";

import style from "./index.module.css"
// https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM
// import 'react-beautiful-color/dist/react-beautiful-color.css';

// https://medium.com/@ozergklp/why-existing-react-color-pickers-frustrated-me-and-what-i-built-instead-da47a17ea2b0
import { ColorPicker } from "react-beautiful-color";

export function RGB_PICKER({
	ref_rgb_picker,
	new_rgb
}:{
	ref_rgb_picker:{current:any}
	new_rgb:a.t_use_state<string>
})
{
	const Ref_Time = useRef<number>(0)
	const host = document.querySelector("#rgb_picker");
	const shadow = host?.attachShadow({ mode: "open" });
	const span = document.createElement("span");
	span.textContent = "I'm in the shadow DOM";
	shadow?.appendChild(span);
	return <div style={{ height: "150px" }} id="rgb_picker">
    {/* <ColorPicker>
      <ColorPicker.Saturation className="flex-1 mb-3" />
      <div className="flex items-center gap-3 p-3 pt-0">
        <ColorPicker.EyeDropper />
        <div className="flex-1 flex flex-col gap-3">
          <ColorPicker.Hue className="h-4" />
          <ColorPicker.Alpha className="h-4" />
        </div>
      </div>
    </ColorPicker> */}
	</div>
}

/*

	  <ColorPicker>
	    <ColorPicker.Saturation className={`${style.satuation}`} />
	    <div className={`${style.controller}`}>
	      <ColorPicker.EyeDropper />
	      <div className={`${style.slice}`}>
	        <ColorPicker.Hue className={`${style.height4}`} />
	        <ColorPicker.Alpha className={`${style.height4}`} />
	      </div>
	    </div>
	  </ColorPicker>
*/
