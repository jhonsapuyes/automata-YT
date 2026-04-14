
import { Alert } from 'react-native';
import { supabase } from '../conexionSuba.js';


const loginUser = async (usuario,password) => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('name', usuario) // 👈 CORREGIDO
    .eq('password', password);

  if (error) {
    console.log("Error Supabase:", error);
    alert("Error en la consulta");
    return null;
  }

  if (!data || data.length === 0) {
    alert("No hay datos");
    return false;
  }

  let dataOut=[
    data[0]["plaforma"],data[0]["id"],data[0]["name"],
    data[0]["password"],data[0]["usuarioType"],true,
    data[0]["userState"],data[0]["plaforma"],data[0]["deviceId"]
  ];

  return dataOut;
};

    const ctrlUser = async () => {
    console.log("ctrlUser - main.js")
};

const getvideos = async (pt1) => {
    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const obtenerVideos = async (ptr1) => {
        const { data, error } = await supabase
            .from('automatayt')
            .select('*')
            .eq('plataforma', ptr1)
        if (error) {
            console.log("Error:", error);
            return null;
        }
        const urls = data.map(item => item.urlVideo);
        return shuffle(urls);
    };
    return obtenerVideos(pt1);
};

const postvideos = async (pt1,pt2) => {
    try {
        const { error } = await supabase
            .from('automatayt')
            .insert([
            {
                urlVideo: pt1,
                plataforma: pt2
            }
            ]);

        if (error) {
            console.log("Error subiendo:", error.message);
            return false;
        }

        console.log("Video guardado en Supabase 🚀");
        return true;

    } 
    catch (e) {
        console.log("Error general:", e.message);
        return false;
    }
};

const deleteVideos = async (pt1,pt2) => {
    const verifyData= async (ptr1,ptr2) =>{
        const { data, error } = await supabase
            .from('automatayt')
            .select('id')
            .eq('urlVideo', ptr1)
            .eq('plataforma', ptr2);

        if (error) {
            console.log("Error Supabase:", error);
            Alert.alert("Error en la consulta");
            return null;
        }

        if (!data || data.length === 0) {
            Alert.alert("No existe");
            return false;
        }
        else if(data.length > 0){
            return data;
        }
    }
    const result = await verifyData(pt1, pt2);

    const borrarData = async (id, url, plataforma) => {
        try {
            const { data, error } = await supabase
            .from('automatayt')
            .delete()
            .eq('id', id)
            .eq('urlVideo', url)
            .eq('plataforma', plataforma)
            .select();

            if (error) {
            console.log("Error:", error);
            return false;
            }

            if (!data || data.length === 0) {
            console.log("No se eliminó nada");
            return false;
            }

            console.log("Eliminado:", data);
            return true;

        } catch (e) {
            console.log("Error general:", e);
            return false;
        }
    };

    let respBorrar;
    try {
        if (!result || result.length === 0) {
            console.log("No hay ID para borrar");
            return false;
        }
        const id = result[0].id;
        respBorrar = await borrarData(id, pt1, pt2);
    } 
    catch (e) {
        console.log("Error al borrar:", e);
        return false;
    }  
    return respBorrar;
};



export const resources = {
  login: loginUser,
  controlUsers: ctrlUser,
  listarVideos: getvideos,
  saveVideos: postvideos,
  eraseVideo: deleteVideos
};
