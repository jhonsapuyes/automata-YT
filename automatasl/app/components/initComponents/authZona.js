
import { StyleSheet, View } from 'react-native';

import Footer from '../sessionComponents/footer.js';
import Header from '../sessionComponents/header.js';
import Session from '../sessionComponents/session.js';

const AuthScreen = ({closeApp, cambiarPagina,pageUse, listVideos,numero,openVideo, videoNext,suscribir,automatizar,onStop,automataAtivo,ctrlBtns, webview,pageCampaña}) => {
  return (
    <View style={styles.authZona}>
        <View style={styles.marcaTop}></View>

        <View style={styles.header}>
            <Header onClose={closeApp}/>
        </View>

        <View style={styles.session}>
            <Session 
                onStop={onStop}
                ptPage={pageUse}
                ptVideos={listVideos}
                numero={numero}
                openVideo={openVideo}
                videoNext={videoNext}
                suscribir={suscribir}
                automatizar={automatizar}
                automataAtivo={automataAtivo}
                ctrlBtns={ctrlBtns}
                webview={webview}
                pageCampaña={pageCampaña}
            />
        </View>

        <View style={styles.footer}>
            <Footer cambiarPagina={cambiarPagina}/>
        </View>
        <View style={styles.marcaBotton}></View>
    </View>
  );
};

const styles = StyleSheet.create({
    authZona: {
        backgroundColor:"green",
        flexDirection: "column",
        width: "100%",
        height:"100%"
    },
    header: {
        backgroundColor:"gold", 
        width:"100%", 
        height:"7%"
    },
    session: {
        backgroundColor:"blue", 
        width:"100%", 
        height:"76%"
    },
    footer: {
        backgroundColor:"silver", 
        width:"100%", 
        height:"7%",
        paddingVertical:"10"
    },
    marcaTop: {
        backgroundColor:"red",
        width: "100%",
        height:45
    },
    marcaBotton: {
        backgroundColor:"red",
        width: "100%",
        height:45,
        position:"absolute",
        bottom:0
    },
});

export default AuthScreen;