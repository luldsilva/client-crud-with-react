import { Header } from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";

import styles from "./App.module.css";
import "./global.css";

function App() {
  return (
    <div>
      <Header />
      <div>
        <main>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </main>
      </div>
    </div>
  );
}

export default App;
