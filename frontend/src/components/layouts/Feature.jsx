import { useEffect, useReducer, useRef } from 'react';
import {
  productReducer,
  productInitialState,
} from '../../reducer/productReducer';
import productService from '../../service/productService';

const Feature = () => {
  const [state, dispatch] = useReducer(productReducer, productInitialState);
  // ប្រើ useEffect ដើម្បីទាញទិន្នន័យពេលបើក Page ដំបូង
  useEffect(() => {
    const loadData = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const data = await productService.getAll();
        dispatch({ type: 'FETCH_SUCCESS', payload: data.data });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: err.message });
      }
    };
    loadData();
  }, []);
  const scrollRef = useRef(null);

  // កំណត់ចម្ងាយ Scroll ឱ្យត្រូវនឹងទំហំ Item (w-48 = 192px + gap-4 = 16px => Total 208px)
  const scrollAmount = 208;

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  };
  console.log('Current products state:', state.products);
  if (state.isLoading)
    return <div className="text-center py-10">កំពុងផ្ទុកទិន្នន័យ...</div>;
  if (state.error)
    return (
      <div className="text-center py-10 text-red-500">បញ្ហា៖ {state.error}</div>
    );
  return (
    <div className="max-w-7xl mx-auto mb-8 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Feature Products</h1>
      <div className="w-full flex justify-between items-center mb-4 font-bold">
        <button
          onClick={scrollLeft}
          className="bg-green-600 text-white hover:cursor-pointer hover:scale-105 active:scale-95 px-6 py-2 rounded-full transition-all shadow-md"
        >
          Prev
        </button>
        <button
          onClick={scrollRight}
          className="bg-green-600 text-white hover:cursor-pointer hover:scale-105 active:scale-95 px-6 py-2 rounded-full transition-all shadow-md"
        >
          Next
        </button>
      </div>

      {/* product */}
      <div
        className="overflow-x-auto w-full mb-10 no-scrollbar scroll-smooth"
        ref={scrollRef}
      >
        <div className="flex flex-nowrap gap-4 pb-4">
          {state.products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl p-3 shadow-md w-48 shrink-0 border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt="product"
                  className="object-cover w-full h-40 hover:scale-110 transition-transform duration-500"
                />
              </div>
              <p className="text-gray-700 mt-3 text-center font-medium">
                {product.ProductName}
              </p>
              <p className="text-green-600 font-bold text-center">
                ${product.price}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Category */}
    </div>
  );
};

export default Feature;
