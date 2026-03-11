export const userInitialState = {
  user: null,
  role: null,
  isAuthenticated: false,
  isLoading: false,
  error: { message: '', field: '', serverError: false },
  success: false,
};

export const initializer = () => {
  try {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedData = JSON.parse(savedUser);
      return {
        ...userInitialState,
        isAuthenticated: !!parsedData.token,
        role: parsedData.role || null,
        user: parsedData.user || null,
      };
    }
  } catch {
    localStorage.removeItem('user');
  }
  return userInitialState;
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'USER_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: { message: '', field: '', serverError: false },
        success: false,
      };

    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem(
        'user',
        JSON.stringify({
          token: action.payload.token,
          role: action.payload.role,
          user: action.payload.user,
        }),
      );
      return {
        ...state,
        isLoading: false,
        success: true,
        isAuthenticated: true,
        role: action.payload.role,
        user: action.payload.user,
      };

    // ✅ wrap {} ដើម្បីប្រើ const
    case 'UPDATE_SUCCESS': {
      try {
        const saved = JSON.parse(localStorage.getItem('user')) || {};
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...saved,
            user: action.payload, // ✅ update user
          }),
        );
      } catch {
        // បើ localStorage fail — មិន crash
        console.error('localStorage update failed');
      }
      return {
        ...state,
        isLoading: false,
        success: true,
        user: action.payload,
        isAuthenticated: true,
      };
    }

    case 'LOG_OUT':
      localStorage.removeItem('user');
      return userInitialState;

    case 'USER_FAIL':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: { message: '', field: '', serverError: false },
        success: false,
      };

    default:
      return state;
  }
};
