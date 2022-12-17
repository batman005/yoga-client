import React, { useState } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import FormContainer from './FormContainer';
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { Link } from 'react-router-dom';
import yoga from '../../assets/yoga.svg'

import "react-toastify/dist/ReactToastify.css";
//Registration screen

const RegisterScreen = () => {
    const url = "https://yoga-server.cyclic.app/register"

    //States for handling the form
    const [form, setForm] = useState({
        dob: "",
        gender: "",
        name: "",
        email: "",
        number: "",
        batch: "",
        status: "",
    });
    const [errors, setErrors] = useState({});

    //age calculation function
    const calcAge = (dateString) => {
        const today = new Date()
        const birthDate = new Date(dateString)
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return age;
    }

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
    //validation of each field
    const validateForm = () => {
        const { dob, gender, name, email, number, batch, status } = form
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const mobRegex = /^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/;
        const newErrors = {}
        if (!dob || dob === '') newErrors.dob = 'Please enter your date of birth'
        else if (calcAge(dob) < 18)
            newErrors.dob = ' You need to be at least 18 years'
        if (calcAge(dob) > 65)
            newErrors.dob = 'You need to be less than 65 years'
        if (!gender || gender === 'Select Gender')
            newErrors.gender = 'Please Select your gender'
        if (!name || name === 'Full name please')
            newErrors.name = 'Please enter your name'
        if (!number || number === 'Provide number')
            newErrors.number = "mobile number is required";
        else if (!mobRegex.test(number))
            newErrors.number = "This is not a valid mobile-number format";
        if (!email || email === 'Provide email')
            newErrors.email = "Email is required!";
        else if (!regex.test(email)) {
            newErrors.email = "This is not a valid email format";
        }
        if (!batch || batch === 'Select Batch')
            newErrors.batch = 'Please select your batch'
        if (!status || status === 'Select Amount')
            newErrors.status = 'Please select any payment option '
        return newErrors;
    }

    //mock payment function that is going to call after the registration of client
    const CompletePayment = () => {
        toast.success("You are registered for the classes and payment is done", {
            theme: "colored",
            draggable: true,
            position: toast.POSITION.TOP_CENTER
        })
    }

    const EmailNumberVerfication = () => {
        toast.error("Email Or Mobile number already exist please use a new one", {
            theme: "colored",
            draggable: true,
            position: toast.POSITION.TOP_CENTER
        })
    }



    //Form errors and submit handling
    const handleSubmit = e => {
        e.preventDefault()
        const formErrors = validateForm()
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
        } else {
            axios.post(url, {
                dob: form.dob,
                gender: form.gender,
                name: form.name,
                email: form.email,
                number: form.number,
                batch: form.batch,
                status: form.status,
            })
                .then(res => {
                    if (res.status === 200) {
                        CompletePayment();
                        console.log(res);
                    } else {
                        console.log("Unexpected response status:", res.status);
                    }
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status === 400) {
                            EmailNumberVerfication();
                        } else {
                            console.log("Error with response:", error.response);
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
            <Image  alt="error" style={{height:'100px'}} src={yoga} rounded/>
                <h2>Online Yoga Class Admission Form</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Enter Full name"
                            onChange={(e) => setField('name', e.target.value)}
                            value={form.name}
                            isInvalid={!!errors.name}></Form.Control>
                        <Form.Control.Feedback type='invalid'>
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
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
                    <Form.Group controlId='number'>
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type='mobile-number' value={form.number} placeholder='Enter Mobile Number'
                            onChange={(e) => setField('number', e.target.value)}
                            isInvalid={!!errors.number}>
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'>
                            {errors.number}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId='dob'>
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control placeholder='DD-MM-YYYY' type='date' value={form.dob} 
                            onChange={(e) => setField('dob', e.target.value)}
                            isInvalid={!!errors.dob}>
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'>
                            {errors.dob}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId='gender'>
                        <Form.Label>Gender</Form.Label>
                        <Form.Select placeholder='Select Gender' value={form.gender} onChange={(e) => setField('gender', e.target.value)}
                            isInvalid={!!errors.gender}>
                            <option>Select Gender</option>
                            <option value='M'>Male</option>
                            <option value='F'>Female</option>
                        </Form.Select>
                        <Form.Control.Feedback type='invalid'>
                            {errors.gender}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId='Batch'>
                        <Form.Label>Batch</Form.Label>
                        <Form.Select placeholder='Select Batch' value={form.batch} onChange={(e) => setField('batch', e.target.value)}
                            isInvalid={!!errors.batch}>
                            <option>Select Batch</option>
                            <option value='Batch-1'>6 - 7AM  (Batch-1)</option>
                            <option value='Batch-2'>7 - 8AM  (Batch-2)</option>
                            <option value='Batch-3'>8 - 9AM  (Batch-3)</option>
                            <option value='Batch-4'>5 - 6PM  (Batch-4)</option>
                        </Form.Select>
                        <Form.Control.Feedback type='invalid'>
                            {errors.batch}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId='status'>
                        <Form.Label>Fees</Form.Label>
                        <Form.Select placeholder='Select payment method' value={form.status} onChange={(e) => setField('status', e.target.value)}
                            isInvalid={!!errors.status}>
                            <option>Select Payment method</option>
                            <option value='Payment Done'>500/- Rs</option>
                        </Form.Select>
                        <Form.Control.Feedback type='invalid'>
                            {errors.status}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Submit & Pay
                    </Button>
                    <label style={{ marginLeft: '10px' }}>
                        <Link to="/update-batch">Change Batch</Link>
                    </label>
                </Form>
            </FormContainer>
        </>
    )
}

export default RegisterScreen;