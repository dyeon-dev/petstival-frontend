import React from 'react'
import axios from 'axios';

async function PaymentsPage() {
    try {
        const response = await axios.post(
          '/api/edgeTest',
          {
            name: 'Functions',
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      
        const data = response.data;
        console.log('Response data:', data);
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
      }

  return (
    <div>paymentsPage</div>
  )
}

export default PaymentsPage