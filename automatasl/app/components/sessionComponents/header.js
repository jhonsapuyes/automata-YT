
import { StyleSheet, View } from "react-native";
import BtnExit from "../subcomponents/header/btnExit.js";
import LogoHeader from "../subcomponents/header/logo.js";

export default function Header({ onClose }) {
  return (
    <View style={styles.barra}>
      <BtnExit onClose={onClose}/>

      <LogoHeader/>
    </View>
  );
}

const styles = StyleSheet.create({
  barra: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
});