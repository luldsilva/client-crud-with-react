import styles from "./ListClients.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import ServerTable from "react-strap-table";
import { Table } from "../components/Table";

export function ListClients() {
  //const baseURL = "https://client-crud-basic.azurewebsites.net/api/Client";
  const baseURL = "https://localhost:44384/api/Client";

  const [data, setData] = useState([]);

  const getClient = async () => {
    await axios
      .get(baseURL)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getClient();
  });

  return <Table content={data} />;
}
