import "./App.css";
import Main from "./views/main/Main";

function App() {
  if (window.ethereum)
    return <Main provider={window.ethereum} />
  else return <>Make sure your browser has a wallet</>;
}

export default App;
