import { createContext, useContext, useReducer } from 'react';
import {
  userReducer,
  userInitialState,
  initializer,
} from '../reducer/userReducer';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    userReducer,
    userInitialState,
    initializer,
  );

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
