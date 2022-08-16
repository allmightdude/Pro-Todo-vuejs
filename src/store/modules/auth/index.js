
// module store options
import authMutations from './mutation.js';
import authActions from './actions.js';
 
const user = JSON.parse(localStorage.getItem('user'));

const initialState = user 
    ? {status : { loggedIn : true} , user}
    : {status : {loggedIn : false} , user : null};


export const auth = {
    namespaced : true,
    state: initialState,

    mutations : authMutations,
    actions : authActions,
}