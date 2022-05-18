import { Route, Routes } from 'react-router-dom';
import AddTask from './components/pages/AddTask/AddTask';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import MyTask from './components/pages/MyTask/MyTask';
import Registration from './components/pages/Resistration/Registration';
import Navbar from './components/Shared/Navbar';
import RequireAuth from './components/Shared/RequireAuth';

function App() {
  return (
    <div className="overflow-hidden w-full h-[90vh]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/addTask"
          element={
            <RequireAuth>
              <AddTask />
            </RequireAuth>
          }
        />
        <Route
          path="/myTask"
          element={
            <RequireAuth>
              <MyTask />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
