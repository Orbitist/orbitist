Template.storyControls.helpers({
  ownStory: function() {
    return this.userId === Meteor.userId();
  },
  isStoryMap: function(n) {
    return Session.equals('storyMap', n);
  }
});

Template.storyControls.events({
  'click #map-activate': function() {
    return Session.set('storyMap', 'true');
  },
  'click #map-inactive': function() {
    return Session.set('storyMap', 'false');
  }
});
