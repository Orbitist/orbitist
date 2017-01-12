Template.storyControls.helpers({
  ownStory: function() {
    return this.userId === Meteor.userId();
  },
  isStoryEditPage: function() {
    return Router.current().route.getName() == 'storyEdit'
  },
  isStoryMapPage: function() {
    return Router.current().route.getName() == 'storyMap'
  },
  isStoryPage: function() {
    return Router.current().route.getName() == 'storyPage'
  }
});

Template.storyControls.events({
  'click #map-activate': function() {
    return Session.set('storyMap', 'true');
  }
});
