
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function BtnNext({ onNext }) {
  return (
    <TouchableOpacity style={styles.btnNext}
      onPress={() => {onNext(1)}}>
      <Text  style={styles.btntext}>
        Siguiente
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnNext: {
    width:"40%",
    borderColor: "red",
    borderWidth: 3,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btntext:{
    fontSize: 32, 
    color: "red" 
  }
});