import { StyleSheet } from 'react-native';

import { useState } from 'react';

import { resources } from '../../services/synchronize/controllers/main.js';

import AuthScreen from '../components/initComponents/authZona.js';
import LoginScreen from '../components/initComponents/loginApp.js';


export default function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Estado para controlar el login
  const [userD, setUserD] = useState([]); // Estado para controlar el login
  const [btnuse, setBtnuse] = useState(false);

    const login= async (pt1,pt2) =>{
      let respData= await resources.login(pt1,pt2);
      console.log(respData)
      if(respData == false){
        console.log("exit")
      }
      else if(respData[5] == true){
        console.log("next",respData)
      }
    }
    //login("anderson","pass")

    const listVideos= async (pt1) =>{
      let respData= await resources.listarVideos(pt1);
      console.log(respData)
      if(respData == null){
        console.log("EMPTY LIST")
      }
      else{
        console.log("next",respData)
      }
    }
    //listVideos("and1")

    const publicarVideo= async (pt1,pt2) =>{
      let respData= await resources.saveVideos(pt1,pt2);
      console.log(respData)
    }
    //publicarVideo("https://youtu.be/E3KPq4JreVY","and1")

    const borrarvideo= async (pt1,pt2) =>{
      let respData= await resources.eraseVideo(pt1,pt2);
      console.log(respData)
    }
    //borrarvideo("https://youtu.be/E3KPq4JreVYs","and1")

  const handleLoginSuccess = async (data) => {
    setUserD(data)
    setIsLoggedIn(data[2]);
  };

  const ss= (pt1)=>{
    console.log(pt1)
  }

  if (isLoggedIn == false) {
    return (
      <LoginScreen onLoginSuccess={handleLoginSuccess} />
    );
  }
  else if(isLoggedIn == true){
    return (
        <AuthScreen onpush={(nuevo) => ss(nuevo)} data={btnuse}/>
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
