import React, { Component } from 'react';
import { Form, Field } from 'react-final-form'

import '../signup-form.css';
import { signup, validateEmail/*, isValidEmail*/ } from '../../api';

// required 3
// isValidEmail
// passwords the same

// async validate email

// submit

const required = value => !value ? 'Lacking value' : ''
const isValidEmail = value =>
  !value.includes('@') ? 'Incorrect email' : ''
const matchPasswords = (passwordConfirm, { password }) =>
  passwordConfirm !== password ? "Passwords don't coincide" : ''

const composeValidators = (...validators) => (...rest) =>
  validators.reduce(
    (error, validator) => error || validator(...rest),
    undefined
  )

const mapErrors = errors => errors.reduce((acc, e) => {
  acc[e.field] = e.error
  return acc
}, { _error: 'Form invalid' })

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
  onSubmit = values => {
    return signup(values)
      .then(
        r => {
          console.log('Первый параметр:', r)
        },
        e => {
          console.log('Второй параметр:', e.response.data)
          /*throw new SubmissionError(mapErrors(e.response.data.errors))*/
          throw new Error(mapErrors(e.response.data.errors))
        }
      )
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        {({ handleSubmit }) => (
          <form
            className="form"
            onSubmit={handleSubmit}
          >
            <Field
              render={renderInputWithError}
              type="text"
              name="email"
              label="Email"
              validate={composeValidators(
                required,
                isValidEmail
              )}
            />
            <Field
              render={renderInputWithError}
              type="password"
              name="password"
              label="Password"
              validate={composeValidators(required)}
            />
            <Field
              render={renderInputWithError}
              type="password"
              name="passwordConfirm"
              label="Password confirmation"
              validate={composeValidators(
                required,
                matchPasswords
              )}
            />

            <button
              type="submit"
              /*disabled={submitting || !valid}*/
            >
              Submit
            </button>
          </form>
        )}
      </Form>
    );
  }
}

export default SignupForm
