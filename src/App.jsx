import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Auth from './pages/Auth'
import Catalog from './pages/Catalog'
import SongDetail from './pages/SongDetail'
import VinylDetail from './pages/VinylDetail'
import ProviderDashboard from './pages/ProviderDashboard'
import Cart from './pages/Cart'
import { supabase } from './lib/supabaseClient'

export default function App() {
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)

  function addToCart(item) {
    setCart(prev => [...prev, item])
    alert("Añadido al carrito")
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Inicio</Link> |{" "}
        <Link to="/auth">Login</Link> |{" "}
        <Link to="/cart">Carrito ({cart.length})</Link> |{" "}
        <Link to="/provider">Proveedor</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Catalog addToCart={addToCart} />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/song/:id" element={<SongDetail addToCart={addToCart} />} />
        <Route path="/vinyl/:id" element={<VinylDetail addToCart={addToCart} />} />
        <Route path="/provider" element={<ProviderDashboard />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} user={user} />} />
      </Routes>
    </BrowserRouter>
  )
}
