
// no hay funcionalidad solo son referencias de para peticiones



    const login= async (pt1,pt2) =>{
      let respData= await resources.login(pt1,pt2);
      console.log(respData)
      if(respData == false){
        console.log("exit")
      }
      else if(respData[5] == true){
        console.log("next",respData)
      }
    }
    //login("anderson","pass")

    const listVideos= async (pt1) =>{
      let respData= await resources.listarVideos(pt1);
      console.log(respData)
      if(respData == null){
        console.log("EMPTY LIST")
      }
      else{
        console.log("next",respData)
      }
    }
    //listVideos("and1")

    const publicarVideo= async (pt1,pt2) =>{
      let respData= await resources.saveVideos(pt1,pt2);
      console.log(respData)
    }
    //publicarVideo("https://youtu.be/E3KPq4JreVY","and1")

    const borrarvideo= async (pt1,pt2) =>{
      let respData= await resources.eraseVideo(pt1,pt2);
      console.log(respData)
    }
    //borrarvideo("https://youtu.be/E3KPq4JreVYs","and1")



  const [time, setTime] = useState(10);
  const intervalRef = useRef(null);
  const start = (timeView) => {
    if (intervalRef.current) return; // evita múltiples intervalos
      setTime(timeView); // 🔥 IMPORTANTE

    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  const reset = (newTime) => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTime(newTime);
  };
  useEffect(() => {
    if (webview.visible == true && webview.bloqueado === true && webview.automatic === false) {
      // modal abierto → iniciar contador
      const t = Number(webview.time) || 10;
      start(webview.time);
    } else {
      // modal cerrado → detener contador
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [webview.visible, webview.automatic]);
  useEffect(() => {
    if (time === 0) {
      reset(webview.time);
      start(webview.time);
      webview.onClose();
    }
  }, [time]);

