export default function pictureSlice( state = null, action ){
    switch (action.type) { 
        case "charge_pictures":
            
            return state = action.value
        default:

            return state
    }
}