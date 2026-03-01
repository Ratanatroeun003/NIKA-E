import { Link } from 'react-router-dom';
import { IoMenuOutline, IoChevronDownOutline } from 'react-icons/io5'; // ថែម Icon ព្រួញ
import { useState } from 'react';

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full">
      {/* 🔹 Desktop Menu */}
      <div className="hidden sm:flex max-w-7xl bg-primary text-primary-content items-center justify-center gap-2 px-4 py-2 mx-auto font-semibold mb-4 rounded-xl shadow-lg">
        <Link to="/" className="btn btn-sm btn-ghost hover:bg-primary-focus">
          Home
        </Link>
        {/* 🔻 Dropdown Category on Hover */}
        <div className="dropdown dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-sm btn-ghost gap-1"
          >
            Category <IoChevronDownOutline />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-100 menu p-2 shadow-2xl bg-base-100 rounded-box w-52 text-pink-700 border border-base-200"
          >
            <li>
              <Link to="/phone">Smart Phone</Link>
            </li>
            <li>
              <Link to="/tablet">Tablet</Link>
            </li>
            <li>
              <Link to="/laptop">Laptop</Link>
            </li>
            <li>
              <Link to="/watch">Smart Watch</Link>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-sm btn-ghost gap-1"
          >
            Brand <IoChevronDownOutline />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-100 menu p-2 shadow-2xl bg-base-100 rounded-box w-52 text-pink-700 border border-base-200"
          >
            <li>
              <Link to="/apple">Apple</Link>
            </li>
            <li>
              <Link to="/samsung">Samsung</Link>
            </li>
            <li>
              <Link to="/huawei">Huawei</Link>
            </li>
            <li>
              <Link to="/honor">Honor</Link>
            </li>
            <li>
              <Link to="/asus">Asus</Link>
            </li>
            <li>
              <Link to="/msi">MSI</Link>
            </li>
          </ul>
        </div>

        <Link to="/discounts" className="btn btn-sm btn-ghost">
          Discount <div className="badge badge-secondary badge-sm">NEW</div>
        </Link>
      </div>

      {/* 🔹 Mobile Menu Button */}
      <div
        onClick={toggleMenu}
        className="sm:hidden btn btn-primary btn-sm mb-4 ml-4 gap-2 normal-case"
      >
        <span>Menu</span>
        <IoMenuOutline className="text-xl" />
      </div>

      {/* 🔹 Mobile Sidebar (រក្សារទុកដូចមុន) */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40 sm:hidden"
            onClick={toggleMenu}
          ></div>
          <div className="absolute top-32 left-0 w-64 bg-base-100 shadow-2xl z-50 rounded-r-2xl border border-base-200 overflow-hidden">
            <ul className="menu menu-vertical p-4 w-full text-base-content">
              <li className="menu-title text-primary uppercase text-xs tracking-widest">
                Categories
              </li>
              <li>
                <Link to="/phone">Smart Phone</Link>
              </li>
              <li>
                <Link to="/tablet">Tablet</Link>
              </li>
              <li>
                <Link to="/laptop">Laptop</Link>
              </li>
              <li>
                <Link to="/watch">Smart Watch</Link>
              </li>
              <div className="divider my-1"></div>
              <li>
                <Link to="/accessories" className="text-secondary">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;
