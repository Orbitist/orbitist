Stories = new Mongo.Collection('stories');

validateStory = function (story) {
  var errors = {};

  if (!story.title)
    errors.title = "Please fill in a title";

  return errors;
}

Stories.allow({
  update: function(userId, story) { return ownsDocument(userId, story); },
  remove: function(userId, story) { return ownsDocument(userId, story); }
});

Stories.deny({
  update: function(userId, story, fieldNames) {
    // may only edit the following fields:
    return (_.without(fieldNames, 'title').length > 0);
  }
});

Stories.deny({
  update: function(userId, story, fieldNames, modifier) {
    var errors = validateStory(modifier.$set);
    return errors.title;
  }
});

Meteor.methods({
  storyInsert: function(storyAttributes) {
    check(Meteor.userId(), String);
    check(storyAttributes, {
      title: String
    });

    var errors = validateStory(storyAttributes);
    if (errors.title)
      throw new Meteor.Error('invalid-story', "You must set a title and URL for your story");

    var user = Meteor.user();
    var story = _.extend(storyAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    var storyId = Stories.insert(story);

    return {
      _id: storyId
    };
  }
});
