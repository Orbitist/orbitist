Template.storySubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var story = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    story._id = Stories.insert(story);
    Router.go('storyPage', story);
  }
});
