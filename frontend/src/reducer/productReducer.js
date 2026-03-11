// ១. កំណត់តម្លៃដំបូង (Initial State)
export const productInitialState = {
  products: [],
  recommendedProduct: null,
  latestProduct: [],
  isLoading: false,
  error: null,
};

// ២. បង្កើត Reducer Function
export const productReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };

    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, products: action.payload };
    case 'FETCH_RECOMMENDED_SUCCESS':
      return { ...state, isLoading: false, recommendedProduct: action.payload };
    case 'LATEST_PRODUCT_SUCCESS':
      return { ...state, isLoading: false, latestProduct: action.payload };

    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };

    // case 'ADD_PRODUCT':
    //   return { ...state, products: [...state.products, action.payload] };

    // case 'DELETE_PRODUCT':
    //   return {
    //     ...state,
    //     products: state.products.filter(p => p._id !== action.payload)
    //   };

    default:
      return state;
  }
};
