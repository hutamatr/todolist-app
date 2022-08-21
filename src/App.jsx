import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import LayoutWithOutNav from './components/Layout/LayoutWithOutNav';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Category from './pages/Category';
import NotFound from './pages/NotFound';
import RequireAuth from './components/Auth/RequireAuth';
import CategoryDetails from './pages/CategoryDetails';

const App = () => {
  return (
    <Routes>
      <Route element={<LayoutWithOutNav />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route element={<RequireAuth />}>
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="category" element={<Category />} />
          <Route path="category/:categoryId" element={<CategoryDetails />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
