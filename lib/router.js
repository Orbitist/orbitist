Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/story/:_id', {
  name: 'storyPage',
  waitOn: function() {
    return Meteor.subscribe('tiles', this.params._id);
  },
  data: function() { return Stories.findOne(this.params._id); }
});

Router.route('/story/:_id/edit', {
  name: 'storyEdit',
  data: function() { return Stories.findOne(this.params._id); }
});

Router.route('/submit', {name: 'storySubmit'});

Router.route('/:storiesLimit?', {
  name: 'storiesList',
  waitOn: function() {
    var limit = parseInt(this.params.storiesLimit) || 5;
    return Meteor.subscribe('stories', {sort: {submitted: -1}, limit: limit});
  },
  data: function() {
    var limit = parseInt(this.params.storiesLimit) || 5;
    return {
      stories: Stories.find({}, {sort: {submitted: -1}, limit: limit})
    };
  }
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'storyPage'});
Router.onBeforeAction(requireLogin, {only: 'storySubmit'});
