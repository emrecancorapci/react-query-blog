import { Suspense } from 'react';

import Header from './components/Header';
import Router from './router';

function App(): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<p>Loading...</p>}>
          <Router />
        </Suspense>
      </main>
    </>
  );
}

export default App;
