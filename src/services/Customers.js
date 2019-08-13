import restClient from './restUtilities';

export default class Customer {
  static fetchAll () {
    return restClient.get ('api/accounts/customers');
  }
  static search (query) {
    return restClient.post ('api/accounts/customers', query);
  }
  static fetch (id) {
    return restClient.get (`api/accounts/me/${id}`);
  }
  static update (data) {
    return restClient.put (`api/accounts/update`, data);
  }
}
