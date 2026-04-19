
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { resources } from '../../../../../services/synchronize/controllers/main.js';


export default function PageCampaña({ onsave }) {
  const [nombre, setNombre] = useState("");
  const [listData, setListData] = useState([]);

  const pedirdatos = async () => {
    const respData = await resources.listarVideos("and1");

    if (!respData) {
      console.log("EMPTY LIST");
      setListData([]);
      return;
    }

    setListData(respData);
  };

  const agregar = async () => {
    if (!nombre.trim()) return;

    if (typeof onsave.onsaved === "function") {
      await onsave.onsaved({ url: nombre, platform: "and1" }); // 👈 CLAVE
    }

    setNombre("");
    Keyboard.dismiss();

    await pedirdatos(); // ahora sí trae el dato nuevo
  };

  const eliminarItem = async (data) => {
    await resources.eraseVideo(data.url,data.platform);
    await pedirdatos()
  }

  useEffect(() => {
    pedirdatos();
  }, []);
  
  return (
    <View  style={{backgroundColor:"red",width:"100%", height:"100%", paddingTop:"2%"}}>
      
      <View style={{backgroundColor: "#ffffff"}}>
        <View style={{padding: 0,backgroundColor: "#8271711e",margin: 0,alignItems: "center",borderRadius: 20}}>
          
          <TextInput
            placeholder="Nombre de la campaña"
            value={nombre}
            onChangeText={setNombre}
            style={{width:"90%",textAlign: "center",borderWidth: 2,borderColor: "red",borderRadius: 8,padding: 10,marginVertical: 14,}}
          />

          <TouchableOpacity
            onPress={agregar}
            style={{width:"40%",backgroundColor: "red",padding: 12,borderRadius: 8,alignItems: "center",marginBottom:"3%"}}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Agregar campaña
            </Text>
          </TouchableOpacity>

        </View>
      </View>

      <View style={{backgroundColor:"red",width:"100%", height:"80%", paddingHorizontal:14}}>
        <Text>{listData.length}</Text>
        
        <FlatList
          data={listData}
          keyExtractor={(item, index) => index.toString()} // 👈 clave única
          renderItem={({ item }) => (
            <View
              style={{
                alignItems: "center",
                padding: 8,
                marginVertical: 5,
                backgroundColor: "#eee",
                borderRadius: 8,
                flexDirection:"row"
              }}
            >
              <Text style={{ color: "blue",fontSize:18, width:"90%" }}>{item}</Text>
              <TouchableOpacity
                onPress={() => eliminarItem({url:item,platform:"and1"})}
                style={{
                  width:"10%",
                  marginLeft: "auto",
                  backgroundColor: "#e53935",
                  paddingVertical:8,
                  borderRadius: 8,
                  alignItems: "center"
                }}
              >
                <Ionicons name="trash" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
        />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
    campañaZona: {
        width:"100%", 
        height:"100%",
        backgroundColor:"green"
    }
});