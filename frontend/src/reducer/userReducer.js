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
        // ❌ លុប user — ហៅ getProfile API វិញ
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
      // ✅ token + role តែប៉ុណ្ណោះ
      localStorage.setItem(
        'user',
        JSON.stringify({
          token: action.payload.token,
          role: action.payload.role,
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

    // ✅ READ — fetch profile (មិន update localStorage)
    case 'SET_USER':
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };

    // ✅ WRITE — បន្ទាប់ពី edit (មិន update localStorage ព្រោះ token មិនផ្លាស់ប្តូរ)
    case 'UPDATE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        success: true,
        user: action.payload,
        isAuthenticated: true,
      };

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
