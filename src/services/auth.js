import RestUtilites from './restUtilities';
import jwtDecode from 'jwt-decode';

class Auth {
  login (data) {
    return RestUtilites.post ('api/accounts/login', data).then (response => {
      if (response.is_error) return response;
      localStorage.token = response.content.token;
      response.content = jwtDecode (response.content.token);
      return response;
    });
  }
  signUp (data) {
    return RestUtilites.post ('api/accounts/create', data).then (
      response => response
    );
  }
}

export default Auth;
