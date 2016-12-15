import React from 'react';
import { connect } from 'react-redux';
import { refreshLogin } from '../actions/auth';

class AuthenticatedRoutes extends React.Component {
  componentDidMount() {
    this.props.dispatch(refreshLogin());
  }

  render() {
    return (
      <div>
        { this.props.user._id ? this.props.children : null }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(AuthenticatedRoutes);

