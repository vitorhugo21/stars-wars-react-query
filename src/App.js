import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Navbar from './components/Navbar';
import Planets from './components/Planets';
import People from './components/People';

const queryClient = new QueryClient()

function App() {
  const [page, setPage] = useState('planets');

  return (
      <div className="App">
        <h1>Star Wars Info</h1>
        <Navbar setPage={setPage} />
        <div className="content">
          <QueryClientProvider client={queryClient}>
            {page === 'planets' ? <Planets /> : <People />}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </div>
      </div>
  );
}

export default App;
