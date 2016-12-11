Template.storyItem.helpers({
  ownStory: function() {
    return this.userId === Meteor.userId();
  }
});
