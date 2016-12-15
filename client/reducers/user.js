const user = (state = {}, action) => {
  switch(action.type) {
    case 'USER':
      let { _id, role } = action
      return { _id, role }
    default:
      return state;
  }
}

export default user;
