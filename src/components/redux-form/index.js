import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'

import '../signup-form.css';
import { signup, validateEmail/*, isValidEmail*/ } from '../../api';

// required 3
// isValidEmail
// passwords the same

// async validate email

// submit

function renderInputWithError({
  input,
  type,
  label,
  meta: { error, touched }
}) {
  return (
    <label>
      {label}:
      <div>
        <input {...input} type={type} />
        {touched && error && <p className="error">
          {error}
        </p>}
      </div>
    </label>
  )
}

class SignupForm extends Component {
  render() {
    return (
      <form className="form">
        <Field
          component={renderInputWithError}
          type="text"
          name="email"
          label="Email"
        />
        <Field
          component={renderInputWithError}
          type="password"
          name="password"
          label="Password"
        />
        <Field
          component={renderInputWithError}
          type="password"
          name="passwordConfirm"
          label="Password confirmation"
        />

        <button type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default reduxForm({
  validate: (values) => {
    const errors = {}

    if (!values.email) errors.email = 'Missing email';
    if (!values.password) errors.password = 'Missing password';
    if (!values.passwordConfirm) errors.passwordConfirm = 'Missing password confirmation';

    if (Object.keys(errors).length) return errors

    if (!values.email.includes('@')) errors.email = 'Incorrect email'

    if (values.password !== values.passwordConfirm) {
      errors.passwordConfirm = "Passwords don't match"
    }

    return errors
  },
  form: 'signup'
})(SignupForm);
