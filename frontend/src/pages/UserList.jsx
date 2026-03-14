import { useEffect, useState } from 'react';
import { useAdmin } from '../context/adminContext';
import adminService from '../service/adminService';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const { state, dispatch } = useAdmin();
  const [search, setSearch] = useState('');
  const nav = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch({ type: 'ADMIN_REQUEST' });
        const res = await adminService.getAllUsers();
        dispatch({ type: 'GET_ALL_USERS', payload: res.data });
      } catch (error) {
        dispatch({ type: 'ADMIN_FAIL', payload: error.message });
      }
    };
    fetchUsers();
  }, []);
  const handleDelete = async (id) => {
    if (window.confirm('តើអ្នកប្រាកដថាចង់លុប User នេះមែនទេ?')) {
      try {
        await adminService.deleteUser(id);
        dispatch({ type: 'DELETE_USER', payload: id }); // ✅
        setSuccessMsg('លុបបានជោគជ័យ!');
        setTimeout(() => setSuccessMsg(''), 3000);
      } catch (error) {
        dispatch({ type: 'ADMIN_FAIL', payload: error.message });
      }
    }
  };
  //   ✅ Filter by search
  const filteredUsers = state.users?.filter((user) =>
    `${user.fname} ${user.lname} ${user.email}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">
            Manage Users
          </h1>
          <p className="text-slate-500 text-sm">
            Total:{' '}
            <span className="font-bold text-primary">
              {state.users?.length || 0}
            </span>{' '}
            users
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-3 justify-between">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="input input-bordered w-full max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setSearch('')}
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* Error */}
      {state.error && (
        <div className="alert alert-error">
          <span>{state.error}</span>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-slate-50">
              <tr className="text-slate-500 text-[11px] uppercase">
                <th className="px-6 py-4">#</th>
                <th>User</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Loading */}
              {state.isLoading ? (
                <tr>
                  <td colSpan="7" className="text-center py-10">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                  </td>
                </tr>
              ) : /* Empty */
              filteredUsers?.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-slate-400">
                    No users found
                  </td>
                </tr>
              ) : (
                /* Data */
                filteredUsers?.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                  >
                    {/* # */}
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {index + 1}
                    </td>

                    {/* User */}
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-9 rounded-full ring ring-primary ring-offset-1">
                            <img
                              src={
                                user.avatar ||
                                'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                              }
                              alt={user.fname}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-slate-700 text-sm">
                            {user.fname} {user.lname}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="text-sm text-slate-600">
                      {user.phone || 'N/A'}
                    </td>

                    {/* Gender */}
                    <td className="text-sm text-slate-600">
                      {user.gender || 'N/A'}
                    </td>

                    {/* Role */}
                    <td>
                      <span
                        className={`badge badge-sm font-medium ${
                          user.role === 'admin'
                            ? 'badge-primary'
                            : 'badge-ghost'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="text-xs text-slate-400 italic">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {/* Action */}
                    <td>
                      <div className="flex gap-2">
                        <button
                          className="btn btn-xs btn-error btn-outline"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-xs btn-success btn-outline"
                          onClick={() => nav(`/admin/editUser/${user._id}`)}
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
