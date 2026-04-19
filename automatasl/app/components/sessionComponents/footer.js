

import { StyleSheet, View } from "react-native";
import BtnPage from '../subcomponents/footer/btnSession';


export default function Footer({cambiarPagina}) {
  
  return (
    <View style={styles.footerZona}>
      <BtnPage img={require("../../../imgs/ojo gris.jpeg")} onSession={() => cambiarPagina("view")}/>
      <View style={{marginHorizontal:"5%"}}></View>
      <BtnPage img={require("../../../imgs/bocina gris.jpeg")} onSession={() => cambiarPagina("campaña")}/>
    </View>
  );
}

const styles = StyleSheet.create({
  footerZona: {
      flexDirection: "row",
      width: "100%",
      height:"100%",
      alignItems: "center",
      justifyContent: "center",
  },
});