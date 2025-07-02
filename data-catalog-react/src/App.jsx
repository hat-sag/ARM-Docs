import DataCatalog from './components/DataCatalog';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DataCatalog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
