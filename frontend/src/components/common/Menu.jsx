import { Link } from 'react-router-dom';
import { IoMenuOutline } from 'react-icons/io5';
import { useState } from 'react';

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* desktop menu */}
      <div className="hidden sm:flex max-w-7xl bg-blue-600 items-center justify-start gap-6 text-sm px-4 py-3 mx-auto text-white font-semibold mb-4">
        <Link className="bg-white text-blue-700 p-2 border rounded">
          Category
        </Link>
        <Link>Home</Link>
        <Link>Brand</Link>
        <Link>Discount Product</Link>
        <Link>All Shop</Link>
      </div>
      {/* mobile menu */}
      <div
        onClick={toggleMenu}
        className="sm:hidden bg-blue-700 mb-4 flex items-center justify-center w-24 rounded text-white font-semibold py-2 ml-1 gap-1"
      >
        <span>menu</span>{' '}
        <span>
          <IoMenuOutline className="text-2xl" />
        </span>
      </div>
      {isMenuOpen && (
        <div className="absolute top-32 left-0 w-2/3 sm:hidden bg-white shadow-lg z-10 flex flex-col gap-4 p-4 text-sm">
          <Link>Smart Phone</Link>
          <Link>Tablet</Link>
          <Link>Laptop</Link>
          <Link>Smart Watch</Link>
          <Link>Accessories</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
