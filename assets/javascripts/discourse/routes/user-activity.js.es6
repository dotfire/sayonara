export default Discourse.Route.extend({
  model() {
    return this.modelFor("user");
  },

  setupController(controller, user) {
    this.controllerFor("user-activity").set("model", user);
    this.controllerFor("user").set("indexStream", true);
  }
});
