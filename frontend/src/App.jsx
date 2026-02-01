import { Route, Routes, BrowserRouter } from 'react-router-dom';
import UserLayout from './components/layouts/UserLayout';
import Home from './pages/Home';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<UserLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
