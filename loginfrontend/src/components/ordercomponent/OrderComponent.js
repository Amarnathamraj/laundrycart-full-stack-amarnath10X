import React, { useState, useEffect } from 'react';
import './OrderComponent.css';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';

function OrderComponent({ userId }) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAlertPopup, setShowAlertPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getLineStyle = (index, currentStep, isCancelModal, isCancelled) => {
    if (isCancelModal || isCancelled) {
      return "line-empty"; // No progress lines for cancel modal or cancelled status
    }
    // Adjust to fill correct number of lines: 
    // Ready to Pickup (currentStep=1): fill 1 line (index 0)
    // In Washing (currentStep=2): fill 2 lines (index 0, 1)
    // In Ironing (currentStep=3) or Ready to deliver (currentStep=4): fill 3 lines (index 0, 1, 2)
    const linesToFill = currentStep === 1 ? 1 : currentStep === 2 ? 2 : 3;
    if ((currentStep === 2 && index === 1) || (currentStep === 3 && index === 2)) {
      return "line-half";
    }
    return index < linesToFill ? "line-full" : "line-empty";
  };

  const fetchOrders = () => {
    if (!userId) {
      setError('User ID is missing. Please log in to view orders.');
      return;
    }

    setLoading(true);

    fetch(`https://laundrycart-full-stack-amarnath10x-1.onrender.com/orders?userId=${userId}`)
  //  fetch(`https://laundrycardbackend-production.up.railway.app/orders?userId=${userId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log(data)
        const updatedOrders = data.map(order => ({
          ...order,
          status: order.status === 'Pending' ? getRandomStatus() : order.status,
        }));
      
        setOrders(updatedOrders);
       // console.log('Updated orders with new statuses:', updatedOrders);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        setError(
          error.message.includes('Server error')
            ? `Unable to fetch orders: ${error.message}. Please try again later.`
            : 'Network error: Unable to connect to the server. Please check your internet connection.'
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getRandomStatus = () => {
    const statuses = ['Ready to Pickup', 'In Washing', 'In Ironing', 'Ready to deliver'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  useEffect(() => {
    fetchOrders();
  
  }, [userId]);

  
  const handleCancelOrderClick = (order) => {
    if (order.status === 'Ready to Pickup') {
      setSelectedOrder(order);
      setShowCancelModal(true);
    } else {
      setError('Order can only be canceled when in "Ready to Pickup" status.');
    }
  };

  const confirmCancelOrder = () => {
    if (!selectedOrder || selectedOrder.status !== 'Ready to Pickup') return;

    setShowCancelModal(false);
    setShowAlertPopup(true);
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
    setSelectedOrder(null);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedOrder(null);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  const calculateOrderDetails = (items) => {
    const details = [];
    let subtotal = 0;

    if (!Array.isArray(items) || items.length === 0) {
      return { details: [], subtotal: 0 };
    }

    items.forEach(item => {
      const washTypes = Array.isArray(item?.washes) && item.washes.length > 0 ? item.washes.join(', ') : 'N/A';
      const price = item?.price || 0;
      const quantity = item?.quantity || 0;
      const washCount = Array.isArray(item?.washes) ? item.washes.length : 0;
      details.push({
        name: item?.name || 'Unknown Item',
        washTypes,
        quantity,
        price,
        washCount,
      });
      subtotal += price;
    });

    return { details, subtotal };
  };

  const getProgressStatus = (orderStatus, isCancelModal = false) => {
    const statuses = ['Picked up', 'Washed', 'Ironed', 'Delivered'];
    const statusMap = {
      'Ready to Pickup': 1,
      'In Washing': 2,
      'In Ironing': 3,
      'Ready to deliver': 4,
      'Cancelled': -1,
    };
    const currentStep = statusMap[orderStatus] || -1;
    const isCancelled = orderStatus === 'Cancelled';

    if (isCancelModal || isCancelled) {
      return statuses.map((status) => ({
        status,
        isCompleted: false, // Empty circles, no tick marks
        date: null, // No dates for cancel modal or cancelled status
      }));
    }

    return statuses.map((status, index) => ({
      status,
      isCompleted: index < currentStep && !(orderStatus === 'Ready to deliver' && index === 3),
      date:
      index === 0 && currentStep > 0
        ? '12 - Oct - 2021'
        : index === 1 && currentStep > 1
        ? '14 - Oct - 2021'
        : index === 2 && currentStep > 2
        ? '16 - Oct - 2021'
       
        : null,
    }));
  };

  const handleConfirmCancellation = () => {
    if (!selectedOrder || selectedOrder.status !== 'Ready to Pickup') return;

    fetch(`https://laundrycart-full-stack-amarnath10x-1.onrender.com/orders/${selectedOrder.orderId}`, {
    //fetch(`https://laundrycardbackend-production.up.railway.app/orders/${selectedOrder.orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'Cancelled' }),
    })
      .then(res => {
        console.log(res)
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then(updatedOrder => {
        setOrders(orders.map(order =>
          order.orderId === updatedOrder.orderId ? updatedOrder : order
        ));
        setError(null);
      })
      .catch(error => {
        console.error('Error cancelling order:', error);
        setError('Failed to cancel the order. Please try again later.');
      })
      .finally(() => {
        setShowAlertPopup(false);
        setSelectedOrder(null);
      });
  };

  return (
    <Layout>
      <div className="top-section">
        <h2>
          <strong>Orders</strong> <span>|</span> <strong>{orders.length}</strong>
        </h2>
        <div className="top-controls">
          <Link to="/create-order">
            <button className="create-btn">Create</button>
          </Link>
          <div className="search-bar">
            <div className="input-wrapper">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" />
            </div>
          </div>
        </div>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 && !error ? (
        <p>No orders found.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Order Date & Time</th>
                <th>Store Location</th>
                <th>City</th>
                <th>Store Phone</th>
                <th>Total Items</th>
                <th>Price</th>
                <th>Status</th>
                <th></th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.orderDateTime}</td>
                  <td>{order.storeLocation}</td>
                  <td>{order.city}</td>
                  <td>{order.storePhone}</td>
                  <td>{order.totalItems}</td>
                  <td>{order.price} Rs</td>
                  <td>{order.status}</td>
                  <td>
                    {order.status === 'Ready to Pickup' && (
                      <button
                        onClick={() => handleCancelOrderClick(order)}
                        style={{
                          padding: '2px 4px',
                          backgroundColor: 'transparent',
                          color: '#ff0000',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel Order
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleViewOrder(order)}
                      style={{
                        padding: '2px 8px',
                        backgroundColor: 'white',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(showCancelModal || showViewModal) && selectedOrder && (
        <div className="summary-overlay">
          <div className="summary-container slide-in-right">
            <div className="summary-header">
              <h2>Summary</h2>
              <span className="close-btn" onClick={showCancelModal ? handleCloseCancelModal : handleCloseViewModal}>×</span>
            </div>
            <div className="summary-details">
              <div className="store-info">
                <div className="store-address">
                  <label>Store Location:</label>
                  <span>{selectedOrder.storeLocation}</span>
                </div>
                <div className="store-address">
                  <label>Store Address:</label>
                  <span className='store-address-text'>{selectedOrder.storeLocation}, {selectedOrder.city}</span>
                </div>
                <div className="phone">
                  <label>Phone:</label>
                  <span className='phone-text'>{selectedOrder.storePhone}</span>
                </div>
              </div>
              {/* [
  { status: 'Picked up', isCompleted: true, date: '12 - Oct - 2021' },
  { status: 'Washed', isCompleted: true, date: '14 - Oct - 2021' },
  { status: 'Ironed', isCompleted: true, date: '16 - Oct - 2021' },
  { status: 'Delivered', isCompleted: false, date: null }
] */}
              <div className="progress-tracker">
                {getProgressStatus(selectedOrder.status, showCancelModal).map((step, index, array) => (
                  <React.Fragment key={step.status}>
                    <div className="progress-step">
                      <div className="circle-container">
                        <i
                          className="fas fa-check"
                          style={{
                            backgroundColor: step.isCompleted && !showCancelModal ? "blue" : "transparent",
                            color: step.isCompleted && !showCancelModal ? "white" : "transparent",
                            border: !step.isCompleted || showCancelModal ? "2px solid gray" : "none",
                            borderRadius: "50%",
                            width: "14px",
                            height: "14px",
                            display: "inline-flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "10px",
                            lineHeight: 1,
                          }}
                        ></i>
                        <span className="status">{step.status}</span>
                      </div>
                      {step.date && !showCancelModal && <span className="date">{step.date}</span>}
                    </div>
                    {index < array.length - 1 && (
                      <div
                        className={`progress-line ${getLineStyle(
                          index,
                          selectedOrder ? (selectedOrder.status === 'Ready to Pickup' ? 1 : selectedOrder.status === 'In Washing' ? 2 : selectedOrder.status === 'In Ironing' || selectedOrder.status === 'Ready to deliver' ? 3 : -1) : -1,
                          showCancelModal,
                          selectedOrder.status === 'Cancelled'
                        )}`}
                      ></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #ddd', marginTop: '10px', marginBottom: '10px' }}></div>

              <div style={{ padding: '0 20px', marginBottom: '20px' }}>
                <h3 style={{ color: '#333', fontSize: '14px', padding: '8px', margin: '0' }}>
                  Order Details
                </h3>
                {(() => {
                  const { details } = calculateOrderDetails(selectedOrder.items);
                  return details.map((detail, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '8px',
                        borderBottom: '1px solid #ddd',
                        fontSize: '14px',
                        color: '#333'
                      }}
                    >
                      <span>{detail.name}</span>
                      <span style={{ fontStyle: 'italic' }}>{detail.washTypes}</span>
                      <span>
                        {detail.quantity} x {detail.washCount} ={' '}
                        <span style={{ color: '#5861AE' }}>{detail.price}</span>
                      </span>
                    </div>
                  ));
                })()}
              </div>

              <div className="summary-footer">
                <div className="summary-row">
                  <span style={{
                    display: "inline-block",
                    borderBottom: '1px solid #ddd',
                    paddingLeft: "60px",
                    paddingRight: "20px",
                    marginLeft: "-60px",
                    marginRight: "-20px",
                    paddingBottom: "4px"
                  }}>Sub total:</span>
                  <span><b>{calculateOrderDetails(selectedOrder.items).subtotal}</b></span>
                </div>
                <div className="summary-row">
                  <span>Pickup Charges:</span>
                  <span style={{ fontWeight: 'bold' }}>90</span>
                </div>
                <div className="summary-row total">
                  <span>TOTAL:</span>
                  <span>Rs {selectedOrder.price}</span>
                </div>
              </div>

              <div className="address-section">
                <label>Address:</label>
                <div className="address-buttons">
                  <button className="address-btn selected">
                  {selectedOrder.customerAddress || 'No address provided'}
                  </button>
                </div>
              </div>

              {showCancelModal && selectedOrder.status === 'Ready to Pickup' && (
                <div className="summary-actions">
                  <button className="cancel-order" onClick={confirmCancelOrder}>Cancel Order</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showAlertPopup && selectedOrder && (
        <div className="alert-popup">
          <div className="alert-header">
            <span>Alert</span>
            <button onClick={() => setShowAlertPopup(false)}>×</button>
          </div>
          <div className="alert-body">
            <div className="alert-icon">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: 'red', fontSize: '30px' }}></i>
            </div>
            <p>
              Are you sure you want to cancel order No: <span className="order-id">{selectedOrder.orderId}</span>
            </p>
          </div>
          <div>
            <button className="alert-confirm-btn" onClick={handleConfirmCancellation}>
              Proceed
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default OrderComponent;