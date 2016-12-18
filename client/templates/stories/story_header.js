Template.storyHeader.helpers({
  ownStory: function() {
    return this.userId === Meteor.userId();
  }
});
