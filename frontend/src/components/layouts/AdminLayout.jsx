import { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom'; // 👈 ប្តូរពី Link មក NavLink
import { useUser } from '../../context/UserContext';
import userService from '../../service/userService';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { state, dispatch } = useUser();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userService.getProfile();
        dispatch({ type: 'SET_USER', payload: data.data });
      } catch (error) {
        if (error.status === 401) {
          dispatch({ type: 'LOG_OUT' });
          navigate('/profile');
        }
      }
    };
    fetchProfile();
  }, []);
  const handleLogout = () => {
    dispatch({ type: 'LOG_OUT' });
    navigate('/profile');
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  // 💡 បង្កើត Function សម្រាប់កំណត់ Style ពេល Active
  const activeClass = ({ isActive }) =>
    `block p-3 rounded-lg transition-all text-sm font-medium ${
      isActive
        ? 'bg-primary text-white shadow-lg' // 👈 ពណ៌ពេល Active (ឧទាហរណ៍៖ ពណ៌ខៀវ)
        : 'hover:bg-slate-800 text-gray-300' // 👈 ពណ៌ពេលធម្មតា
    }`;

  return (
    <div className="flex h-screen bg-base-200 overflow-hidden font-sans">
      {/* 🟢 SIDEBAR */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        <div className="p-6 text-xl font-bold border-b border-slate-800 text-primary uppercase flex justify-between items-center">
          Admin Panel
          <button className="md:hidden text-white" onClick={closeSidebar}>
            ✕
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {/* 💡 ប្រើ NavLink និង className ជា Function */}
          <NavLink
            to="/admin"
            end
            onClick={closeSidebar}
            className={activeClass}
          >
            📊 Dashboard
          </NavLink>

          <NavLink
            to="/admin/usersList"
            onClick={closeSidebar}
            className={activeClass}
          >
            👥 Manage Users
          </NavLink>

          <NavLink
            to="/admin/products"
            onClick={closeSidebar}
            className={activeClass}
          >
            📦 Products
          </NavLink>

          <div className="divider opacity-10"></div>

          <NavLink
            to="/"
            className="block p-3 text-gray-400 hover:text-white text-sm"
          >
            🏠 View Website
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="btn btn-error btn-outline btn-sm w-full font-bold uppercase"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ... ផ្នែក Main Content និង Header រក្សានៅដដែល ... */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="h-16 bg-base-100 shadow-sm flex items-center justify-between px-4 md:px-8">
          <button
            className="btn btn-ghost btn-sm md:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <h2 className="font-bold text-slate-600 uppercase">Control Center</h2>
          <div className="flex items-center justify-center flex-col">
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                <img src={state.user?.avatar || 'P'} />
              </div>
            </div>
            <p>{state.user?.fname || 'Admin Name'}</p>
          </div>{' '}
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
