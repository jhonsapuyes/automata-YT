
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

import { MiComponente1, MiComponente2 } from '../../../services/functions/modulo2.js';

export default function LoginWebViewModal({ webview, openVideo,videoData=[],numero }) {

  //const [time, setTime] = useState(10);
  return (
    <Modal visible={webview.visible} animationType="slide" >
      <View style={{ flex: 1 }}>
        <View style={{ 
          flexDirection: "row",paddingHorizontal:"3%",height:"7%",backgroundColor:"black",
          alignItems: "center", position: "absolute",  top: 0,left: 0,right: 0,
          zIndex: 10,elevation: 10, paddingTop:"6%"
        }}>
          {webview.bloqueado === false ? (
            <TouchableOpacity onPress={() => webview.onClose("end")}>
              <Text style={{ fontSize: 26, opacity: 1, color:"white"}}>
                Cerrar
              </Text>
            </TouchableOpacity>
          ) : null}

          {webview.bloqueado && !webview.automatic &&(
            <Text style={{ fontSize: 20,color:"white"}}>
              Espera <MiComponente1 duracion={12} onclose={webview.onClose}/>s
            </Text>
          )}
          {webview.bloqueado && webview.automatic &&(
            <Text style={{ fontSize: 20,color:"white"}}>
              Espera <MiComponente2 
              sincronizarAutomatizacion={webview.sincronizarAutomatizacion}
              onTimeSincronized={webview.sincronizarTime}
              duracion={webview.automatiTime} 
              subDuracion={12} 
              onclose={webview.onClose} 
              openVideo={openVideo} 
              videoData={videoData}
              numero={numero}
              />s
            </Text>
          )}
        </View>

        <WebView
            key={webview.url} // 👈 esto soluciona el bug
            source={{ uri: webview.url }}
            javaScriptEnabled
            domStorageEnabled
            sharedCookiesEnabled
            thirdPartyCookiesEnabled
            startInLoadingState
            style={{ flex: 1}}
          />

          <View style={{ backgroundColor:"black",height:"6%"}}></View>
      </View>
    </Modal>
  );
}


