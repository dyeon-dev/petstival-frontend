import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CheckoutPage } from './PaymentsPage/CheckoutPage';
import { SuccessPage } from './PaymentsPage/SuccessPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
