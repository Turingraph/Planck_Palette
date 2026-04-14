export function compare_every_pair_of_items<t>(arr1:t[], arr2:t[])
{
	if (arr1.length !== arr2.length)
	{
		return false
	}
	let i = 0
	while (i < arr1.length)
	{
		if (arr1[i] !== arr2[i])
		{
			return false
		}
	}
	return true
}

export function is_arr_has<t extends object, k extends keyof t>(arr:t[], target:t[k], key:k)
{
	const keys = new Set(arr.map(item => item[key]))
	if (keys.has(target) === true)
	{
		return true
	}
	return false
}

export function count_selected_items<t extends object, k extends keyof t>(arr:t[], target:t[k], key:k)
{
	let y = 0
	let i = 0
	while (i < arr.length)
	{
		if (arr[i][key] === target)
			y += 1
		i += 1;
	}
	return (y)
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
export function filter_array<t extends object, k extends keyof t>(arr:t[], target:t[k], key:k)
{
	return arr.filter((item) => item[key] !== target)
}

export function reset_key_value<t extends object, k extends keyof t>(arr:t[], target:t[k], key:k)
{
	let i = 0
	while (i < arr.length)
	{
		arr[i][key] = target
		i += 1;
	}
	return (arr)
}

export function get_value_arr<t extends object, k extends keyof t>(arr:t[], key:k)
{
	return (arr.map((item, index:number)=>{
		return item[key]
	}))
}
