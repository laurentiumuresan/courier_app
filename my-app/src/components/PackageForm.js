import React, { useState } from 'react';
import { createPackage } from '../services/api';

function PackageForm() {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [payOnDelivery, setPayOnDelivery] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPackage({ deliveryAddress, payOnDelivery });
      alert('Package created successfully!');
    } catch (error) {
      console.error("Error creating package:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder="Delivery Address" required />
      <label>
        Pay on Delivery
        <input type="checkbox" checked={payOnDelivery} onChange={(e) => setPayOnDelivery(e.target.checked)} />
      </label>
      <button type="submit">Create Package</button>
    </form>
  );
}

export default PackageForm;
