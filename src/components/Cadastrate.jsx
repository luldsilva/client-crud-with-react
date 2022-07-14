import styles from "./Cadastrate.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

export function Cadastrate() {
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

  return (
    <div>
      {data.map((client) => {
        return (
          <div>
            <table>
              <tbody>
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.date_of_brithday}</td>
                  <td>{client.cellphone}</td>
                  <td>{client.address}</td>
                  <td>{client.social_media}</td>
                  <td>{client.cpf_number}</td>
                  <td>{client.rg_number}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
