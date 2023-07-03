import { Routes, Route } from 'react-router-dom';

import Posts from './pages/Posts';
import Post from './pages/Post';
import User from './pages/User';

export default function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="Post/:id" element={<Post />} />
      <Route path="User/:id" element={<User />} />
    </Routes>
  );
}
