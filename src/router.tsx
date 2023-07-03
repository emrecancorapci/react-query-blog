import { Routes, Route } from 'react-router-dom';

import Posts from './components/Posts';
import Post from './components/Post';

export default function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="Post/:id" element={<Post />} />
    </Routes>
  );
}
