import { Route, Routes } from 'react-router-dom';
import AddTask from './components/pages/AddTask/AddTask';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import MyTask from './components/pages/MyTask/MyTask';
import Registration from './components/pages/Resistration/Registration';
import Navbar from './components/Shared/Navbar';
import RequireAuth from './components/Shared/RequireAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClientProvider, QueryClient } from 'react-query';

const client = new QueryClient();

function App() {
  return (
    <div className="overflow-hidden w-full h-[90vh]">
      <Navbar />
      <QueryClientProvider client={client}>
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
      </QueryClientProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
