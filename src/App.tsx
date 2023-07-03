import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Suspense } from 'react';

function App(): JSX.Element {
  const qc = useQueryClient();
  const {
    status,
    error,
    data: posts,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => await axios.get('https://jsonplaceholder.typicode.com/posts'),
  });
  return (
    <>
      <header>
        <h1>
          A Blog Site using <a href="https://tanstack.com/query/v4/">Tanstack Query v4</a> and{' '}
          <a href="https://jsonplaceholder.typicode.com/">JSON Placeholder</a>
        </h1>
      </header>
      <main></main>
    </>
  );
}

export default App;
