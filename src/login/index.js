import React from "react";
import { Button, FormFeedback, Input, Label, Row, Col, FormGroup } from "reactstrap";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object().shape({
    email: yup.string().email().required('Email required'),
    password: yup.string().min(8).required('Password required'),
  });
  

export default function Login() {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: () => handleSubmitLogin(),
        validationSchema: validationSchema,
    })
    
    const handleSubmitLogin = () => {
        console.log('Login Submitted')
    }
    return (
        <div className="login-pages">
            <Row>
                <Col md={6}>
                    <img src="https://randomimage.com/" alt="login-img" />
                </Col>
                <Col md={6} style={{ padding: '30px 80px' }}>
                    <form>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            invalid={Boolean(formik.errors.email) && formik.touched.email} />
                            {Boolean(formik.errors.email) && formik.touched.email && (
                                <FormFeedback>{formik.errors.email}</FormFeedback>
                            )}
                        </FormGroup>
                    </form>
                </Col>
            </Row>
        </div>
    )
}