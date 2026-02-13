import { useEffect, useState } from "react";

export default function MY_TIME()
{
	const [SS_Time, setSS_Time] = useState<number>(Date.now())
	useEffect(()=>{
		const id = setInterval(()=>{
			setSS_Time(Date.now())
		}, 1000)
		return ()=>{clearInterval(id)}
	}, [SS_Time])
	return <div style={{
			width:"600px",
			height:"600px",
			backgroundColor:"#96B",
		}}>
		<h1>Position: {SS_Time % 10000000}</h1>
	</div>
}

/*
export default function CANVAS_BASIC({
	grid,
	all_grids,
	canvas,
}:{
	grid:t_dim
	all_grids:t_dim
	canvas:t_dim
})
{
	const Ref_Canvas = useRef<null|any>(null)
	const Ref_MouseIn = useRef<undefined|number>(undefined)
	const [SS_MouseIn, setSS_MouseIn] = useState<number|undefined>(undefined)
	const Ref_Time = useRef<number>(0)
	const SS_PixelSize = useContext(CONTEXT_USE_STATE_GLOBAL).pixel_size.ss
	useEffect(()=>{
		setSS_MouseIn(Ref_MouseIn.current)
		// console.log("Ref_Canvas.current", Ref_Canvas.current)
		const interval_id = setInterval(()=>{
			const init_canvas = new fc.Canvas(Ref_Canvas.current,
			{
				width:  canvas.h,
				height: canvas.w,
				cssOnly: true
			})
			init_canvas.backgroundColor = "#f66"
			const hover_grids = SS_MouseIn ? get_point_grids(all_grids, {
				grid:SS_MouseIn, size:SS_PixelSize,}) : []
			const width = all_grids.w
			const height = all_grids.h
			const border = {
				h:Math.floor((canvas.h - grid.h * all_grids.h)/2),
				w:Math.floor((canvas.w - grid.w * all_grids.w)/2)
			} as t_dim
			let group = [] as fc.Polyline[]
			let i = 0
			while (i < width*height)
			{
				let color = default_grid_color(undefined, i, width)
				if (hover_grids.includes(i))
				{
					let hover_color = scale_vector(hex_to_rgb("#ffffff"), 0.2)
					color = rgb_to_hex(vector_addition(hex_to_rgb(color), hover_color))
				}
				const left = i % width
				const up = Math.floor(i / width)
				let square = new fc.Polyline([
					{ x: grid.w * (left + 0) + border.w, y: grid.h * (up + 0) + border.h},
					{ x: grid.w * (left + 1) + border.w, y: grid.h * (up + 0) + border.h},
					{ x: grid.w * (left + 1) + border.w, y: grid.h * (up + 1) + border.h},
					{ x: grid.w * (left + 0) + border.w, y: grid.h * (up + 1) + border.h},
				],{
					fill:color,
					strokeWidth:0,
				})
				const j = i
				square.on({
					"mouseover":()=>{
						f_throttle(
							Ref_Time,
							20,
							(()=>{
								console.log("j",j)
								Ref_MouseIn.current = j
							}) as a.t_func)
					}
				})
				group.push(square)
				i += 1
			}
			init_canvas.add(new fc.Group(group, {subTargetCheck: true}))
			init_canvas.on({
				"mouse:out":()=>{
					f_throttle(
						Ref_Time,
						20,
						(()=>{
							Ref_MouseIn.current = undefined
						}) as a.t_func)
				}
			})
			init_canvas.requestRenderAll()
			return init_canvas.dispose()
		}, 100)
		return ()=>{
			clearInterval(interval_id)
			if (Ref_Canvas.current)
				Ref_Canvas.current = null
		}
	}, [all_grids, canvas, grid, SS_MouseIn, SS_PixelSize])
	return <div className="fill center_box">
		<canvas id="fabrik_canvas" ref={Ref_Canvas}></canvas>
	</div>
}
*/