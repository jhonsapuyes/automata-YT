
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function BtnAction({ onAction }) {
  return (
    <TouchableOpacity style={styles.btnAction}
      onPress={() => {onAction(["https://www.youtube.com/",false,true])}}>
      <Text  style={styles.btntext}>
        Suscribir
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnAction: {
    width:"50%",
    borderColor: "red",
    borderWidth: 3,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btntext:{
    fontSize: 35, 
    color: "red" 
  }
});