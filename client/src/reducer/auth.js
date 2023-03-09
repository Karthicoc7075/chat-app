

export default(state={auth:null},action)=>{
    switch(action.type){
        case "AUTH":
            localStorage.setItem("profile",action.data)
            return {...state.auth,auth:action.data}  
        default:
            return state
        }
}

