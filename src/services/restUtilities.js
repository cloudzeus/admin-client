class RestUtilities {
  get (url) {
    return this.request ('GET', url, '');
  }
  delete (url) {
    return this.request ('DELETE', url, '');
  }
  put (url, data) {
    return this.request ('PUT', url, data);
  }
  post (url, data) {
    return this.request ('POST', url, data);
  }

  request (method, url, data) {
    let isJsonResponse = false;
    let isBadRequest = false;
    let body = undefined;
    let headers = new Headers ();

    headers.set ('x-auth-token', `token here`); //TODO : get token from state
    headers.set ('Accept', 'application/json');

    if (data && data !== '') {
      if (typeof data === 'object') {
        headers.set ('Content-Type', 'application/json');
        body = JSON.stringify (data);
      } else {
        headers.set ('Content-Type', 'application/x-www-form-urlencoded');
        body = data;
      }
    }
    let baseUrl = 'http://localhost:7000';
    return fetch (baseUrl + url, {
      method: method,
      headers: headers,
      body: body,
    })
      .then (response => {
        if (response.status == 401) {
          // Unauthorized; redirect to sign-in
          // AuthStore.removeToken(); //TODO : user not auth
          window.location.replace (`/?expired=1`);
        }

        isBadRequest = response.status >= 400 || response.status >= 500;

        let responseContentType = response.headers.get ('content-type');
        if (
          responseContentType &&
          responseContentType.indexOf ('application/json') !== -1
        ) {
          isJsonResponse = true;
          return response.json ();
        } else {
          return response.text ();
        }
      })
      .then (responseContent => {
        let response = {
          is_error: isBadRequest,
          error_content: isBadRequest ? responseContent : null,
          content: isBadRequest ? null : responseContent,
        };
        return response;
      });
  }
}


export default RestUtilities