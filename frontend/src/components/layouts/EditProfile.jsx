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
  const [preview, setPreview] = useState(user?.avatar || '');

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
  }, [user]);

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
      setSuccess(false); // ✅ reset មុន submit
      setError('');

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) data.append(key, formData[key]);
      });
      if (avatar) data.append('avatar', avatar);

      const response = await userService.updateProfile(data);
      console.log('response:', response); // ← មើល structure
      console.log('response.data:', response.data);
      console.log('response.data.data:', response.data.data); // ← user object?
      dispatch({ type: 'UPDATE_SUCCESS', payload: response.data });

      setSuccess(true); // ✅ local success
      setTimeout(() => nav('/profile'), 1000);
    } catch (err) {
      setError(err.message || 'Update failed!');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-10">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Title */}
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

          {/* Form */}
          <div className="flex flex-col gap-4">
            {/* First Name + Last Name */}
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

            {/* Email */}
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

            {/* Phone */}
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

            {/* Address */}
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

            {/* Gender */}
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

            {/* Password */}
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

            {/* ✅ ប្រើ local error — មិនមែន state.error */}
            {error && (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            )}

            {/* ✅ ប្រើ local success */}
            {success && (
              <div className="alert alert-success">
                <span>Updated successfully! ✅</span>
              </div>
            )}

            {/* Buttons */}
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
