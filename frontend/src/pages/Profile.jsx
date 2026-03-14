import { useUser } from '../context/UserContext';
import Auth from '../components/common/Auth';
import ProfileLayout from '../components/layouts/ProfileLayout';
import { useEffect } from 'react';
import userService from '../service/userService';

const Profile = () => {
  const { state, dispatch } = useUser();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (state.isAuthenticated) {
          const data = await userService.getProfile();
          dispatch({ type: 'SET_USER', payload: data.data });
        }
      } catch (error) {
        if (error.status === 401) {
          dispatch({ type: 'LOG_OUT' });
        }
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    dispatch({ type: 'LOG_OUT' });
  };

  return (
    <>
      {state.isAuthenticated ? (
        <ProfileLayout user={state.user} handleLogout={handleLogout} />
      ) : (
        <Auth />
      )}
    </>
  );
};

export default Profile;
