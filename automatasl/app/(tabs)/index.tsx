import { StyleSheet, Text, View } from 'react-native';

import { resources } from '../../services/synchronize/controllers/main.js';


export default function HomeScreen() {

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

  return (
    <View>
      <View><Text>header </Text></View>
      <View><Text>session</Text></View>
      <View><Text>footer</Text></View>
    </View>
  );
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
