export default Discourse.Route.extend({

  beforeModel() {

    // HACK: Something with the way the user card intercepts clicks seems to break how the
    // transition into a user's activity works. This makes the back button work on mobile
    // where there is no user card as well as desktop where there is.
    if (this.site.mobileView) {
      this.replaceWith('userActivity.bookmarks');
    } else {
      this.transitionTo('userActivity.bookmarks');
    }
  }

});
