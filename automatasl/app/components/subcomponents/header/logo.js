

import { Image, StyleSheet } from "react-native";

export default function LogoHeader({ onClose }) {
    return (
        <Image source={require("../../../../imgs/logo app.png")} style={styles.logoImg} resizeMode="cover"/>
    );
}

const styles = StyleSheet.create({
  logoImg: {
    width: "80%", 
    aspectRatio: 5
  },
});