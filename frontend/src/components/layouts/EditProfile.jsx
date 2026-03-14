import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import userService from '../../service/userService';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const nav = useNavigate();
  const { state, dispatch } = useUser();
  const user = state.user;

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    address: '',
    phone: '',
    gender: '',
    password: '',
  });
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState('');

  // ✅ ហៅ API រាល់ mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (state.isAuthenticated) {
          const data = await userService.getProfile();
          dispatch({ type: 'SET_USER', payload: data.data });
        }
      } catch (error) {
        if (error.response?.status === 401) {
          dispatch({ type: 'LOG_OUT' });
          nav('/profile');
        }
      }
    };
    fetchProfile();
  }, []);

  // ✅ fill form នៅពេល user មាន
  useEffect(() => {
    if (user) {
      setFormData({
        fname: user.fname || '',
        lname: user.lname || '',
        email: user.email || '',
        address: user.address || '',
        phone: user.phone || '',
        gender: user.gender || '',
        password: '',
      });
      setPreview(user.avatar || '');
    }
  }, [user]); // ✅ run នៅពេល user ផ្លាស់ប្តូរ

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      dispatch({ type: 'USER_REQUEST' });
      setSuccess(false);
      setError('');

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) data.append(key, formData[key]);
      });
      if (avatar) data.append('avatar', avatar);

      const response = await userService.updateProfile(data);
      dispatch({ type: 'UPDATE_SUCCESS', payload: response.data }); // ✅

      setSuccess(true);
      setTimeout(() => nav('/profile'), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed!'); // ✅ axios error
      dispatch({
        type: 'USER_FAIL',
        payload: { message: err.response?.data?.message },
      });
    }
  };

  // ✅ loading នៅពេល user មិនទាន់ load
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-10">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold justify-center mb-4">
            Edit Profile
          </h2>

          {/* Avatar */}
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-2">
                <img
                  src={
                    preview ||
                    'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                  }
                  alt="avatar"
                />
              </div>
            </div>
            <label className="btn btn-primary btn-sm">
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="First Name"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Email"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Phone"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Address"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">New Password</span>
                <span className="label-text-alt text-gray-400">optional</span>
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Leave blank to keep current password"
              />
            </div>

            {error && (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="alert alert-success">
                <span>Updated successfully! ✅</span>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-2">
              <button className="btn btn-ghost" onClick={() => nav('/profile')}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={state.isLoading}
              >
                {state.isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
