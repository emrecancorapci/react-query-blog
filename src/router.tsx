import { Route, Routes } from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login';
import AddPost from './pages/post/add-post';
import ViewPost from './pages/post/view-post';
import ViewUser from './pages/user/view-user';

export default function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="Post/Add" element={<AddPost />} />
      <Route path="Post/:id" element={<ViewPost />} />
      <Route path="User/:id" element={<ViewUser />} />
      <Route path="Login" element={<Login />} />
    </Routes>
  );
}
