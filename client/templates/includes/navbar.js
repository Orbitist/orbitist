Template.navbar.helpers({
  isMap: function() {
    return Router.current().route.getName() == 'storyMap'
  },
  ownStory: function() {
    return this.userId === Meteor.userId();
  }
});
