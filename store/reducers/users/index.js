/* initial state */
import axios from 'axios';

export var usersStartState = {
  accountNotVerified: null,
  isLoggedIn: false,
  error: true,
  userAvatar: 'uploads/avatar/placeholder.jpg'
};

/* action types */
export const actionTypes = {
  RESET_USER_ACCOUNT_IS_VERIFIED: 'RESET_USER_ACCOUNT_IS_VERIFIED',
  USER_ACCOUNT_IS_VERIFIED: 'USER_ACCOUNT_IS_VERIFIED',
  USER_ACCOUNT_NOT_VERIFIED: 'USER_ACCOUNT_NOT_VERIFIED',
  IS_LOGGED_IN: 'IS_LOGGED_IN',
  IS_LOGGED_OUT: 'IS_LOGGED_OUT',
  LOAD_USER_AVATAR: 'LOAD_USER_AVATAR',
  ERROR_LOADING: 'ERROR_LOADING' // LOAD_MULTER_IMAGE: "LOAD_MULTER_IMAGE"
};

/* reducer(s) */
export default function users(state = usersStartState, action) {
  // console.log('In users reducer! ', action);
  switch (action.type) {
    case actionTypes.RESET_USER_ACCOUNT_IS_VERIFIED:
      return Object.assign({}, state, { accountNotVerified: null });

    case actionTypes.USER_ACCOUNT_IS_VERIFIED:
      return Object.assign({}, state, { accountNotVerified: false });

    case actionTypes.USER_ACCOUNT_NOT_VERIFIED:
      return Object.assign({}, state, { accountNotVerified: true });

    case actionTypes.IS_LOGGED_IN:
      return Object.assign({}, state, { isLoggedIn: true });

    case actionTypes.IS_LOGGED_OUT:
      return Object.assign({}, state, { isLoggedIn: false });

    case actionTypes.LOAD_USER_AVATAR:
      return { ...state, userAvatar: action.data };

    case actionTypes.ERROR_LOADING:
      return Object.assign({}, state, { error: true });

    default:
      return state;
  }
}

/* actions */
export const resetUserAcoountVerified = () => {
  return { type: actionTypes.RESET_USER_ACCOUNT_IS_VERIFIED };
};

export const userHasBeenVerified = () => {
  return { type: actionTypes.USER_ACCOUNT_IS_VERIFIED };
};

export const userHasNotBeenVerified = () => {
  return { type: actionTypes.USER_ACCOUNT_NOT_VERIFIED };
};

export const logInUser = () => {
  return { type: actionTypes.IS_LOGGED_IN };
};

export const logOutUser = () => {
  axios
    .get('/users/logout')
    .then(response => {
      if (response.status === 200) {
        console.log('You have been logged out!');
      }
    })
    .catch(function(error) {
      if (error.response.status === 500) {
        console.log('An error has occured');
      }
    });
  return { type: actionTypes.IS_LOGGED_OUT };
};

export const loadAvatar = data => {
  console.log('in load avatar ', data);

  return { type: actionTypes.LOAD_USER_AVATAR, data: data };
};

export const errorLoading = () => {
  return { type: actionTypes.ERROR_LOADING };
};
