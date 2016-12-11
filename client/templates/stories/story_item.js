Template.storyItem.helpers({
  ownStory: function() {
    return this.userId === Meteor.userId();
  }
});
Template.storyItem.onRendered(function() {
  $grid.masonry('reloadItems')
});
