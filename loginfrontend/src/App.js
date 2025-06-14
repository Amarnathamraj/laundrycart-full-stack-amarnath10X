import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Register from './components/register/register';
import Login from './components/login/login';
import OrderDashboard from './components/orderdashboard/OrderDashboard';
import CreateOrder from './components/createorder/CreateOrder';
import OrderComponent from './components/ordercomponent/OrderComponent';

const App = () => {
  const [token, setToken] = useState('');

  return (
    <BrowserRouter>
      <div>
        {token ? (
          <Routes>
            <Route path="/" element={<Navigate to="/orders" />} />
            <Route path="/orders" element={<OrderComponent userId="user123" />} />
            <Route path="/create-order" element={<CreateOrder />} />
          </Routes>
        ) : (
          <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register />} />
          </Routes>
        )}
      </div>
   </BrowserRouter>
  );
};

export default App;