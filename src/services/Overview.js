import restUtils from './restUtilities';

export default class {
  fetch () {
    return restUtils.get ('api/overview');
  }
}
