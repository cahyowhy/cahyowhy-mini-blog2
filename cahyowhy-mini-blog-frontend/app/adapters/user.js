import DS from 'ember-data';
import ENV from '../config/environment';
import AdapterFetch from 'ember-fetch/mixins/adapter-fetch';

export default DS.RESTAdapter.extend(AdapterFetch, {
  host: ENV.APP.API_URL,
});
