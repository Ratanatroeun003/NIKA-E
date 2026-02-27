import { useState, useReducer } from 'react';
import { userReducer, userInitialState } from '../../reducer/userReducer';
import { useNavigate } from 'react-router-dom';
import userService from '../../service/userService';

const Profile = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(userReducer, userInitialState);
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
    });
    dispatch({ type: 'CLEAR_ERROR' });
  };
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { email, password, confirmPassword } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.navigator.onLine) {
      return dispatch({
        type: 'USER_FAIL',
        payload: 'No Internet Connection!',
      });
    }
    dispatch({ type: 'USER_REQUEST' });
    try {
      if (isLogin) {
        const data = await userService.login({ email, password });
        dispatch({ type: 'LOGIN_SUCCESS', payload: data.data });
        navigate('/');
      } else {
        if (password !== confirmPassword) {
          return dispatch({
            type: 'USER_FAIL',
            payload: 'Password does not match',
          });
        }
        await userService.register({
          email,
          password,
        });
        dispatch({ type: 'REGISTER_SUCCESS' });
        setIsLogin(true);
      }
    } catch (error) {
      dispatch({
        type: 'USER_FAIL',
        payload:
          error.response?.data?.message ||
          error.message ||
          'Something went wrong! ',
      });
    }
  };
  return (
    <div className="flex max-w-7xl justify-center items-center min-h-screen bg-base-100">
      <form onSubmit={handleSubmit}>
        {isLogin ? (
          // 🔹 LOGIN FORM
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-80 border p-6">
            {state.error?.includes('No Internet Connection!') && (
              <div className="flex flex-col items-center p-4 bg-orange-50 border border-orange-200 rounded-md animate-pulse">
                <p className="text-orange-700 text-sm">{state.error}</p>
                <button
                  type="button"
                  className="btn btn-xs btn-warning"
                  onClick={handleSubmit}
                >
                  Try again
                </button>
              </div>
            )}
            <legend className="fieldset-legend text-lg font-bold">Login</legend>

            <label className="label">Email</label>
            <input
              required
              type="email"
              name="email"
              onChange={onChange}
              value={email}
              className={`input input-bordered w-full ${state.error?.includes('Email') || state.error?.includes('User not found!') ? 'border-red-500' : ''}`}
              placeholder="Email"
            />
            {(state.error?.includes('Email') ||
              state.error?.includes('User')) && (
              <span className="text-xs text-red-500 ">{state.error}</span>
            )}
            <label className="label mt-2">Password</label>
            <input
              required
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className={`input input-bordered w-full ${state.error?.includes('Invalid') || state.error?.includes('credentials') ? 'border-red-500' : ''}`}
              placeholder="Password"
            />
            {(state.error?.includes('credentials') ||
              state.error?.includes('Password')) && (
              <span className="text-red-500 text-xs">{state.error}</span>
            )}

            <button
              type="submit"
              disabled={state.isLoading}
              className="w-full bg-blue-600 px-4 py-2 rounded-md text-sm font-semibold mt-4"
            >
              {state.isLoading
                ? 'Please wait...'
                : isLogin
                  ? 'Login'
                  : 'Register'}
            </button>
            <p className="text-sm mt-3 text-center">
              Don't have an account?
              <button
                type="button"
                onClick={toggleForm}
                className="text-primary ml-1 underline cursor-pointer"
              >
                Register
              </button>
            </p>
          </fieldset>
        ) : (
          // 🔹 REGISTER FORM
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-80 border p-6">
            {state.error?.includes('No Internet Connection!') && (
              <div className="flex flex-col items-center p-4 bg-orange-50 border border-orange-200 rounded-md animate-bounce">
                <p className="text-orange-700 text-sm ">{state.error}</p>
                <button
                  type="button"
                  className="btn btn-xs btn-warning"
                  onClick={handleSubmit}
                >
                  Try again
                </button>
              </div>
            )}
            <legend className="fieldset-legend text-lg font-bold">
              Register
            </legend>

            <label className="label">Email</label>
            <input
              required
              type="email"
              name="email"
              onChange={onChange}
              value={email}
              className="input input-bordered w-full"
              placeholder="Email"
            />

            <label className="label mt-2">Password</label>
            <input
              required
              type="password"
              name="password"
              onChange={onChange}
              value={password}
              className="input input-bordered w-full"
              placeholder="Password"
            />

            <label className="label mt-2">Confirm Password</label>
            <input
              required
              type="password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={onChange}
              className="input input-bordered w-full mb-4"
              placeholder="Confirm Password"
            />

            <button
              type="submit"
              disabled={state.isLoading}
              className="w-full bg-blue-600 px-4 py-2 rounded-md text-sm font-semibold"
            >
              {state.isLoading
                ? 'Please wait...'
                : isLogin
                  ? 'Login'
                  : 'Register'}
            </button>
            <p className="text-sm mt-3 text-center">
              Already have an account?
              <button
                type="button"
                onClick={toggleForm}
                className="text-primary ml-1 hover:underline hover:cursor-pointer"
              >
                Login
              </button>
            </p>
          </fieldset>
        )}
      </form>
    </div>
  );
};

export default Profile;
