import { Route, Routes } from 'react-router-dom';

import RequireAuth from '@components/Auth/RequireAuth';
import Layout from '@components/Layout/Layout';
import LayoutWithoutNav from '@components/Layout/LayoutWithoutNav';

import Category from '@pages/Category.page';
import CategoryDetails from '@pages/CategoryDetails.page';
import Dashboard from '@pages/Dashboard.page';
import HomePage from '@pages/Home.page';
import Login from '@pages/Login.page';
import NotFound from '@pages/NotFound.page';
import Profile from '@pages/Profile.page';
import Register from '@pages/Register.page';

const App = () => {
  return (
    <Routes>
      <Route element={<LayoutWithoutNav />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route element={<RequireAuth />}>
          <Route path="home" element={<HomePage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="category" element={<Category />} />
          <Route path="category/:categoryId" element={<CategoryDetails />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
