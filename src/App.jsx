import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Auth from './pages/Auth'
import Catalog from './pages/Catalog'
import SongDetail from './pages/SongDetail'
import VinylDetail from './pages/VinylDetail'
import ProviderDashboard from './pages/ProviderDashboard'
import Cart from './pages/Cart'
import AddVinyl from './pages/AddVinyl'
import MyPurchases from './pages/MyPurchases'
import MySales from './pages/MySales'
import { supabase } from './lib/supabaseClient'
import Profile from "./pages/Profile";

export default function App() {
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)

  function addToCart(item) {
    setCart(prev => [...prev, item])
    alert("Añadido al carrito")
  }

  // ✔ Carga el usuario + su perfil (mejorado)
  useEffect(() => {
    async function fetchUser() {
      const { data: auth } = await supabase.auth.getUser()
      const authUser = auth?.user

      if (authUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authUser.id)
          .single()

        setUser({ ...authUser, ...profile })
      }
    }

    fetchUser()
  }, [])

async function logout() {
  await supabase.auth.signOut();
  window.location.href = "/"; // redirigir al inicio
}

  return (
    <BrowserRouter>

    <nav>
  <Link to="/">Inicio</Link>

  {user ? (
    <>
      {" | "}
      <Link to="/profile">Mi Perfil</Link>
      {" | "}
      <Link to="/my-purchases">Mis Compras</Link>
      {" | "}
      <Link to="/provider">Proveedor</Link>
      {" | "}
      <Link to="/cart">Carrito ({cart.length})</Link>
      {" | "}
      <button onClick={logout} style={{ marginLeft: "10px" }}>
        Cerrar sesión
      </button>
    </>
  ) : (
    <>
      {" | "}
      <Link to="/auth">Login</Link>
      {" | "}
      <Link to="/cart">Carrito ({cart.length})</Link>
    </>
  )}
</nav>



      <Routes>
        <Route path="/" element={<Catalog addToCart={addToCart} />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/song/:id" element={<SongDetail addToCart={addToCart} />} />
        <Route path="/vinyl/:id" element={<VinylDetail addToCart={addToCart} />} />
        <Route path="/provider" element={<ProviderDashboard user={user} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} user={user} />} />
        <Route path="/add-vinyl" element={<AddVinyl user={user} />} />
        <Route path="/my-purchases" element={<MyPurchases user={user} />} />
        <Route path="/my-sales" element={<MySales user={user} />} />
        <Route path="/profile" element={<Profile user={user} />} />


      </Routes>

    </BrowserRouter>
  )
}
