
import './App.css';
import Countries from './components/Countries';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import CountryDetails from './components/CountryDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="/country/:cca3" element={<CountryDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
