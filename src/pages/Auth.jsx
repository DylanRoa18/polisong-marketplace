import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  // -----------------------------
  // LOGIN (Iniciar Sesión)
  // -----------------------------
  async function signIn() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage("Sesión iniciada correctamente.")
  }

  // -----------------------------
  // REGISTRO (Crear Cuenta)
  // -----------------------------
  async function signUp() {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      setMessage(error.message)
      return
    }

    const user = data.user

    if (!user) {
      setMessage("Cuenta creada. Revisa tu correo.")
      return
    }

    // Crear perfil automáticamente en la tabla profiles
    const { error: profileError } = await supabase.from('profiles').upsert({
      id: user.id,
      email: user.email,
      full_name: '',
      is_provider: false
    })

    if (profileError) {
      setMessage("Error creando el perfil: " + profileError.message)
      return
    }

    setMessage("Cuenta creada y perfil registrado correctamente.")
  }

  // -----------------------------
  // UI
  // -----------------------------
 return (
  <div className="container">
    <h2>Acceder</h2>

    <form>
      <input
        placeholder="Correo"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        placeholder="Contraseña"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

     <div className="form-buttons">
  <button type="button" onClick={signIn}>Iniciar sesión</button>
  <button type="button" className="btn-secondary" onClick={signUp}>Crear cuenta</button>
     </div>


      {message && <p className="alert">{message}</p>}
    </form>
  </div>
)

}
