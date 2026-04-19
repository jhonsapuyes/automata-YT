
import { StyleSheet, View } from "react-native";

import BtnAction from "../btnAction.js";
import BtnAutomatic from "../btnAutomatic.js";
import BtnNext from "../btnNext.js";

import VideoPreview from "../videoPreview.js";

import LoginWebViewModal from "../../../sessionComponents/modalWebView.js";


export default function PageView({videos,numero,openVideo, videoNext,suscribir,automatizar,onStop,automataAtivo,ctrlBtns, webview}) {
  return (
    <View style={styles.viewZona}>

      <View>
        <LoginWebViewModal 
          webview={webview}
          openVideo={openVideo}
          videoData={videos}
          numero={numero}
        />
      </View>

      <View style={styles.marcaTop}></View>

      <View style={styles.session1}>
        <VideoPreview
          videoData={videos}
          numero={numero}
          openVideo={openVideo}
        />
      </View>

      <View style={styles.session2}>
        <BtnAction onAction={suscribir} />
        <View style={{marginHorizontal:"2%"}}></View>
        <BtnNext onNext={videoNext} />
      </View>

      <View style={styles.session3}>
        <BtnAutomatic 
          videoData={videos} 
          numero={numero} 
          onAction={automatizar} 
          onStop={onStop}
          automataAtivo={automataAtivo}
          onCtrlBtns={ctrlBtns}
        />
      </View>

      <View style={styles.marcaBotton}></View>

    </View>
  );
}

const styles = StyleSheet.create({
    viewZona: {
        width:"100%", 
        height:"100%",
        backgroundColor:"purple"
    },
    session1: {
        backgroundColor:"black",
        width:"100%", 
        height:"75%"
    },
    session2: {
        backgroundColor:"white",
        width:"100%", 
        height:"11%",
        flexDirection: "row", 
        alignItems: "center",
        justifyContent: "center",
    },
    session3: {
        backgroundColor:"white",
        width:"100%", 
        height:"10%",
        justifyContent: "center",
        alignItems: "center"
    },
    marcaTop: {
        backgroundColor:"#a03131",
        width:"100%", 
        height:"2%"
    },
    marcaBotton: {
        backgroundColor:"#a03131",
        width:"100%", 
        height:"2%",
        position:"absolute",
        bottom:0
    },
});