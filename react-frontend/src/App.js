import './App.css';

import { BrowseContainer } from './containers/browse';
import { UploadContainer } from './containers/upload';

function App() {
  return (
    <div className="App">
      <UploadContainer />
      <BrowseContainer />
    </div>
  );
}

export default App;
