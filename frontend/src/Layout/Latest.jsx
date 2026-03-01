import recomm from '../assets/recomm.png';
import productService from '../../service/productService';
import {
  productInitialState,
  productReducer,
} from '../../reducer/productReducer';
import { useEffect, useReducer } from 'react';

const Latest = () => {
  // ១. កែសម្រួលការហៅ useReducer ឱ្យត្រូវតាម Syntax
  const [state, dispatch] = useReducer(productReducer, productInitialState);

  useEffect(() => {
    const loadData = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const [recommendedRes, latestRes] = await Promise.all([
          productService.getRecommended(),
          productService.getLatestProduct(),
        ]);
        dispatch({
          type: 'FETCH_RECOMMENDED_SUCCESS',
          payload: recommendedRes.data,
        });
        dispatch({
          type: 'LATEST_PRODUCT_SUCCESS',
          payload: latestRes.data,
        });
        // console.log('latest', latestRes.data);
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };
    loadData();
  }, []);
  const { recommendedProduct, latestProduct, isLoading, error } = state;
  if (isLoading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10">error:{error}</div>;
  return (
    <div className="max-w-7xl mx-auto px-8 mb-8 p-4 flex flex-wrap sm:flex-nowrap gap-4">
      {/* Left: Recommended Product */}
      <div className="w-full sm:w-1/3 lg:w-1/4 bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-sm text-center font-bold text-blue-600 uppercase tracking-widest">
          Recommended
        </h1>

        {recommendedProduct ? (
          <>
            <div className="mx-auto w-full h-64 rounded-lg p-4 mt-4 overflow-hidden">
              <img
                src={recommendedProduct.image || recomm}
                alt={recommendedProduct.ProductName}
                className="w-full h-full object-contain border border-gray-100 rounded-lg transition-transform hover:scale-105 duration-300"
              />
            </div>
            <div className="mt-4">
              <p className="text-center font-bold text-gray-800">
                {recommendedProduct.ProductName}
              </p>
              <p className="text-center text-green-600 font-extrabold text-xl">
                ${recommendedProduct.price}
              </p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 active:scale-95 transition-all mt-4 font-semibold shadow-lg shadow-blue-200">
                Buy Now
              </button>
            </div>
          </>
        ) : (
          <p className="text-center mt-10 text-gray-400">
            No recommended product
          </p>
        )}
      </div>

      {/* Right: Latest Products Section */}
      <div className="w-full bg-white sm:w-2/3 lg:w-3/4 mx-auto rounded-lg shadow-md px-8 mb-4">
        <div className="w-full flex items-center justify-between border-b border-gray-50 py-4">
          <h1 className="text-black text-lg font-bold">Latest Products</h1>
          <button className="text-blue-500 text-sm hover:underline font-medium">
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-6">
          {/* បញ្ជាក់៖ ត្រង់នេះអ្នកអាចទាញទិន្នន័យពី state.products បន្ថែមទៀតបាន */}
          {latestProduct.map((item) => (
            <div
              key={item._id}
              className="bg-gray-50 p-4 rounded-xl border border-transparent hover:border-blue-100 transition-all group"
            >
              <img
                src={item.image}
                alt="LatestProduct"
                className="w-full h-32 object-contain rounded-md mb-2 group-hover:scale-110 transition-transform"
              />
              <p className="text-center font-medium text-gray-700">
                {item.description}
              </p>
              <p className="text-center text-green-600 font-bold">
                price: ${item.price}.00
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Latest;
