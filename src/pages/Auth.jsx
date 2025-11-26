import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function signUp() {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage(error.message)
    else setMessage("Cuenta creada. Revisa tu correo.")
  }

  async function signIn() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) setMessage(error.message)
    else setMessage("Sesión iniciada.")
  }

  return (
    <div>
      <h2>Acceder</h2>

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

      <button onClick={signIn}>Iniciar sesión</button>
      <button onClick={signUp}>Crear cuenta</button>

      <p>{message}</p>
    </div>
  )
}
