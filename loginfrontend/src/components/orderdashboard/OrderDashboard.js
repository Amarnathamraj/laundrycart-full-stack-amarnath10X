
import { useNavigate } from 'react-router-dom';
import './OrderDashboard.css';
import Layout from '../layout/Layout';

const OrderDashboard = ({ token }) => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="dashboard-container">
        <button className="create" onClick={() => navigate('/create-order')}>
          Create Order
        </button>
      </div>
    </Layout>
  );
};

export default OrderDashboard;