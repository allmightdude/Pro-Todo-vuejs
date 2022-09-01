import mutations from './mutation.js';
import actions from './actions.js';
 
const user = JSON.parse(localStorage.getItem('user'));

const initialState = user 
    ? {status : { loggedIn : true} , user}
    : {status : {loggedIn : false} , user : null};


export default {
    state: initialState,
    mutations,
    actions
}