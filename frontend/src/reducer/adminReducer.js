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
        users: state.users.filter((user) => user._id !== action.payload),
      };

    case 'UPDATE_USER': // ✅ កែពី UPDATE_USER_ROLE
      return {
        ...state,
        isLoading: false,
        success: true,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user,
        ),
      };

    // ===== PRODUCTS ===== ✅
    case 'GET_ALL_PRODUCTS':
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };

    case 'DELETE_PRODUCT':
      return {
        ...state,
        isLoading: false,
        success: true,
        products: state.products.filter((p) => p._id !== action.payload),
      };

    case 'ADD_PRODUCT':
      return {
        ...state,
        isLoading: false,
        success: true,
        products: [action.payload, ...state.products], // ✅ បន្ថែមមុន
      };

    case 'UPDATE_PRODUCT':
      return {
        ...state,
        isLoading: false,
        success: true,
        products: state.products.map((p) =>
          p._id === action.payload._id ? action.payload : p,
        ),
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
