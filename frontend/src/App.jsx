import { Route, Routes, BrowserRouter } from 'react-router-dom';
import UserLayout from './components/layouts/UserLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import EditProfile from './components/layouts/EditProfile';
import AdminDashboard from './pages/AdminDashboard';
import AdminLayout from './components/layouts/AdminLayout';
import AdminRoute from './components/layouts/AdminRoute';
import UserList from './pages/UserList';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* userLayout */}
        <Route path="" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="update" element={<EditProfile />} />
        </Route>
        {/* admin layout */}

        <Route
          path="admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="usersList" element={<UserList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
