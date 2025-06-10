import { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState("Loading...");

  useEffect(() => {
    fetch("/api/ping")
      .then((res) => res.json())
      .then((data) => setMsg(data.msg));
  }, []);

  return <h1>Backend says: {msg}</h1>;
}

export default App;
