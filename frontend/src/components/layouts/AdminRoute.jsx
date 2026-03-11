// components/common/AdminRoute.jsx
import { useUser } from '../../context/UserContext';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { state } = useUser();

  // ✅ មិនទាន់ load → រង់ចាំ
  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // ✅ មិន login → ទៅ profile
  if (!state.isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  // ✅ login ហើយ តែមិនមែន admin → ទៅ home
  if (state.role !== 'admin') {
    return <Navigate to="/" />;
  }

  // ✅ admin → អនុញ្ញាត
  return children;
};

export default AdminRoute;
