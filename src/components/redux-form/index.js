import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'

import '../signup-form.css';
import { signup, validateEmail/*, isValidEmail*/ } from '../../api';

// required 3
// isValidEmail
// passwords the same

// async validate email

// submit

class SignupForm extends Component {
  render() {
    return (
      <form className="form">
        <label>
          Email:
          <div>
            <input type="text" name="email" />
            {handleErrors(this.state.errors, 'email')}
          </div>
        </label>
        <label>
          Password:
          <div>
            <input type="password" name="password" />
            {handleErrors(this.state.errors, 'password')}
          </div>
        </label>
        <label>
          Password confirmation:
          <div>
            <input type="password" name="passwordConfirm" />
            {handleErrors(this.state.errors, 'passwordConfirm')}
          </div>
        </label>

        <button type="submit" disabled={this.state.isSubmitting}>
          Submit
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'signup'
})(SignupForm);
