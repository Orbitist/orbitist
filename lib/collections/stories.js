Stories = new Mongo.Collection('stories');

validateStory = function (story) {
  var errors = {};

  if (!story.title)
    errors.title = "Please fill in a headline";

  if (!story.url)
    errors.url =  "Please fill in a URL";

  return errors;
}

Stories.allow({
  update: function(userId, story) { return ownsDocument(userId, story); },
  remove: function(userId, story) { return ownsDocument(userId, story); }
});

Stories.deny({
  update: function(userId, story, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Meteor.methods({
  storyInsert: function(storyAttributes) {
    check(Meteor.userId(), String);
    check(storyAttributes, {
      title: String,
      url: String
    });

    var errors = validateStory(storyAttributes);
    if (errors.title || errors.url)
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
