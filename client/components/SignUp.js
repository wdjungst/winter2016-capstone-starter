import React from 'react';
import { connect } from 'react-redux';
import { refreshLogin } from '../actions/auth';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let { email, password } = this.refs;

    $.ajax({
      url: '/api/auth/signup',
      type: 'POST',
      data: { email: email.value, password: password.value },
      dataType: 'JSON'
    }).done( user => {
      this.props.dispatch(refreshLogin(user));
      this.props.router.push('/dashboard');
    }).fail( err => {
      //A great place to dispatch flash actions
    });
  }

  render() {
    return (
      <div>
        <h2 className="center">Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="email" placeholder="email" ref="email" required={true} />
          <input type="password" placeholder="password" ref="password" required={true} />
          <button className="btn">Sign Up</button>
        </form>
      </div>
    )
  }
} 

export default connect()(SignUp);
