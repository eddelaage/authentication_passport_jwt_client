const getJwt = () => {
    return 'bearer ' + localStorage.getItem('token');
  };

export default getJwt