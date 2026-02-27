export const userInitialState = {
  user: null,
  isLoading: false,
  error: null,
  success: false,
};
export const userReducer = (state, action) => {
  switch (action.type) {
    case 'USER_REQUEST':
      return { ...state, isLoading: true, error: null, success: false };
    case 'REGISTER_SUCCESS':
      return { ...state, isLoading: false, error: null, success: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
        success: true,
        user: action.payload,
      };
    case 'USER_FAIL':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: false,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
