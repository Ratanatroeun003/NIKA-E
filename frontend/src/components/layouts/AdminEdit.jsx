import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdmin } from '../../context/adminContext';
import adminService from '../../service/adminService';
import userService from '../../service/userService';

const AdminEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useAdmin();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState('user');
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [logs, setLogs] = useState([]); // ✅ audit logs

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [userRes, adminRes, logsRes] = await Promise.all([
          userService.getUserById(id),
          userService.getProfile(),
          adminService.getAuditLogs(id), // ✅
        ]);
        setUser(userRes.data);
        setRole(userRes.data.role || 'user');
        setAdmin(adminRes.data);
        setLogs(logsRes.data || []);
      } catch (err) {
        setError('Failed to load data!');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    try {
      setSuccess(false);
      setError('');
      setIsLoading(true);
      const res = await adminService.updateUserRole(id, role);
      dispatch({ type: 'UPDATE_USER', payload: res.data });
      setSuccess(true);
      setTimeout(() => navigate('/admin/usersList'), 1000); // ✅ កែ path
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed!');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <div className="alert alert-error max-w-sm">
          <span>{error}</span>
        </div>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => navigate('/admin/usersList')}
        >
          ← Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => navigate('/admin/usersList')}
        >
          ← Back
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Edit Role</h1>
          <p className="text-slate-500 text-sm">Change user role</p>
        </div>
      </div>

      <div className="max-w-md mx-auto w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-6">
        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-primary ring-offset-2">
              <img
                src={
                  user?.avatar ||
                  'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                }
                alt={user?.fname}
              />
            </div>
          </div>
          <div>
            <p className="font-bold text-slate-700">
              {user?.fname} {user?.lname}
            </p>
            <p className="text-xs text-slate-400">{user?.email}</p>
            <span
              className={`badge badge-sm mt-1 ${user?.role === 'admin' ? 'badge-primary' : 'badge-ghost'}`}
            >
              Current: {user?.role}
            </span>
          </div>
        </div>

        {/* ✅ Changing As */}
        <div className="bg-blue-50 rounded-xl p-3">
          <p className="text-xs text-blue-600">
            ✏️ Changing as:
            <span className="font-bold ml-1">
              {admin?.fname} {admin?.lname}
            </span>
          </p>
        </div>

        <div className="divider"></div>

        {/* Role Select */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">New Role</span>
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="user">👤 User</option>
            <option value="admin">👑 Admin</option>
          </select>
        </div>

        {/* ✅ Audit Logs */}
        {logs.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold text-slate-500 uppercase">
              Change History
            </p>
            {logs.map((log) => (
              <div
                key={log._id}
                className="bg-slate-50 rounded-xl p-3 flex flex-col gap-1"
              >
                <p className="text-xs text-slate-500">
                  🔄{' '}
                  <span className="font-bold text-slate-700">
                    {log.changedBy?.fname} {log.changedBy?.lname}
                  </span>
                  <span className="ml-1">
                    changed role:{' '}
                    <span className="text-error">{log.before?.role}</span>
                    {' → '}
                    <span className="text-success">{log.after?.role}</span>
                  </span>
                </p>
                <p className="text-[10px] text-slate-400">
                  🕐 {new Date(log.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="alert alert-success">
            <span>Role updated successfully! ✅</span>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            className="btn btn-ghost"
            onClick={() => navigate('/admin/usersList')}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={isLoading || role === user?.role}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              'Save Role'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEdit;
