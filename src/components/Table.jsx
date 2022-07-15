import { PencilLine } from "phosphor-react";
import { Plus } from "phosphor-react";
import styles from "./Table.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export function Table({ content }) {
  const baseURL = "https://localhost:44384/api/Client";
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const openOrCloseModalDelete = () => {
    setDeleteModal(!deleteModal);
  };

  const openOrCloseModalEdit = () => {
    setEditModal(!editModal);
  };

  const selectedClient = (client, opt) => {
    setClientSelected(client);
    opt === "Editar" ? openOrCloseModalEdit() : openOrCloseModalDelete();
  };

  async function handleEdit(props) {
    navigate("/cadastrate");
  }

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
    const { name, value } = e.target;
    setClientSelected({
      ...clientSelected,
      [name]: value,
    });
  };

  const putClient = async () => {
    clientSelected.cellphone = parseInt(clientSelected.cellphone);
    await axios
      .put(baseURL + "/" + clientSelected.id, clientSelected)
      .then((response) => {
        var resp = response.data;
        var aux = data;
        aux.map((client) => {
          if (client.id === clientSelected.id) {
            client.name = resp.name;
            client.date_of_brithday = resp.date_of_brithday;
            client.cellphone = resp.cellphone;
            client.address = resp.address;
            client.social_media = resp.social_media;
            client.cpf_number = resp.cpf_number;
            client.rg_number = resp.rg_number;
          }
        });
        openOrCloseModalEdit();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const deleteClient = async () => {
    await axios
      .delete(baseURL + "/" + clientSelected.id)
      .then((response) => {
        setData(data.filter((client) => client.id !== response.data));
        openOrCloseModalDelete();
      })
      .catch((error) => {
        console.log("Error ", error);
      });
  };

  return (
    <div>
      <h3>Cadastro de Clientes</h3>
      <header>
        <button onClick={handleEdit} className={styles.CadastrateButton}>
          <Plus size={22} className={styles.Icons} />
          Cadastrar
        </button>
      </header>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Endereco</th>
            <th>Rede social</th>
            <th>Cpf</th>
            <th>Rg</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {content.map((person) => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.cellphone}</td>
              <td>{person.address}</td>
              <td>{person.social_media}</td>
              <td>{person.cpf_number}</td>
              <td>{person.rg_number}</td>
              <td>
                <button className={styles.button}>
                  <PencilLine
                    size={22}
                    className={styles.Icons}
                    onClick={() => selectedClient(person, "Editar")}
                  />
                  Editar
                </button>
                <button
                  className={styles.button}
                  onClick={() => selectedClient(person, "Excluir")}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={editModal}>
        <ModalHeader>Editar Cliente</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID: </label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={clientSelected && clientSelected.id}
            />
            <br />
            <br />
            <label>Nome: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={handleChange}
              value={clientSelected && clientSelected.name}
            />
            <br />
            <label>Data Nascimento: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="date_of_brithday"
              onChange={handleChange}
              value={clientSelected && clientSelected.date_of_brithday}
            />
            <br />
            <label>Telefone: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="cellphone"
              onChange={handleChange}
              value={clientSelected && clientSelected.cellphone}
            />
            <br />
            <label>Endereco: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="address"
              onChange={handleChange}
              value={clientSelected && clientSelected.address}
            />
            <br />
            <label>Rede Social: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="social_media"
              onChange={handleChange}
              value={clientSelected && clientSelected.social_media}
            />
            <br />
            <label>CPF: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="cpf_number"
              onChange={handleChange}
              value={clientSelected && clientSelected.cpf_number}
            />
            <br />
            <label>RG: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="rg_number"
              onChange={handleChange}
              value={clientSelected && clientSelected.rg_number}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => putClient()}>
            Editar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => openOrCloseModalEdit()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={deleteModal}>
        <ModalBody>
          Confirma a exclusão deste cliente:
          {clientSelected && clientSelected.name} ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => deleteClient()}>
            Sim
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => openOrCloseModalDelete()}
          >
            Não
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
