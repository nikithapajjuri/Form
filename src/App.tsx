import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Make sure to import necessary components
import Form from './Form/Form';
import Table from './Table/Table';

function App() {
  return (
    <div>
      <BrowserRouter>  {/* Corrected the closing tag */}
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </BrowserRouter>  {/* Corrected the closing tag */}
    </div>
  );
}

export default App;
