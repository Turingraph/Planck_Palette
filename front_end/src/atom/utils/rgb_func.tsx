export function limit_size(input:number|undefined, maxval:number, min = 0){
    if (input === undefined || input <= min){
        return min
    }
    else if (input >= maxval){
        return maxval
    }
    else{
        return input 
    }
}

export function limit_255(input:number){
    return Math.floor(limit_size(input,255))
}

export function fill_2(text:string)
{
	if (text.length === 1)
		return ('0' + text)
	return (text)
}

export function rgb_to_hex(input:undefined|number|number[]){
	if (input === undefined){
		return "#FFFFFF"
	}
	else if (typeof input === "number"){
		return "#"+limit_255(input).toString(16) + limit_255(input).toString(16) + limit_255(input).toString(16);
	}
	else if (Array.isArray(input) === true){
		if (input.length === 0){
			return "#FFFFFF"
		}
		else if (input.length === 1){
			return "#"+fill_2(limit_255(input[0]).toString(16)) + fill_2(limit_255(input[0]).toString(16)) + fill_2(limit_255(input[0]).toString(16));
		}
		else if (input.length === 2){
			return "#"+fill_2(limit_255(input[0]).toString(16))+fill_2(limit_255(input[1]).toString(16));
		}
		else{
			return "#"+fill_2(limit_255(input[0]).toString(16))+fill_2(limit_255(input[1]).toString(16)) + fill_2(limit_255(input[2]).toString(16));
		}
	}
	else{
		return "#FFFFFF";
	}
}

const HEX_CHAR_DICT = [
	{
		char:"0",
		value:0
	},	{
		char:"1",
		value:1
	},	{
		char:"2",
		value:2
	},	{
		char:"3",
		value:3
	},	{
		char:"4",
		value:4
	},	{
		char:"5",
		value:5
	},	{
		char:"6",
		value:6
	},	{
		char:"7",
		value:7
	},	{
		char:"8",
		value:8
	},	{
		char:"9",
		value:9
	},	{
		char:"A",
		value:10
	},	{
		char:"B",
		value:11
	},	{
		char:"C",
		value:12
	},	{
		char:"D",
		value:13
	},	{
		char:"E",
		value:14
	},	{
		char:"F",
		value:15
	},
]

function translate_hex_char(char:string|number)
{
	if (typeof char === "string")
	{
		let output = HEX_CHAR_DICT.filter((item)=> item.char === char)
		if (output.length === 0)
		{
			return 0
		}
		return output[0].value
	}
	if (char > 15)
		return "F"
	let output = HEX_CHAR_DICT.filter((item)=> item.value === char)
	if (output.length === 0)
	{
		return 0
	}
	return output[0].char
}

export function hex_to_rgb(input:undefined|string)
{
	if (input === undefined){
		return [0, 0, 0] as [number, number, number]
	}
	let up_input = input.toUpperCase();
	if (input.length === 9)
	{
		return [
		Number(translate_hex_char(up_input[1])) * 16 + Number(translate_hex_char(up_input[2])),
		Number(translate_hex_char(up_input[3])) * 16 + Number(translate_hex_char(up_input[4])),
		Number(translate_hex_char(up_input[5])) * 16 + Number(translate_hex_char(up_input[6])),
		Number(translate_hex_char(up_input[7])) * 16 + Number(translate_hex_char(up_input[8])),
	] as [number, number, number, number]
	}
	return [
		Number(translate_hex_char(up_input[1])) * 16 + Number(translate_hex_char(up_input[2])),
		Number(translate_hex_char(up_input[3])) * 16 + Number(translate_hex_char(up_input[4])),
		Number(translate_hex_char(up_input[5])) * 16 + Number(translate_hex_char(up_input[6])),
	] as [number, number, number]
}

// https://stackoverflow.com/questions/39118528/rgb-to-hsl-conversion
export function rgb_to_hue(rgb:[number,number,number])
{
	let r = rgb[0]/255
	let g = rgb[1]/255
	let b = rgb[2]/255
	let max = Math.max(r, g, b);
	let min = Math.min(r, g, b);
	let c = max - min
	let hue = 0
	if (c === 0)
		return (hue)
	if (max === r)
	{
		const seg = (g - b) / c
		let shift = 0
		if (seg < 0)
			shift = 6
		hue = seg + shift
	}
	if (max === g)
	{
		const seg = (b - r) / c
		let shift = 2
		hue = seg + shift
	}
	if (max === b)
	{
		const seg = (r - g) / c
		let shift = 4
		hue = seg + shift
	}
	return (hue * 60)
}
