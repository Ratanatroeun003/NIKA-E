import { Route, Routes, BrowserRouter } from 'react-router-dom';
import UserLayout from './components/layouts/UserLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* userLayout */}
        <Route path="" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
