import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  /*
   * serialize(snapshot, options) {
   var json = this._super(...arguments);

   json.data.attributes.cost = {
   amount: json.data.attributes.amount,
   currency: json.data.attributes.currency
   };

   delete json.data.attributes.amount;
   delete json.data.attributes.currency;

   return json;
   },
   * */

  serialize(snapshot, options) {
    let json = this._super(...arguments);

    json.data = {
      id: json.id,
      username: json.username,
      name: json.name
    };

    delete json.id;
    delete json.username;
    delete json.name;

    return json;
  },
});
