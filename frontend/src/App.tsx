import { useMemo, useState } from "react";
import { useQuery } from "react-query";

import "./App.css";
import Main from "./views/main/Main";

function App() {
  if (window.ethereum)
    return <Main provider={window.ethereum} />; //Wallet exists
  else return <>Make sure your browser has a wallet</>; //Need to install wallet
}

export default App;
