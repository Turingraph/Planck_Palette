// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// The Math.random() static method returns a floating-point, 
// pseudo-random number that's greater than or equal to 0 and less than 1, 
// with approximately "uniform distribution" over that range
// 0, 1, ..., max - 1
export function get_random_int(max:number)
{
	return Math.floor(Math.random() * max);
}

export function get_random_uniform(min:number, max:number)
{
	return get_random_int(max - min) + min
}

// But what is the Central Limit Theorem?
// https://youtu.be/zeJD6dqJ5lo?si=JV1VU9cvAL0Qo1cV

export function get_means(arr:number[])
{
	let y = 0
	let i = 0
	while (i < arr.length)
	{
		y += arr[i]
		i += 1
	}
	return (y / arr.length)
}

// you should square get_variance if you want to use std instead.
export function get_variance(arr:number[])
{
	const u = get_means(arr)
	let y = 0
	let i = 0
	while (i < arr.length)
	{
		y += (arr[i] - u) * (arr[i] - u)
		i += 1
	}
	return (y / arr.length)
}

// https://stackoverflow.com/questions/25582882/
// javascript-math-random-normal-distribution-gaussian-bell-curve
// Standard Normal variate using Box-Muller transform.
export function get_random_normal(mean=0, stdev=1) {
    const u = 1 - Math.random(); // Converting [0,1) to (0,1]
    const v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    // Transform to the desired mean and standard deviation:
    return z * stdev + mean;
}
