
import { supabase } from './conexionSuba.js';


export const actualizarusuariosLite = async () => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*');

  if (error) {
    console.log("Error Supabase:", error);
    return;
  }

  try {
    await db.execAsync("BEGIN;");

    // 🔥 1. Obtener IDs remotos
    const idsRemotos = data.map(u => u.id);

    // 🔥 2. Eliminar los que ya no existen en Supabase
    if (idsRemotos.length > 0) {
      const placeholders = idsRemotos.map(() => "?").join(",");
      await db.runAsync(
        `DELETE FROM usuarios WHERE id NOT IN (${placeholders})`,
        idsRemotos
      );
    }

    // 🔥 3. Insertar o actualizar
    const query = `
      INSERT OR REPLACE INTO usuarios 
      (id, name, password, usuarioType, plaforma, pendiente_sync, userState)
      VALUES (?, ?, ?, ?, ?, 0, ?);
    `;

    for (const user of data) {
      await db.runAsync(query, [
        user.id,
        user.name,
        user.password,
        user.usuarioType,
        user.plaforma,
        user.userState
      ]);
    }

    await db.execAsync("COMMIT;");
  } catch (e) {
    await db.execAsync("ROLLBACK;");
    console.log("Error sync:", e);
    throw e;
  }
};