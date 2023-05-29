import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const [getUserMediaSupported, setGetUserMediaSupported] = useState(false);
  const [error, setError] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      setGetUserMediaSupported(true);
    }
  }, []);

  useEffect(() => {
    const setupStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioRef.current!.srcObject = stream;
        audioRef.current!.play();
      } catch (err) {
        setError(err + "");
      }
    };
    if (getUserMediaSupported) {
      setupStream();
    }
  }, [getUserMediaSupported]);

  return (
    <>
      <h1>eQTH 📻</h1>
      {!getUserMediaSupported && <p>getUserMedia not supported by browser</p>}
      <audio ref={audioRef} controls={true} />
    </>
  );
}

export default App;
