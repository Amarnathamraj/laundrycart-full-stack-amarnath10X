import React, { useEffect, useState } from 'react';
import './CreateOrder.css';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import washingImg from '../../assets/images/wm.png';
import ironImg from '../../assets/images/iron.png';
import towelImg from '../../assets/images/towel.jpg';
import bleachImg from '../../assets/images/bleach.jpg';
import shirtImg from '../../assets/images/shirt.jpg';
import tshirtImg from '../../assets/images/tshirt.jpg';
import trowsersImg from '../../assets/images/trowsers.jpg';
import jeansImg from '../../assets/images/jeans.jpg';
import boxersImg from '../../assets/images/boxers.jpg';
import joggersImg from '../../assets/images/jog.png';

function CreateOrder({ onClose }) {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [washSelections, setWashSelections] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [storeLocation, setStoreLocation] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storePhone, setStorePhone] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState('');

  const [addresses, setAddresses] = useState([
    { label: 'Home', address: 'Home,10th road,Jp Nagar,Bangalore', selected: true },
    { label: 'Other', address: 'Other,9th road,Indira Nagar,Bangalore', selected: false },
  ]);

  const userId = "user123";

  const storeLocations = [
    { location: "Jp Nagar", address: "Near Phone Booth, 10th Road, Bangalore", phone: "9999999999" },
    { location: "Koramangala", address: "5th Block, 8th Main, Bangalore", phone: "8888888888" },
    { location: "Indiranagar", address: "100 Feet Road, 2nd Stage, Bangalore", phone: "7777777777" },
    { location: "Whitefield", address: "ITPL Main Road, Bangalore", phone: "6666666666" },
  ];

  const washOptions = [
    { name: 'Washing', price: 20, icon: <img src={washingImg} alt="Washing" width="20" /> },
    { name: 'Ironing', price: 15, icon: <img src={ironImg} alt="Ironing" width="20" /> },
    { name: 'Dry Wash', price: 20, icon: <img src={towelImg} alt="Dry Wash" width="20" /> },
    { name: 'Bleach', price: 50, icon: <img src={bleachImg} alt="Bleach" width="20" /> },
  ];

  useEffect(() => {
  fetch('https://laundrycart-full-stack-amarnath10x-1.onrender.com/products')
  
    // fetch('https://laundrycardbackend-production.up.railway.app/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        const initQuantities = {};
        const initWashes = {};
        data.forEach(item => {
          initQuantities[item._id] = 0;
          initWashes[item._id] = [];
        });
        setQuantities(initQuantities);
        setWashSelections(initWashes);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        const fallbackData = [
          { _id: '1', name: 'Shirts', description: 'Lorem ipsum is simply dummy text of the', image: shirtImg },
          { _id: '2', name: 'T Shirts', description: 'Lorem ipsum is simply dummy text of the', image: tshirtImg },
          { _id: '3', name: 'Trousers', description: 'Lorem ipsum is simply dummy text of ', image: trowsersImg },
          { _id: '4', name: 'Jeans', description: 'Lorem ipsum is simply dummy text of', image: jeansImg },
          { _id: '5', name: 'Boxers', description: 'Lorem ipsum is simply dummy text of ', image: boxersImg },
          { _id: '6', name: 'Joggers', description: 'Lorem ipsum is simply dummy text of ', image: joggersImg },
        ];
        setProducts(fallbackData);
        const initQuantities = {};
        const initWashes = {};
        fallbackData.forEach(item => {
          initQuantities[item._id] = 0;
          initWashes[item._id] = [];
        });
        setQuantities(initQuantities);
        setWashSelections(initWashes);
      });
  }, []);

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: parseInt(value) || 0 });
  };

  const toggleWash = (productId, washName) => {
    const selected = washSelections[productId] || [];
    const updated = selected.includes(washName)
      ? selected.filter(w => w !== washName)
      : [...selected, washName];
    setWashSelections({ ...washSelections, [productId]: updated });
  };

  const calculatePrice = (id) => {
    const qty = quantities[id];
    const washes = washSelections[id] || [];
    const washPrice = washes.reduce((sum, wash) => {
      const option = washOptions.find(w => w.name === wash);
      return sum + (option ? option.price : 0);
    }, 0);
    return qty * washPrice;
  };

  const handleReset = (id) => {
    setQuantities({ ...quantities, [id]: 0 });
    setWashSelections({ ...washSelections, [id]: [] });
  };

  const getSubtotal = () => {
    return products.reduce((sum, product) => {
      return sum + (quantities[product._id] > 0 && washSelections[product._id]?.length > 0 ? calculatePrice(product._id) : 0);
    }, 0);
  };

  const pickupCharges = 90;
  const total = getSubtotal() + pickupCharges;

  const handleProceed = () => {
    setShowSummary(true);
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
  };

  const handleConfirmCancel = () => {
    const initQuantities = {};
    const initWashes = {};
    products.forEach(item => {
      initQuantities[item._id] = 0;
      initWashes[item._id] = [];
    });
    setQuantities(initQuantities);
    setWashSelections(initWashes);
    setShowCancelModal(false);
    if (onClose) onClose();
  };

  const handleStoreLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setStoreLocation(selectedLocation);
    const selectedStore = storeLocations.find(store => store.location === selectedLocation);
    if (selectedStore) {
      setStoreAddress(selectedStore.address);
      setStorePhone(selectedStore.phone);
    } else {
      setStoreAddress('');
      setStorePhone('');
    }
  };

  const handleAddNewAddress = () => {
    setShowAddAddressForm(true);
  };

  const handleSaveNewAddress = () => {
    if (newAddress.trim()) {
      setAddresses([
        ...addresses.map(addr => ({ ...addr, selected: false })),
        { label: `Address ${addresses.length + 1}`, address: newAddress.trim(), selected: true },
      ]);
      setShowAddAddressForm(false);
      setNewAddress('');
    }
  };

  const handleCancelNewAddress = () => {
    setShowAddAddressForm(false);
    setNewAddress('');
  };

  const handleSelectAddress = (index) => {
    setAddresses(addresses.map((addr, i) => ({
      ...addr,
      selected: i === index,
    })));
  };

  const handleConfirm = () => {
    const orderId = `ORD${Date.now()}`;
    const orderDateTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const totalItems = products.reduce((sum, product) => sum + (quantities[product._id] || 0), 0);
    const selectedAddress = addresses.find(addr => addr.selected)?.address || 'Home #223, 10th road, Jp Nagar, Bangalore';

    const orderDetails = {
      orderId,
      userId,
      orderDateTime,
      storeLocation: storeLocation || 'Jp Nagar',
      city: 'Bangalore',
      storePhone: storePhone || '9999999999',
      storeAddress: storeAddress || 'Near Phone Booth, 10th Road, Bangalore',
      customerAddress: selectedAddress, // Added to store customer's selected address
      totalItems,
      price: total,
      status: 'Pending',
      items: products
        .filter(product => quantities[product._id] > 0 && washSelections[product._id]?.length > 0)
        .map(product => ({
          name: product.name || 'Unknown Product', // Added fallback
          quantity: quantities[product._id],
          washes: washSelections[product._id],
          price: calculatePrice(product._id),
        })),
    };
fetch('https://laundrycart-full-stack-amarnath10x-1.onrender.com/orders',{
   // fetch('https://laundrycardbackend-production.up.railway.app/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Order saved successfully:', data);
        const initQuantities = {};
        const initWashes = {};
        products.forEach(item => {
          initQuantities[item._id] = 0;
          initWashes[item._id] = [];
        });
        setQuantities(initQuantities);
        setWashSelections(initWashes);
        setErrorMessage(null);
      })
      .catch(error => {
        console.error('Error submitting order:', error);
        setErrorMessage('Failed to save order. Please try again.');
      })
      .finally(() => {
        setShowSummary(false);
        setShowOrderModal(true);
      });
  };

  return (
    <Layout>
      {/* this is my actual main contnent */}
      <div className="top-section">
        <h2>Create Order</h2>
        <div className="search-bar">
          <div className="input-wrapper">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" />
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>PRODUCT TYPES</th>
            <th>QUANTITY</th>
            <th>WASH TYPE</th>
            <th>PRICE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td className="product-cell">
                {product.image ? (
                  <img src={product.image} alt={product.name} />
                ) : (
                  <div className="placeholder-image" />
                )}
                <div>
                  <strong>{product.name || 'Unknown Product'}</strong>
                  <p>{product.description || 'No description'}</p>
                </div>
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={quantities[product._id] || 0}
                // JavaScript looks inside the object for a key matching the string 
                //in product._id.
// For example, if product._id === "1", it looks for quantities["1"].
                  onChange={e => handleQuantityChange(product._id, e.target.value)}
                />
              </td>
              <td className="wash-buttons">
                {washOptions.map(opt => (
                  <button
                    key={opt.name}
      className={washSelections[product._id]?.includes(opt.name) ? 'selected' : ''}
                    onClick={() => toggleWash(product._id, opt.name)}
                  >
                    <span className="wash-icon">{opt.icon}</span>
                  </button>
                ))}
              </td>
              <td>
                {quantities[product._id] > 0 && washSelections[product._id]?.length > 0
 ? `${quantities[product._id]} x ${washSelections[product._id].length} = ${calculatePrice(product._id)}`
                  : '—'}
              </td>
              <td>
                <button className="reset-btn" onClick={() => handleReset(product._id)}>
                  Reset
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="footer-buttons">
        <button className="cancel" onClick={handleCancel}>
          Cancel
        </button>
        <button className="proceed" onClick={handleProceed}>
          Proceed
        </button>
      </div>

      {showSummary && (
        <div className="summary-overlay">
          <div className="summary-container slide-in-right">
            <div className="summary-header">
              <h2>Summary</h2>
              <span className="close-btn" onClick={handleCloseSummary}>
                ×
              </span>
            </div>
            <div className="summary-details">
              <div className="store-info">
                <div className="store-address">
                  <select
                    value={storeLocation}
                    onChange={handleStoreLocationChange}
                    style={{
                      width: '200px',
                      borderTop: 'none',
                      borderLeft: 'none',
                      borderRight: 'none',
                      borderTopLeftRadius: '0',
                      borderTopRightRadius: '0',
                      padding: '4px',
                    }}
                  >
                    <option value="" disabled>
                      Select Store Location
                    </option>
                    {storeLocations.map(store => (
                      <option key={store.location} value={store.location}>
                        {store.location}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="store-address">
                  <label>Store Address:</label>
                  <p className="store-address-text">{storeAddress || 'Please select a store location'}</p>
                </div>
                <div className="phone">
                  <label>Phone:</label>
                  <p className="phone-text">{storePhone || 'Please select a store location'}</p>
                </div>
              </div>

              <div style={{ padding: '0 20px', marginBottom: '20px' }}>
                <h3 style={{ color: '#333', fontSize: '14px', padding: '8px', margin: '0' }}>
                  Order Details
                </h3>
                {products.map(product => {
                  if (quantities[product._id] > 0 && washSelections[product._id]?.length > 0) {
                    return (
                      <div
                        key={product._id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '8px',
                          borderBottom: '1px solid #ddd',
                          fontSize: '14px',
                          color: '#333',
                        }}
                      >
                        <span>{product.name}</span>
                        <span style={{ fontStyle: 'italic' }}>{washSelections[product._id].join(', ')}</span>
                        <span>
                          {quantities[product._id]} x{' '}
                          {washSelections[product._id]
                            .map(w => {
                              const option = washOptions.find(opt => opt.name === w);
                              return option.price;
                            })
                            .reduce((sum, price) => sum + price, 0)}{' '}
                          = <span style={{ color: '#5861AE' }}>{calculatePrice(product._id)}</span>
                        </span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              <div className="summary-footer">
                <div className="summary-row">
                  <span
                    style={{
                      display: 'inline-block',
                      borderBottom: '1px solid #ddd',
                      paddingLeft: '60px',
                      paddingRight: '20px',
                      marginLeft: '-60px',
                      marginRight: '-20px',
                      paddingBottom: '4px',
                    }}
                  >
                    Sub total:
                  </span>
                  <span>
                    <b>{getSubtotal()}</b>
                  </span>
                </div>
                <div className="summary-row">
                  <span>Pickup Charges:</span>
                  <span>
                    <b>{pickupCharges}</b>
                  </span>
                </div>
                <div className="summary-row total">
                  <span>TOTAL:</span>
                  <span>Rs {total}</span>
                </div>
              </div>

              <div className="address-section">
                <label>Address:</label>
                <div className="address-buttons">
                  {addresses.map((addr, index) => (
                    <button
                      key={index}
                      className={`address-btn ${addr.selected ? 'selected' : ''}`}
                      onClick={() => handleSelectAddress(index)}
                    >
                      {addr.address}
                    </button>
                  ))}
                  {showAddAddressForm ? (
                    <div
                      className="add-address-form"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginLeft: '10px' }}
                    >
                      <input
                        type="text"
                        value={newAddress}
                        onChange={e => setNewAddress(e.target.value)}
                        placeholder="Enter new address"
                        style={{
                          padding: '8px',
                          border: '1px solid #ddd',
                          borderRadius: '5px',
                          fontSize: '14px',
                        }}
                      />
                      <button
                        onClick={handleSaveNewAddress}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#5861AE',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        Save
                      </button>
                          <button
                        onClick={handleCancelNewAddress}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#ff0000',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                  
                    <span className="add-new"  onClick={handleAddNewAddress}>
                      ADD NEW
                    </span>
                  )}
                </div>
              </div>

              <div className="summary-actions">
                <button
                  className="confirm-btn"
                  onClick={handleConfirm}
                  disabled={!storeLocation || !storeAddress}
                  style={{
                    backgroundColor: !storeLocation || !storeAddress ? '#ccc' : '#5861AE',
                    cursor: !storeLocation || !storeAddress ? 'not-allowed' : 'pointer',
                    opacity: !storeLocation || !storeAddress ? 0.6 : 1,
                    color: !storeLocation || !storeAddress ? '#333' : '#fff',
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCancelModal && (
        <div className="summary-overlay">
          <div className="summary-container slide-in-right">
            <div className="summary-header">
              <h2>Cancel Order</h2>
              <span className="close-btn" onClick={handleCloseCancelModal}>
                ×
              </span>
            </div>
            <div className="summary-details">
              <p>Are you sure you want to cancel this order? All selections will be reset.</p>
              <div className="summary-actions">
                <button className="cancel-btn" onClick={handleCloseCancelModal}>
                  No, Go Back
                </button>
                <button className="confirm-btn" onClick={handleConfirmCancel}>
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showOrderModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <div className="modal-icon">
                <i className="fa-solid fa-check"></i>
              </div>
              <h2>Your order is placed successfully.</h2>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              <p>You can track the delivery in the "Orders" section.</p>
              <Link to="/orders">
                <button className="modal-btn" onClick={() => setShowOrderModal(false)}>
                  Go to Orders
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default CreateOrder;