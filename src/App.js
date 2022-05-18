import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import Registration from './components/pages/Resistration/Registration';
import Navbar from './components/Shared/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
