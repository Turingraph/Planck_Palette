import b_x from "../../asset/items/x.png";
import * as a from "../../atom/type/alias";
import B_LOGO from "../../molecule/button/b_logo";

export function B_RGB_PALETTE({
	rgb,
	f_delete = undefined,
}:{
	rgb:string
	f_delete?:undefined|a.t_func,
})
{
	let jsx_x = <></>
	if (f_delete !== undefined)
		jsx_x = <B_LOGO logo={b_x as a.t_logo} func={f_delete} size={20}/>
	return <div 
	style={{width:"45px", height:"45px", backgroundColor:rgb}}>
		{jsx_x}
	</div>
}