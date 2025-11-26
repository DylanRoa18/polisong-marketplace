import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { fetchProviderVinyls } from '../api/vinyls'

export default function ProviderDashboard() {
  const [providerId, setProviderId] = useState(null)
  const [vinyls, setVinyls] = useState([])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setProviderId(data.user.id)
    })
  }, [])

  useEffect(() => {
    if (providerId) fetchProviderVinyls(providerId).then(setVinyls)
  }, [providerId])

  return (
    <div>
      <h1>Panel del Proveedor</h1>

      <h3>Mis Vinilos</h3>
      {vinyls.map(v => (
        <p key={v.id}>{v.title} - ${v.price}</p>
      ))}
    </div>
  )
}
