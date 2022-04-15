const localUserinfo = JSON.parse(window.localStorage.getItem('userinfos')) || null

export default function userSlice( state = localUserinfo, action ){
    switch (action.type) { 
        case "login_user":

            window.localStorage.setItem('userinfos', JSON.stringify(action.value) );

            return state = action.value

        case 'logout_user':

            window.localStorage.removeItem('userinfos');

            return state = null;

        default:
            return state
    }
}