import { Component } from 'react';
import Search from './components/Search/Search.tsx';

class App extends Component {
  render() {
    return (
      <div className="container mx-auto px-4">
        <Search />
      </div>
    );
  }
}

export default App;
