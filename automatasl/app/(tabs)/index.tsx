import { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import AuthScreen from '../components/initComponents/authZona.js';
import LoginScreen from '../components/initComponents/loginApp.js';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { resources } from '../../services/synchronize/controllers/main.js';
import { actualizarDataUser } from '../../services/synchronize/ctrl_user.js';


export default function HomeScreen() {

  const handleSaveVideo= async (saveData) =>{
    let respSave= await resources.saveVideos(saveData.url,saveData.platform)
    if(respSave == true){
      console.log("guardado","index")
    }
    else if(respSave == false){
      console.log("no gurdado","index")
    }
  }

  const tAutomatizedH= 1
  const tAutomatizedSecond= (tAutomatizedH *60)*60
  const [timeView, setTimeView] = useState(12);
  const [timeAutomatic, setTimeAutomatic] = useState(tAutomatizedSecond);
  const [activo, setActivo] = useState(false);
  const activoRef = useRef(activo);
  useEffect(() => {
    activoRef.current = activo;
  }, [activo]);

  const [modalWebview, setModalWebview] = useState(false);
  const [bloqueado, setBloqueado] = useState(true);
  const [urlWebview, seturlWebview] = useState(true);
  const [automatic, setAutomatic] = useState(true);
  const [viewBtn, setViewBtn] = useState(false);
  const handleWebviewClose= (situacion) =>{
    if(situacion == "end"){
      setModalWebview(false);
      ctrlBtns(false)
    }
    else if(situacion == "sessions"){
      setModalWebview(false);
    }
  }
  const ctrlBtns= (situacion) =>{
    setViewBtn(situacion)
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar el login
  const [userD, setUserD] = useState([]); // Estado para controlar el login
  const handleLoginSuccess = async (dt1,dt2) => {
    const login= async (pt1,pt2) =>{
      let respData= await resources.login(pt1,pt2);
      return respData;
    }
    const handleLogin = async (pt1,pt2) => {
      let datalogin= await login(pt1,pt2)  

      const idDevice = await AsyncStorage.getItem('device_id');

      // Aquí puedes agregar tu lógica de autenticación real
      if (pt1.trim() === '' || pt2.trim() === '') {
        Alert.alert('Error', 'Por favor, completa todos los campos');
        return;
      }
      else if(datalogin == false || datalogin == undefined){
        Alert.alert('Error', 'Datos No Existen');
        return;
      }
      else if(datalogin[5] == true && datalogin[0] == "and1"){
        if(idDevice == datalogin[7] && datalogin[6] == "activada"){
          let respD=[datalogin[2],datalogin[3],datalogin[5]]
            setUserD(respD)
            setIsLoggedIn(datalogin[5]);
        }
        else if(datalogin[6] == "desactivada"){
          let respD=[datalogin[2],datalogin[3],datalogin[5]]
          setUserD(respD)
          setIsLoggedIn(datalogin[5]);
          const idDevice = await AsyncStorage.getItem('device_id');

          actualizarDataUser("activada",idDevice,datalogin[1])
        }
        else if(idDevice != datalogin[8] && datalogin[6] == "activada"){
          Alert.alert('Error', 'Cuenta Activada');        
        }
      }  
      else{
        Alert.alert(JSON.stringify(datalogin), 'Datos No Existen');
      }  
    };
    handleLogin(dt1,dt2)
  };

  const closeApp = async (pt1) => {
    let getUserD= await resources.login(userD[0],userD[1]);
    let ptuser= getUserD[1];
    const idDeviceUse = await AsyncStorage.getItem('device_id');
    await actualizarDataUser("desactivada",idDeviceUse,ptuser)
    setIsLoggedIn(pt1);
    setUserD([])
  }

  const [numero, setNumero] = useState(0);
  const [datos, setDatos] = useState([]);
  useEffect(() => {
    if (isLoggedIn) {
      cargarDatos();
    }
  }, [isLoggedIn]);
  const cargarDatos = async () => {
    const listVideos= async (pt1) =>{
      let respData= await resources.listarVideos(pt1);
      console.log(respData,"index")
      if(respData == null){
        console.log("EMPTY LIST")
      }
      else{
        //console.log(respData,"index")
        return respData;
      }
    }
    const resultado = await listVideos("and1");
    setDatos(resultado);
  };

  const [pageUse, setPageUse] = useState(true);
  const cambiarPagina = (valor) => {
    setPageUse(valor);
    cargarDatos();
  };

  const abrirVideo= (url,automatic,suscribir,activo)=>{
    console.log(url,automatic,suscribir,activo,"indexx")
    if(suscribir == true && automatic == false ){
      setModalWebview(true)
      setBloqueado(false)
      seturlWebview(url);
      setAutomatic(false)
    }
    else if(suscribir == false && activo == true){
      setActivo(true)
      setModalWebview(true)
      setBloqueado(true)
      seturlWebview(url);
      setAutomatic(true)
      videoNext(1)
    }
    else if(suscribir == false && activo == false){
      setActivo(true)
      setModalWebview(true)
      setBloqueado(true)
      seturlWebview(url);
      setAutomatic(false)
      videoNext(1)
    }
  };
  const videoNext= (nextN)=>{
    if(numero == (datos.length-1)){
      setNumero(0)
    }
    else if(numero < (datos.length-1)){
      setNumero(numero+nextN)
    }
    console.log(datos.length-1, numero,nextN,"index")
  };
  const suscribir= (dato)=>{
    abrirVideo(dato[0],dato[1],dato[2])
    console.log(dato,"index")
  }
  const automatizar= (dato)=>{
    abrirVideo(dato[0],dato[1],dato[2],dato[3])
    console.log(dato,"index")
  }
  const stopAutomatizar= (dato)=>{
    setActivo(dato)
  }
  const sincronizarTimeAutomatizacion= (dato)=>{
    if(dato == 0){
      setTimeAutomatic(tAutomatized)
    }
    else if(dato > 0){
      setTimeAutomatic(dato)
    }
  }
  const sincronizarAutomatizacion = (data) => {
    if (activoRef.current === true) {
      abrirVideo(data, true, false, true);
    } 
    else {
      setTimeAutomatic(tAutomatized)
      console.log("⛔ automatización detenida");
    }
  };



  if (isLoggedIn == false) {
    return (
      <LoginScreen onLoginSuccess={handleLoginSuccess} />
    );
  }
  else if(isLoggedIn == true){
    return (
      <View>
        <AuthScreen 
          closeApp={closeApp}
          cambiarPagina={cambiarPagina} 
          pageUse={pageUse}
          listVideos={datos}
          numero={numero}
          openVideo={abrirVideo}
          videoNext={videoNext}
          suscribir={suscribir}
          automatizar={automatizar}
          onStop={stopAutomatizar}
          automataAtivo={viewBtn}
          ctrlBtns={ctrlBtns}
          webview={{ 
            visible: modalWebview, bloqueado:bloqueado, url:urlWebview, onClose:handleWebviewClose, 
            time:timeView, automatiTime:timeAutomatic,sincronizarTime:sincronizarTimeAutomatizacion,
            automatic:automatic,sincronizarAutomatizacion:sincronizarAutomatizacion
          }}
          pageCampaña={{onsaved:handleSaveVideo}}
        />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
