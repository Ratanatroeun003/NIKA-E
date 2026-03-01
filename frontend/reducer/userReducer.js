export const userInitialState = {
  user: null,
  isLoading: false,
  error: {
    message: '',
    field: '',
    serverError: false,
  },

  success: false,
};
export const userReducer = (state, action) => {
  switch (action.type) {
    case 'USER_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: { message: '', field: '' },
        serverError: false,
        success: false,
      };

    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: { message: '', field: '' },
        success: true,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: { message: '', field: '' },
        success: true,
        user: action.payload,
      };

    case 'USER_FAIL':
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload.message,
          field: action.payload.field,
          serverError: action.payload.serverError,
        },
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: { message: '', field: '' },
        serverError: false,
      };

    default:
      return state;
  }
};
