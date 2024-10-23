import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CheckoutPage } from './PaymentsPage/CheckoutPage';
import { SuccessPage } from './PaymentsPage/SuccessPage';
import { FailPage } from './PaymentsPage/FailPage';
import { useState } from 'react';
import AppPages from './routes/AppPages';
import './App.css';

function App() {
  return <AppPages />;
}

export default App;
