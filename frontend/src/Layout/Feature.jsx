import { useRef } from 'react';

const Feature = () => {
  const scrollRef = useRef(null);
  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 250,
      behavior: 'smooth',
    });
  };
  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -250,
      behavior: 'smooth',
    });
  };
  return (
    <div className="max-w-7xl mx-auto mb-8">
      <h1 className="text-3xl font-bold text-center mb-4">Feature Products</h1>
      <div className="w-full flex mx-auto px-4 justify-between items-center mb-4">
        <button
          onClick={scrollLeft}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
        >
          Prev
        </button>
        <button
          onClick={scrollRight}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
        >
          Next
        </button>
      </div>
      <div className="overflow-x-auto mb-8" ref={scrollRef}>
        <div className="grid grid-flow-col auto-cols-[250px] gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md p-4">
              <img
                src="https://picsum.photos/200/200"
                alt=""
                className="object-cover p-2 w-full rounded-md hover:scale-105 transition-transform duration-300"
              />
              <p className="text-gray-600 mt-2 text-center">
                Description of Product {item}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4 mx-auto w-full p-4 bg-gray-100">
        <div className="mb-4 font-semibold flex items-center gap-2 justify-between">
          <h1>Category</h1>
          <button className="text-sm text-blue-500 hover:underline cursor-pointer">
            View All...
          </button>
        </div>
        <div className="grid grid-flow-col auto-cols-[150px] md:auto-cols-[200px] gap-4 overflow-x-hidden">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className=" rounded-md p-4">
              <img
                src="https://picsum.photos/100/100/?random=1"
                alt="cate"
                className="rounded-full mb-4 w-full object-cover hover:scale-90 transition-transform duration-300"
              />
              <p className="text-center">Category {item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feature;
