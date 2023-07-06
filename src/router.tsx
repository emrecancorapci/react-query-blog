import { Routes, Route } from 'react-router-dom';

import Posts from './pages/Posts';
import Post from './pages/post/ViewPost';
import User from './pages/user/View';
import Login from './pages/Login';
import PostAdd from './pages/post/AddPost';

export default function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="Post/Add" element={<PostAdd />} />
      <Route path="Post/:id" element={<Post />} />
      <Route path="User/:id" element={<User />} />
      <Route path="Login" element={<Login />} />
    </Routes>
  );
}
