import React, {Component} from 'react'
import SignupForm from '../components/plain'

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Формы в Реакте</h1>
        <SignupForm />
      </div>
    );
  }
}

export default HomePage;
