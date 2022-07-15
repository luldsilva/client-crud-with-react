import styles from "./CadastrateClient.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export function CadastrateClient() {
  const baseURL = "https://localhost:44384/api/Client";

  const [clientSelected, setClientSelected] = useState({
    id: "",
    name: "",
    date_of_brithday: "",
    cellphone: "",
    address: "",
    social_media: "",
    cpf_number: "",
    rg_number: "",
  });

  const handleChange = (e) => {
    event.preventDefault();
    const { name, value } = e.target;
    setClientSelected({
      ...clientSelected,
      [name]: value,
    });
    delete clientSelected.id;
    clientSelected.cellphone = parseInt(clientSelected.cellphone);
    console.log(clientSelected);
  };

  const postClient = async () => {
    await axios
      .post(baseURL, clientSelected)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <div className={styles.justifyContentAround}>
      <form className={styles.formStyle}>
        <h3 className={styles.formGroup}>Cliente</h3>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Nome</label>
          <input
            type="text"
            placeholder="Nome"
            className={styles.formControl}
            name="name"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Nascimento </label>
          <input
            type="text"
            placeholder="Data de Nascimento"
            className={styles.formControl}
            name="date_of_brithday"
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Telefone</label>
          <input
            type="text"
            placeholder="Telefone"
            className={styles.formControl}
            name="cellphone"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Endereco</label>
          <input
            type="text"
            placeholder="Endereco"
            className={styles.formControl}
            name="address"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Rede social</label>
          <input
            type="text"
            placeholder="Rede social"
            className={styles.formControl}
            name="social_media"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Cpf</label>
          <input
            type="text"
            placeholder="Cpf"
            className={styles.formControl}
            name="cpf_number"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Rg</label>
          <input
            type="text"
            placeholder="Rg"
            className={styles.formControl}
            name="rg_number"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button
            className={styles.CadastrateButton}
            onClick={() => postClient()}
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
