import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoutes from './features/auth/ProtectedRoutes';
import ArticleDetails from './pages/ArticleDetails';
import Account from './pages/Account';
import ForgotPassword from './features/auth/ForgotPassword';
import ResetPassword from './features/auth/ResetPassword';
import Faq from './pages/Faq';
import MyArticles from './pages/MyArticles';

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route index element={<HomePage />} />
        <Route path="/article/:slug" element={<ArticleDetails />} />
        <Route path="/account" element={<Account />} />
        <Route path="/articles" element={<MyArticles />} />
        <Route path="/faq" element={<Faq />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/resetPassword/:token" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
