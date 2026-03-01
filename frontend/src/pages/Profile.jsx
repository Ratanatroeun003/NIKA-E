import { useState, useReducer } from 'react';
import { userReducer, userInitialState } from '../../reducer/userReducer';
import { useNavigate } from 'react-router-dom';
import userService from '../../service/userService';

const Profile = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(userReducer, userInitialState);
  const [isLogin, setIsLogin] = useState(true);
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
      dispatch({
        type: 'USER_FAIL',
        payload: {
          message: 'Please select file smaller than 2MB!',
          field: 'image',
        },
      });
      setFile(null);
      return;
    }
    if (selectedFile) {
      setFile(selectedFile);
      dispatch({ type: 'CLEAR_ERROR' });
    }
  };
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    address: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const {
    fname,
    lname,
    address,
    gender,
    phone,
    email,
    password,
    confirmPassword,
  } = formData;

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      fname: '',
      lname: '',
      address: '',
      gender: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'USER_REQUEST' });

    try {
      if (isLogin) {
        const data = await userService.login({ email, password });
        dispatch({ type: 'LOGIN_SUCCESS', payload: data.data });
        navigate('/');
      } else {
        // ✅ Validation សម្រាប់ Register
        if (password.length < 8) {
          return dispatch({
            type: 'USER_FAIL',
            payload: {
              message: 'Password must be lest than 8 degit!',
              field: 'password',
            },
          });
        }
        if (password !== confirmPassword) {
          return dispatch({
            type: 'USER_FAIL',
            payload: {
              message: 'Password does not match',
              field: 'confirmPassword',
            },
          });
        }
        const data = new FormData();
        data.append('fname', fname);
        data.append('lname', lname);
        data.append('address', address);
        data.append('phone', phone);
        data.append('email', email);
        data.append('password', password);
        data.append('gender', gender);
        if (file) {
          data.append('avatar', file);
        }
        await userService.register(data);
        dispatch({ type: 'REGISTER_SUCCESS' });
        setIsLogin(true);
      }
    } catch (error) {
      const status = error.response?.status;
      if (status >= 500 || !error.response) {
        dispatch({
          type: 'USER_FAIL',
          payload: {
            message: 'Server Issue. Please try again!',
            serverError: true,
          },
        });
      } else {
        dispatch({
          type: 'USER_FAIL',
          payload: {
            message: error.response?.data?.message || 'Something went wrong!',
            field: error.response?.data?.field || null,
            serverError: false,
          },
        });
      }
    }
  };

  return (
    <div className="flex max-w-7xl justify-center flex-col items-center min-h-screen bg-base-300 p-4">
      {/* ⚠️ Server Error Banner */}
      {state.error?.serverError && (
        <div
          role="alert"
          className="alert alert-error flex items-center justify-center w-80 flex-col"
        >
          <p className="text-black-700 font-bold text-sm block">
            ⚠️ Server Issue!
          </p>
          <p className="text-blue-600 text-xs mb-2">{state.error.message}</p>
          <button onClick={handleSubmit} className="btn btn-xs btn-warning">
            Retry
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <fieldset
          className={`fieldset bg-base-200 border-base-300 rounded-box border p-6 shadow-xl ${isLogin ? 'w-80' : 'max-w-2xl'}`}
        >
          <legend className="fieldset-legend text-lg font-bold">
            {isLogin ? 'Login' : 'Register'}
          </legend>
          <div
            className={
              isLogin
                ? 'flex flex-col gap-2'
                : 'grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4'
            }
          >
            {!isLogin && (
              <>
                <div className="flex flex-col items-center sm:col-span-2 mb-4">
                  <div className="avatar mb-4">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <label htmlFor="file" className="cursor-pointer">
                        {' '}
                        <img
                          src={
                            file
                              ? URL.createObjectURL(file)
                              : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                          }
                          alt="preview"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </label>
                    </div>
                  </div>
                  <input
                    type="file"
                    hidden
                    id="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input file-input-bordered file-input-xs w-full max-w-xs mt-2"
                  />
                  {state.error?.field === 'image' && (
                    <div role="alert" className="alert alert-warning">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <span>{state.error.message}</span>
                    </div>
                  )}
                </div>
                {/* First Name */}
                <div>
                  <label className="label">First Name</label>
                  <input
                    required
                    type="text"
                    name="fname"
                    value={fname}
                    onChange={onChange}
                    className="input input-bordered w-full"
                    placeholder="First Name"
                  />
                </div>
                {/* Last Name */}
                <div>
                  <label className="label">Last Name</label>
                  <input
                    required
                    type="text"
                    name="lname"
                    value={lname}
                    onChange={onChange}
                    className="input input-bordered w-full"
                    placeholder="Last Name"
                  />
                </div>
                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="label">Address</label>
                  <input
                    required
                    type="text"
                    name="address"
                    value={address}
                    onChange={onChange}
                    className="input input-bordered w-full"
                    placeholder="Your Address"
                  />
                </div>
                {/* Gender */}
                <div>
                  <label className="label">Gender</label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        onChange={onChange}
                        className="radio radio-primary"
                        required
                      />{' '}
                      Male
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={onChange}
                        className="radio radio-primary"
                      />{' '}
                      Female
                    </label>
                  </div>
                </div>
                {/* Phone */}
                <div>
                  <label className="label">Phone</label>
                  <input
                    required
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={onChange}
                    className="input input-bordered w-full"
                    placeholder="Phone Number"
                  />
                </div>
              </>
            )}

            {/* Email */}
            <div className={isLogin ? '' : 'sm:col-span-2'}>
              <label className="label">Email</label>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                className={`input input-bordered w-full ${state.error?.field === 'email' ? 'border-red-500' : ''}`}
                placeholder="Email"
              />
              {state.error?.field === 'email' && (
                <p className="text-xs text-red-500 mt-1">
                  {state.error.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label">Password</label>
              <input
                required
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                className={`input input-bordered w-full ${state.error?.field === 'password' ? 'border-red-500' : ''}`}
                placeholder="Password"
              />
              {state.error?.field === 'password' && (
                <p className="text-xs text-red-500 mt-1">
                  {state.error.message}
                </p>
              )}
            </div>

            {/* Confirm Password (Only for Register) */}
            {!isLogin && (
              <div>
                <label className="label">Confirm Password</label>
                <input
                  required
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChange}
                  className={`input input-bordered w-full ${state.error?.field === 'confirmPassword' ? 'border-red-500' : ''}`}
                  placeholder="Confirm Password"
                />
                {state.error?.field === 'confirmPassword' && (
                  <p className="text-xs text-red-500 mt-1">
                    {state.error.message}
                  </p>
                )}
              </div>
            )}
          </div>

          <button
            disabled={state.isLoading}
            className="btn btn-primary w-full mt-6"
          >
            {state.isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : isLogin ? (
              'Login'
            ) : (
              'Register'
            )}
          </button>

          <p className="text-sm mt-4 text-center">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              type="button"
              onClick={toggleForm}
              className="text-primary ml-1 underline hover:cursor-pointer"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default Profile;
