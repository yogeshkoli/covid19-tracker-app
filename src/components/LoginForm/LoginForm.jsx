import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './LoginForm.module.css';
import axios from 'axios';

const url = 'https://covid19-tracker-app-express.herokuapp.com/users/login';

function LoginForm() {
    const [ disabled, setDisabled ] = useState(false); //to prevent users from clicking multiple times

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={Yup.object({
                username: Yup.string()
                .required('This field is required.')
                .min(3, 'Username must have at least 3 characters.'),
                password: Yup.string()
                .required('This field is required.')
                .min(8, 'Password must have at least 8 characters.'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                async function fetchMyAPI() {
                    try {
                        const loginOutcome = await axios.post(url, values) //loginoutcome is the response object
                        alert(loginOutcome.data[0]);
                        setDisabled(false);
                        window.location.href = '/' //after clicking 'OK' on alert box, it redirects user to home-page, refer to link for more info: https://stackoverflow.com/questions/33622057/redirect-after-alert-box
                    } catch (err) {
                        // Refer to this link for more info on err.response: https://stackoverflow.com/questions/39153080/how-can-i-get-the-status-code-from-an-http-error-in-axios
                        // Main idea, when we receive a response from the server (that contains an error object), the error object will contain the response property, that has the data we need
                        alert(err.response.data);
                        setDisabled(false);
                    }
                }
                setDisabled(true);
                fetchMyAPI();
                setSubmitting(false);
            }}
        >
            <Form className={styles.form}>
                <h1>Login</h1>
                
                <Field name="username" type="text" placeholder="Username" className={styles.fieldOne}/>
                <ErrorMessage name="username">
                    {msg => <div className={styles.errorMessage}>{msg}</div>}
                </ErrorMessage>
        
                
                <Field name="password" type="password" placeholder="Password" className={styles.fieldTwo}/>
                <ErrorMessage name="password">
                    {msg => <div className={styles.errorMessage}>{msg}</div>}
                </ErrorMessage>
        
                <button type="submit" disabled={disabled} className={styles.button}>Log In</button>
            </Form>
     </Formik>
    );
}

export default LoginForm;
