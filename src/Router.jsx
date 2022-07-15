import { Route, Routes } from "react-router-dom";
import { CadastrateClient } from "./pages/CadastrateClient";
import { ListClients } from "./pages/ListClients";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<ListClients />} />
      <Route path="/cadastrate" element={<CadastrateClient />} />
    </Routes>
  );
}
