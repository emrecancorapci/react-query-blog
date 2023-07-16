import { Suspense } from 'react';

import Header from 'comp/Header';
import Router from './router';

function App(): JSX.Element {
  return (
    <>
      <Header />
      <main className="flex max-w-3xl flex-col justify-center self-center p-4">
        <Suspense fallback={<p>Loading...</p>}>
          <Router />
        </Suspense>
      </main>
    </>
  );
}

export default App;
