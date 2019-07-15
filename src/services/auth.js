import RestUtilites from './restUtilities';
import jwtDecode from 'jwt-decode'

const restClient = new RestUtilites()

class Auth {
    login(data){
       return restClient.post('/api/accounts/login',data).then( response => {
           if(response.is_error) return response
           localStorage.token = response.content.token
           response.content = jwtDecode(response.content.token)
           return response

       })
    }
    signUp(data){
       return restClient.post('/api/accounts/create',data).then( response => response)
    }
}

export default Auth