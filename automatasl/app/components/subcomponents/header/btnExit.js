
import { Image, StyleSheet, TouchableOpacity } from "react-native";



export default function BtnExit({ onClose }) {
    return (
        <TouchableOpacity style={styles.btnExit} onPress={() => {onClose(false)}} activeOpacity={0.7}>
            <Image source={require("../../../../imgs/shutdown.png")} style={styles.btnimg} resizeMode="contain"/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  btnExit: {
    backgroundColor: "red",
    width: "20%"
  },
  btnimg:{
    width: "100%",
    height:"85%",
    paddingVertical:"40%"
  }
});