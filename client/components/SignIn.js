import React from 'react';
import { connect } from 'react-redux';
import { refreshLogin } from '../actions/auth';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let { email, password } = this.refs;

    $.ajax({
      url: '/api/auth/signin',
      type: 'POST',
      dataType: 'JSON',
      data: { email: email.value, password: password.value }
    }).done( user => {
      this.props.dispatch(refreshLogin(user));
      this.props.router.push("/dashboard")
    }).fail( err => {
    });
  }
  
  render() {
    return (
      <div>
        <h2 className="center">Sign In</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="email" required={true} ref="email" placeholder="email" />
          <input type="password" required={true} ref="password" placeholder="password" />
          <button className="btn">Sign In</button>
        </form>
      </div>
    )
  }

}

export default connect()(SignIn);
