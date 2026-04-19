import { StyleSheet } from "react-native";

import PageCampaña from "../subcomponents/session/pages/pageCampaña.js";
import PageView from "../subcomponents/session/pages/pageView.js";


export default function Session({ptPage, ptVideos,numero,openVideo, videoNext,suscribir,automatizar,onStop,automataAtivo,ctrlBtns, webview,pageCampaña}) {
    if (ptPage == "campaña") {
        return (
          <PageCampaña onsave={pageCampaña}/>
        );
    }
    else if(ptPage == "view" || ptPage == true){
        return (
            <PageView
                videos={ptVideos}
                numero={numero}
                openVideo={openVideo}
                videoNext={videoNext}
                suscribir={suscribir}
                automatizar={automatizar}
                onStop={onStop}
                automataAtivo={automataAtivo}
                ctrlBtns={ctrlBtns}
                webview={webview}
            />
        );
    }  
};

const styles = StyleSheet.create({
    sesionZona: {
        width:"100%", 
        height:"100%" 
    }
});