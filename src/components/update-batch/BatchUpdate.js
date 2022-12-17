import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import FormContainer from "../Form/FormContainer";
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { Link } from 'react-router-dom';

import "react-toastify/dist/ReactToastify.css";


const BatchUpdate = () => {
    const UpdateUrl = "https://yoga-server.cyclic.app/update-batch";

    const [form, setForm] = useState({
        email: "",
        batch: "",
    });
    const [errors, setErrors] = useState({});

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        if (!!errors[field])
            setErrors({
                ...errors,
                [field]: null
            })
    }



    const validateForm = () => {
        const { email, batch } = form
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const newErrors = {}
        if (!email || email === 'Provide email')
            newErrors.email = "Email is required!";
        else if (!regex.test(email)) {
            newErrors.email = "This is not a valid email format";
        }
        if (!batch || batch === 'Select Batch')
            newErrors.batch = 'Please select your batch'
        return newErrors;
    }

    const BatchUpdate = () => {
        toast.success("You're batch has been updated", {
            theme: "colored",
            draggable: true,
            position: toast.POSITION.TOP_CENTER
        })
    }

    const BatchNotUpdate = () => {
        toast.error("Please stay in your current batch this month", {
            theme: "colored",
            draggable: true,
            position: toast.POSITION.TOP_CENTER
        })
    }

    const EmailNotRegister = () => {
        toast.error("Email id is not registered, Please enter a valid email address", {
            theme: "colored",
            draggable: true,
            position: toast.POSITION.TOP_CENTER
        })
    }






    const handleSubmit = e => {
        e.preventDefault()
        const formErrors = validateForm()
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
        } else {
            axios.post(UpdateUrl, {
                email: form.email,
                batch: form.batch,
            })
                .then(res => {
                    if (res.status === 200) {
                        BatchUpdate();
                        console.log(res);
                    } else {
                        console.log("Unexpected response status:", res.status);
                    }
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status === 400) {
                            BatchNotUpdate();
                        } else if(error.response.status === 404){
                            EmailNotRegister();
                        }
                    } else {
                        console.log("Error without response:", error);
                    }
                });
        }
    }

    return (
        <>
            <ToastContainer draggable={false} transition={Zoom} autoClose={4000} />
            <FormContainer>
               <h2>Change your batch</h2>
                <label style={{marginBottom: '10px'}}>you can only change your batch after a month</label>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Registered EmailId"
                            value={form.email}
                            onChange={(e) => setField('email', e.target.value)}
                            isInvalid={!!errors.email}>
                        </Form.Control>
                        {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text> */}
                        <Form.Control.Feedback type='invalid'>
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId='Batch'>
                        <Form.Label>Batch</Form.Label>
                        <Form.Select placeholder='Select Batch' value={form.batch} onChange={(e) => setField('batch', e.target.value)}
                            isInvalid={!!errors.batch}>
                            <option>Select New Batch</option>
                            <option value='Batch-1'>6 - 7AM  (Batch-1)</option>
                            <option value='Batch-2'>7 - 8AM  (Batch-2)</option>
                            <option value='Batch-3'>8 - 9AM  (Batch-3)</option>
                            <option value='Batch-4'>5 - 6PM  (Batch-4)</option>
                        </Form.Select>
                        <Form.Control.Feedback type='invalid'>
                            {errors.batch}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br/>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <label style={{marginLeft: '10px'}}>
                        <Link to ="/">Registration Page</Link>      
                    </label>
                </Form>
            </FormContainer>
        </>
    )
}

export default BatchUpdate;