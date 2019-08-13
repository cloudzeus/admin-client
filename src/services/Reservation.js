import resClient from './restUtilities';

export default class {
  static fetch () {
    return resClient.get ('api/reservations');
  }
  static search (query) {
    return resClient.post ('api/reservations/search', query);
  }
  static sendEmail (data) {
    return resClient.post ('api/accounts/contact', data);
  }
}
