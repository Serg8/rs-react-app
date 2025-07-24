import type { FC } from 'react';
import Search from './components/Search/Search.tsx';

const App: FC = () => {
  return (
    <div data-testid="app" className="container mx-auto px-4">
      <Search />
    </div>
  );
};

export default App;
