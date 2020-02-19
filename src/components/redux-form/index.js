import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form'

import '../signup-form.css';
import { signup, validateEmail/*, isValidEmail*/ } from '../../api';

// required 3
// isValidEmail
// passwords the same

// async validate email

// submit

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
          throw new SubmissionError(mapErrors(e.response.data.errors))
        }
      )
  };

  render() {
    const { submitting, valid, handleSubmit } = this.props

    return (
      <form
        className="form"
        onSubmit={handleSubmit(this.onSubmit)}
      >
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

        <button type="submit" disabled={submitting || !valid}>
          Submit
        </button>
      </form>
    );
  }
}

export default reduxForm({
  validate: values => {
    const errors = {}

    if (!values.email) errors.email = 'Lacking email';
    if (!values.password) errors.password = 'Lacking password';
    if (!values.passwordConfirm) errors.passwordConfirm = 'Lacking password confirmation';

    if (Object.keys(errors).length) return errors

    if (!values.email.includes('@')) errors.email = 'Incorrect email'

    if (values.password !== values.passwordConfirm) {
      errors.passwordConfirm = "Passwords don't coincide"
    }

    return errors
  },
  asyncValidate: values => {
    return validateEmail(values.email).then(
      r => {
        console.log('validateEmail - первый параметр - r:', r)
      },
      e => {
        console.log('validateEmail - второй параметр - e:', e)
        throw Object.assign({}, { email: 'Email taken' })
      }
    )
  },
  asyncBlurFields: ['email'],
  form: 'signup'
})(SignupForm);
