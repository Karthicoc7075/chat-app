import * as api from '../api/index'

export const singUp =(formdata)=async (dispatch)=>{
         const {data} = await api.signUp(formdata);
         
         dispatch({Type:'AUTH',data})
}