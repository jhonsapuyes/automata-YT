
import { useEffect, useRef, useState } from "react";
import { Text } from "react-native";

export const MiComponente1 = ({ duracion = 12, onclose = () => {} }) => {
  const [tiempo, setTiempo] = useState(duracion);
  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempo((prev) => {
        if (prev <= 0) {
            return duracion;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [duracion]);

  useEffect(() => {
    if (tiempo === 0) {
      onclose("end");
    }
  }, [tiempo, onclose]);


  return <Text   style={{
    position: "absolute",
    top: 50,          // ajusta según tu layout
    alignSelf: "center",
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    zIndex: 9999,     // 🔝 por encima de todo
    elevation: 10,    // 📱 importante en Android
  }}>{tiempo}</Text>;
};


export function MiComponente2({
  sincronizarAutomatizacion,
  onTimeSincronized,
  duracion,
  subDuracion,
  onclose = () => {},
  openVideo,
  videoData=[],
  numero
}) {

  const getRandomSubTiempo = () => {
    let aleatorio1 = Math.floor(Math.random() * 10)+1; // 0–9
    let aleatorio2 = Math.floor(Math.random() * 20) + 26; // 26–45

    let subtime = Math.floor(Math.random() * (33 + aleatorio1)) + aleatorio2;

    return subtime
  };

  const getRandomTpausa = () => {
    let aleatorio1 = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
    return (aleatorio1*1000)
  }

  const url = videoData?.[numero];


  const [tiempo, setTiempo] = useState(duracion);
  const [subTiempo, setSubTiempo] = useState(getRandomSubTiempo());
  const [paused, setPaused] = useState(false);
  const [tpausa, setTpausa] = useState(getRandomTpausa());


  const intervaloRef = useRef(null);

  // ⏱ Intervalo principal
  useEffect(() => {
    if (paused) return; // no correr si está en pausa

    intervaloRef.current = setInterval(() => {
      setTiempo((prev) => {

        if (prev === 0) return 0;
        return prev - 1;
      });

      setSubTiempo((prev) => {
        if (prev === 0) {
          //return subDuracion; // 🔁 reinicia subcontador
          return getRandomSubTiempo();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervaloRef.current);
  }, [paused, subTiempo]);

  // 🔁 detectar ciclo de 12s (FUERA del setState)
  useEffect(() => {

    if (subTiempo === 0 && tiempo > 0) {
      setPaused(true);
      onclose("sessions"); 

      // ⏳ simular espera (reemplaza con tu lógica real)
      setTimeout(() => {
        onTimeSincronized(tiempo)
        sincronizarAutomatizacion(url)
        setPaused(false); // ▶️ reanuda
      }, tpausa);
    }
  }, [subTiempo, tiempo, onclose]);

  // ⛔ cuando el padre termina
  useEffect(() => {
    if (tiempo === 0) {
      onTimeSincronized(tiempo)
      clearInterval(intervaloRef.current);
      onclose("end");
    }
  }, [tiempo, onclose]);

  return (
    <>
      <Text>Finaliza En: {tiempo} Segundos</Text>
      <Text>Sub: {subTiempo}</Text>
    </>
  );

}
