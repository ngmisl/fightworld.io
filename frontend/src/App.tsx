import "./App.css";
import { MainLayout } from "./layouts/mainLayout/MainLayout";

function App() {
  if (window.ethereum)
    return <MainLayout provider={window.ethereum} />
  else return <>Make sure your browser has a wallet</>;
}

export default App;
