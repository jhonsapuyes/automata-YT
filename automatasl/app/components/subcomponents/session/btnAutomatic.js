
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function BtnAutomatic({videoData,numero,onAction,onStop,automataAtivo,onCtrlBtns }) {
  const url = videoData?.[numero];
  if (!automataAtivo) {
    return (
      <TouchableOpacity
        style={styles.btnAction}
        onPress={() => {
          onAction([url, true, false,true]);
          onCtrlBtns(true)
        }}
      >
        <Text style={styles.btntext}>
          Automatizacion
        </Text>
      </TouchableOpacity>
    );
  }
  else if (automataAtivo) {
    return (
      <TouchableOpacity
        style={styles.btnStop}
        onPress={() => {
          onCtrlBtns(false)
          onStop(false);
        }}
      >
        <Text style={styles.btntext2}>
          Detener Automatizacion
        </Text>
      </TouchableOpacity>
    );
  }


}

const styles = StyleSheet.create({
  btnAction: {
    width:"65%",
    borderColor: "red",
    borderWidth: 3,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
    btnStop: {
    width:"85%",
    borderColor: "red",
    borderWidth: 3,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btntext:{
    fontSize: 35, 
    color: "red" 
  },
    btntext2:{
    fontSize: 30, 
    color: "red" 
  }
});