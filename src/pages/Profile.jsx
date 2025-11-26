import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Profile({ user }) {
  const [profile, setProfile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (!user) return;
    loadProfile();
  }, [user]);

  async function loadProfile() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) console.log(error);
    else {
      setProfile(data);
      setAvatarUrl(data.avatar_url);
    }
  }

async function uploadPhoto(e) {
  try {
    setUploading(true);

    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop(); // extrae extension
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = fileName;

    // Subir archivo
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    // Obtener URL pública
    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;

    // Guardar en BD
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", user.id);

    if (updateError) throw updateError;

    setAvatarUrl(publicUrl);
    alert("Foto actualizada correctamente");
  } catch (err) {
    console.error(err);
    alert("Error cargando imagen");
  } finally {
    setUploading(false);
  }

  await supabase.storage
  .from("avatars")
  .upload(filePath, file, {
    upsert: true,
    contentType: file.type
  });

}


  if (!user) return <div>No has iniciado sesión</div>;

  return (
    <div className="container">
      <h1>Mi Perfil</h1>

      {/* FOTO DE PERFIL */}
      <div style={{ marginBottom: "20px" }}>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #1a3cff",
            }}
          />
        ) : (
          <div
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              background: "#ddd",
              border: "3px solid #1a3cff",
            }}
          />
        )}

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={uploadPhoto}
            disabled={uploading}
          />
        </div>
      </div>

      {/* INFO DEL PERFIL */}
      {profile && (
        <div className="card">
          <p><strong>ID:</strong> {profile.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Nombre:</strong> {profile.full_name || "Sin nombre"}</p>
        </div>
      )}
    </div>
  );
}
