import React, { useEffect, } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Input,
  FormGroup,
  Label,
  Row,
  Col,
  Button,
  FormFeedback,
} from "reactstrap";
import "../scss/stylesheet.scss";

import request from "../request";

const validationSchema = yup.object().shape({
  title: yup.string().required("Recipe Title is required"),
  ingredients: yup.string().required("Ingredients is required"),
  instructions: yup.string().required("Instructions is required"),
  source_url: yup.string().required("Source URL is required"),
  image_url: yup.string().required("Image URL is required"),
});

export default function FormDashboard({
  type,
  formEditedId,
  closeModal,
  refetch,
}) {
  const formik = useFormik({
    initialValues: {
      title: "",
      ingredients: "",
      instructions: "",
      source_url: "",
      image_url: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => handleSubmitForm(),
  });

  const handleSubmitForm = async (e) => {
    // e.preventDefault();

    if (type === "create") {
      request
        .post("/recipe", formik.values)
        .then(() => refetch())
        .catch((err) => alert(err));
    }

    if (type === "edit") {
      request
        .put(`/recipe/${formEditedId}`, formik.values)
        .then(() => refetch())
        .catch((err) => alert(err));
    }

    closeModal()
  };

  const handleSetEditedForm = async () => {
    request.get(`/recipe/${formEditedId}`)
    .then(({ data }) => {
        console.log(data)
        formik.setFieldValue('title', data.title);
        formik.setFieldValue('ingredients', data.ingredients);
        formik.setFieldValue('instructions', data.instructions);
        formik.setFieldValue('source_url', data.source_url);
        formik.setFieldValue('image_url', data.image_url);
    })
    .catch(err => alert(err))
  }

  useEffect(() => {
    if (type === 'edit') {
        handleSetEditedForm()
    }
  }, [formEditedId, type])

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <FormGroup>
          {/* <Label>Recipe Title</Label> */}
          <Input
            name="title"
            placeholder="The Recipe Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            invalid={formik.touched.title && Boolean(formik.errors.title)}
          />
          {formik.touched.title && Boolean(formik.errors.title) && (
            <FormFeedback>{formik.errors.title}</FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          {/* <Label>Ingredients</Label> */}
          <Input
            name="ingredients"
            placeholder="The Ingredients, separate with comma (,)"
            value={formik.values.ingredients}
            onChange={formik.handleChange}
            invalid={
              formik.touched.ingredients && Boolean(formik.errors.ingredients)
            }
          />
          {formik.touched.ingredients && Boolean(formik.errors.ingredients) && (
            <FormFeedback>{formik.errors.ingredients}</FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          {/* <Label>Instructions</Label> */}
          <Input
            name="instructions"
            placeholder="The Instructions, separate with comma (,)"
            value={formik.values.instructions}
            onChange={formik.handleChange}
            invalid={
              formik.touched.instructions && Boolean(formik.errors.instructions)
            }
          />
          {formik.touched.instructions &&
            Boolean(formik.errors.instructions) && (
              <FormFeedback>{formik.errors.instructions}</FormFeedback>
            )}
        </FormGroup>
        <FormGroup>
          {/* <Label>Source URL</Label> */}
          <Input
            name="source_url"
            placeholder="The Recipe's Source URL"
            value={formik.values.source_url}
            onChange={formik.handleChange}
            invalid={
              formik.touched.source_url && Boolean(formik.errors.source_url)
            }
          />
          {formik.touched.source_url && Boolean(formik.errors.source_url) && (
            <FormFeedback>{formik.errors.source_url}</FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          {/* <Label>Image URL</Label> */}
          <Input
            name="image_url"
            placeholder="The Recipe's Image URL"
            value={formik.values.image_url}
            onChange={formik.handleChange}
            invalid={
              formik.touched.image_url && Boolean(formik.errors.image_url)
            }
          />
          {formik.touched.image_url && Boolean(formik.errors.image_url) && (
            <FormFeedback>{formik.errors.image_url}</FormFeedback>
          )}
        </FormGroup>
        <Row>
          <Col>
            <Button outline color="success" type="submit">
              Submit
            </Button>
          </Col>
          <Col>
            <Button onClick={() => closeModal()}>Cancel</Button>
          </Col>
        </Row>
      </form>
    </>
  );
}
