Template.tileButtons.helpers({
  isStoryEditPage: function() {
    return Router.current().route.getName() == 'storyEdit'
  },
  ownTile: function() {
    return this.userId === Meteor.userId();
  }
});
