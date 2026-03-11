export const adminInitialState = {
  users: [],
  products: [],
  isLoading: false,
  error: null,
  success: false,
};

export const adminReducer = (state, action) => {
  switch (action.type) {
    case 'ADMIN_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
        success: false,
      };

    // ===== USERS =====
    case 'GET_ALL_USERS':
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };

    case 'DELETE_USER':
      return {
        ...state,
        isLoading: false,
        success: true,
        users: state.users.filter(
          (user) => user._id !== action.payload, // ✅ លុបចេញពី list
        ),
      };

    case 'UPDATE_USER_ROLE':
      return {
        ...state,
        isLoading: false,
        success: true,
        users: state.users.map((user) =>
          user._id === action.payload._id
            ? action.payload // ✅ replace user ថ្មី
            : user,
        ),
      };

    // ===== PRODUCTS =====
    case 'GET_ALL_PRODUCTS':
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };

    // ===== ERROR =====
    case 'ADMIN_FAIL':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case 'CLEAR_ADMIN_ERROR':
      return {
        ...state,
        error: null,
        success: false,
      };

    default:
      return state;
  }
};
