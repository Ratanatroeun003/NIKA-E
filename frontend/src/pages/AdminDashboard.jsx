import { useEffect } from 'react';
import { useAdmin } from '../context/adminContext';
import adminService from '../service/adminService';

const AdminDashboard = () => {
  const { state, dispatch } = useAdmin();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch({ type: 'ADMIN_REQUEST' });
        const res = await adminService.getAllUsers();
        console.log('res', res.data);

        dispatch({ type: 'GET_ALL_USERS', payload: res.data });
      } catch (error) {
        dispatch({ type: 'ADMIN_FAIL', payload: error.message });
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
            Admin Dashboard
          </h1>
          <p className="text-slate-500">
            Overview of your system performance and user activity.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm">Export CSV</button>
          <button className="btn btn-primary btn-sm">+ Add New Task</button>
        </div>
      </div>

      {/* 2. Key Performance Indicators (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={state.users?.length || 0}
          icon="user-group"
          color="text-blue-600"
          trend="+12%"
        />
        <StatCard
          title="Revenue"
          value="$45,200"
          icon="currency-dollar"
          color="text-green-600"
          trend="+8.5%"
        />
        <StatCard
          title="Active Sessions"
          value="124"
          icon="lightning"
          color="text-yellow-600"
          trend="-2%"
        />
        <StatCard
          title="System Alerts"
          value="0"
          icon="shield"
          color="text-red-600"
          trend="Safe"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. Recent Registrations (Table) */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-700 uppercase text-xs tracking-wider">
              Recent Registrations
            </h3>
            <button className="text-primary text-xs font-bold hover:underline">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-auto w-full">
              <thead className="bg-slate-50">
                <tr className="text-slate-500 text-[11px] uppercase">
                  <th className="px-6 py-4">User Details</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined Date</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {state.isLoading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      <span className="loading loading-spinner"></span>
                    </td>
                  </tr>
                ) : (
                  state.users
                    ?.slice(0, 5)
                    .map((user) => (
                      <UserRow
                        key={user._id}
                        name={`${user.fname} ${user.lname}`}
                        email={user.email}
                        role={user.role}
                        status="Active"
                        date={new Date(user.createdAt).toLocaleDateString()}
                      />
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. System Health / Quick Info */}
        <div className="flex flex-col gap-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold mb-4">Server Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">CPU Usage</span>
                <span className="text-xs font-mono">24%</span>
              </div>
              <progress
                className="progress progress-primary w-full"
                value="24"
                max="100"
              ></progress>

              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-slate-400">Memory</span>
                <span className="text-xs font-mono">4.2GB / 8GB</span>
              </div>
              <progress
                className="progress progress-secondary w-full"
                value="52"
                max="100"
              ></progress>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Reusable Components ---

const StatCard = ({ title, value, color, trend }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-2">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
        {title}
      </p>
      <span
        className={`text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 ${color}`}
      >
        {trend}
      </span>
    </div>
    <p className="text-3xl font-black text-slate-800">{value}</p>
  </div>
);

const UserRow = ({ name, email, role, status, date }) => (
  <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
    <td className="px-6 py-4">
      <div className="font-bold text-slate-700">{name}</div>
      <div className="text-[10px] text-slate-400">{email}</div>
    </td>
    <td>
      <span className="badge badge-ghost badge-sm font-medium">{role}</span>
    </td>
    <td>
      <div
        className={`badge badge-xs ${status === 'Active' ? 'badge-success' : 'badge-warning'} p-2`}
      >
        {status}
      </div>
    </td>
    <td className="text-slate-500 text-xs italic">{date}</td>
  </tr>
);

export default AdminDashboard;
