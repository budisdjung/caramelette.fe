import React, { useState, useEffect } from "react";
import { Button, Table, Modal, ModalHeader, ModalBody } from "reactstrap";

import "../scss/stylesheet.scss";

import Header from "../header";
import FormDashboard from "./form";
import request from "../request";

export default function Dashboard() {
  const [recipeList, setRecipeList] = useState([]);
  const [formType, setFormType] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [formEditedId, setFormEditedId] = useState(null);

  const handleCreateForm = () => {
    setFormType("New");
    setFormVisible(true);
  };

  const handleEditForm = (id) => {
    setFormType("Edit");
    setFormType(true);
    setFormEditedId(id);
  };

  const handleDelete = (id) => {
    request
      .delete(`/recipe/${id}`)
      .then(() => fetchData())
      .catch((err) => alert(err));
  };

  const fetchData = async () => {
    await request
      .get("/recipe")
      .then(({ data }) => {
        setRecipeList(data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <body className="body">
      <Header/>
      <div style={{ margin: "0px 100px" }}>
        <h3>Recipe List</h3>
        <Button outline color="primary" onClick={() => handleCreateForm()}>
          Add Recipe
        </Button>
        <Table width={1200}>
          <thead>
            <tr>
              <th>No</th>
              <th>ID</th>
              <th>Recipe Title</th>
              <th>Ingredients</th>
              <th>Instructions</th>
              <th>Source URL</th>
              <th>Image URL</th>
            </tr>
          </thead>
          <tbody>
            {recipeList.map((value, index) => (
              <tr key={index}>
                <th scope="value">{index + 1}</th>
                <td>{value.id}</td>
                <td>{value.title}</td>
                <td>{value.ingredients}</td>
                <td>{value.instructions}</td>
                <td>{value.source_url}</td>
                <td>{value.image_url}</td>
                <td>
                  <Button
                    color="warning"
                    onClick={() => handleEditForm(value.id)}
                  >
                    Edit
                  </Button>
                  <Button color="danger" onClick={() => handleDelete(value.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/*Modal Form*/}
        <Modal isOpen={formVisible} toggle={() => setFormVisible(!formVisible)}>
          <ModalHeader>{`${formType} Recipe`}</ModalHeader>
          <ModalBody>
            <FormDashboard
              type={formType}
              refetch={fetchData}
              formEditedId={formEditedId}
              closeModal={() => setFormVisible(false)}
            />
          </ModalBody>
        </Modal>
      </div>
    </body>
  );
}
