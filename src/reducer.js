export const reducer = (state,action)=>{
    switch(action.type){
        case "changeTheme":
            return{
                ...state,
                theme:action.val
            }
            default:
                return state
    }
}