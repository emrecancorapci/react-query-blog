import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import ViewPost from './pages/post/ViewPost';
import ViewUser from './pages/user/ViewUser';
import AddPost from './pages/post/AddPost';

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
