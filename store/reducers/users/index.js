/* initial state */
export var usersStartState = {
  accountNotVerified: null,
  isLoggedIn: false,
  error: true,
  userAvatar: require('../../../public/static/uploads/profile-avatars/placeholder.jpg')
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
      return Object.assign({}, state, { error: false, userAvatar: action.data });

    case actionTypes.ERROR_LOADING:
      return { ...state, error: false };

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
  return { type: actionTypes.IS_LOGGED_OUT };
};

export const loadAvatar = data => {
  return { type: actionTypes.LOAD_USER_AVATAR, data };
};

export const errorLoading = () => {
  console.log('in error ');
  return { type: actionTypes.ERROR_LOADING };
};
