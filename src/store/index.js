/* 
Imports
*/
    // React modules
    import { createStore } from "redux";

    // Store reducer
    import rootReducer from './reducers'
//

/* 
Definition and exports
*/
    export default createStore( rootReducer );
//