import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PropertyList from './pages/PropertyList';
import PropertyDetail from './pages/PropertyDetail';
import Login from './pages/Login';
import NewProperty from './pages/NewProperty';

export default function App(){
  return (
    <BrowserRouter>
      <header style={{padding:10}}>
        <Link to="/">Home</Link> | <Link to="/add">Add Property</Link> | <Link to="/login">Login</Link>
      </header>
      <main style={{padding:20}}>
        <Routes>
          <Route path="/" element={<PropertyList/>} />
          <Route path="/property/:id" element={<PropertyDetail/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/add" element={<NewProperty/>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
