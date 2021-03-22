import UserAPI from '../../API/api';

const SET_USER_DATA = 'SET-USER-DATA';

const initialState = {};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USER_DATA:
      return state;
    default:
      return state;  
  }
}

const setUserData = data => ({type: SET_USER_DATA, data})

export const authUser = () => {
  return dispatch => {
    UserAPI.auth()
    .then(data => {
      
    })
  }
}

export default authReducer;