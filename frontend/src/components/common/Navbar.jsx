import TT from '../../assets/TT-E.png';
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <div className="max-w-7xl flex items-center justify-center px-4 md:px-16 py-2 mx-auto gap-6 mb-4">
      {/* logo */}
      <div className="mr-4">
        <img
          src={TT}
          alt="logo"
          className="w-24 cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>
      {/* search desktop*/}
      <div className="justify-center flex-1 hidden sm:flex">
        <div className="join w-full">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="search..."
              className="input input-bordered join-item w-full pl-10 focus:outline-none"
            />
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          </div>
          <button className="btn btn-neutral join-item border-none px-6">
            Search
          </button>
        </div>
      </div>
      {/* mobile search icon */}
      <div className="sm:hidden">
        <IoSearchOutline
          className="text-2xl text-gray-600 cursor-pointer"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        />
      </div>
      {/* toggle search on mobile */}
      <div
        className={`sm:hidden z-50 absolute top-0 left-0 w-full bg-white p-4 transition-transform duration-300 ease-in-out ${
          isSearchOpen
            ? 'transform translate-y-0'
            : 'transform -translate-y-full'
        }`}
      >
        <div className="join w-full">
          <input
            type="text"
            placeholder="តើអ្នកចង់រកអ្វី..."
            className="input input-bordered join-item w-full focus:outline-none h-10"
          />
          <button className="btn btn-neutral btn-sm join-item h-10">
            <IoCloseOutline
              className="text-xl"
              onClick={() => setIsSearchOpen(false)}
            />
          </button>
        </div>
      </div>
      {/* right side */}
      <div className="flex items-center space-x-3 md:space-x-6">
        <Link to="/profile" className="hover:text-neutral transition-colors">
          <FaUserCircle className="text-2xl md:text-3xl" />
        </Link>
        <Link
          to="/cart"
          className="relative hover:text-neutral transition-colors"
        >
          <FaCartShopping className="text-2xl md:text-2xl" />
          {/* អាចថែម Badge ចំនួនទំនិញនៅទីនេះ */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full px-1.5 py-0.5">
            0
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
