import { Routes, Route } from 'react-router-dom';

import Layout from 'components/Layout/Layout';
import LayoutWithoutNav from 'components/Layout/LayoutWithoutNav';
import HomePage from 'pages/Home.page';
import RequireAuth from 'components/Auth/RequireAuth';
import Register from 'pages/Register.page';
import Login from 'pages/Login.page';
import Dashboard from 'pages/Dashboard.page';
import Profile from 'pages/Profile.page';
import Category from 'pages/Category.page';
import CategoryDetails from 'pages/CategoryDetails.page';
import NotFound from 'pages/NotFound.page';

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
