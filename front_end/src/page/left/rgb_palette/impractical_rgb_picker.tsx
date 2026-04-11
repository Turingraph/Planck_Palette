import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as a from "../../../atom/type/alias";

import style from "./index.module.css"
// https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM
// @ts-expect-error
import cssText from "react-beautiful-color/dist/react-beautiful-color.css?inline";

// https://medium.com/@ozergklp/why-existing-react-color-pickers-frustrated-me-and-what-i-built-instead-da47a17ea2b0
import { ColorPicker } from "react-beautiful-color";
import { createRoot } from "react-dom/client";

export function RGB_PICKER({
    ref_rgb_picker,
    new_rgb
}:{
    ref_rgb_picker:{current:any}
    new_rgb:a.t_use_state<string>
})
{
    const Ref_InitShadow = useRef<boolean>(false)
    const Ref_Host = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (Ref_Host.current !== null && Ref_InitShadow.current === false)
        {
            const shadow = Ref_Host.current.shadowRoot || Ref_Host.current.attachShadow({ mode: "open" });

            const mountPoint = document.createElement("div");
            shadow.appendChild(mountPoint);

            const sheet = new CSSStyleSheet();
            sheet.replaceSync(cssText);
            shadow.adoptedStyleSheets = [sheet];

            const root = createRoot(mountPoint);
            // root.render(<h1>Hello World</h1>)
            root.render(<ColorPicker>
                <ColorPicker.Saturation className="flex-1 mb-3" />
                <div className="flex items-center gap-3 p-3 pt-0">
                  <ColorPicker.EyeDropper />
                  <div className="flex-1 flex flex-col gap-3">
                    <ColorPicker.Hue className="h-4" />
                    <ColorPicker.Alpha className="h-4" />
                  </div>
                </div>
              </ColorPicker> );
            Ref_InitShadow.current = true
        }
    }, []);
    return <div ref={Ref_Host} style={{ height: "150px" }} id="rgb_picker">
    </div>
}

/*
I had the issue that if I don't import "react-beautiful-color/dist/react-beautiful-color.css",
the UI library isn't usable at all, but if I import this css file, this css file effect my entire
code unexpectedly. ChatGPT recommended me to learn about Shadow DOM, so I read
https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM and
https://stackoverflow.com/questions/79736280/
importing-a-css-stylesheet-into-a-webcomponent-with-shadow-dom-in-firefox

but those solution and ChatGPT assisted solutions didn't work either, and ChatGPT
said that the author of this library intend to make this library compatible with
Tailwind globally, but I don't use Tailwind and I want to control my CSS, so I have to quit
adapting react-beautiful-color library for the sake of practical reason.
*/
