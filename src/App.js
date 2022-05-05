import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";
import UusiHarjoitus from "./UusiHarjoitus";
import Home from "./Home";

function App() {
  const [harjoituslista, setHarjoituslista] = useState([]);

  const lisaaHarjoitus = (harjoitus) => {
    setHarjoituslista([...harjoituslista, harjoitus]);
  };

  return (
    <Router>
      <Route path="/" exact>
        <Home harjoituslista={harjoituslista} />
      </Route>
      <Route path="/uusiharjoitus">
        <UusiHarjoitus lisaaHarjoitus={lisaaHarjoitus} />
      </Route>
    </Router>
  );
}

export default App;
