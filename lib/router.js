Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

StoriesListController = RouteController.extend({
  template: 'storiesList',
  increment: 10,
  storiesLimit: function() {
    return parseInt(this.params.storiesLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: {submitted: -1}, limit: this.storiesLimit()};
  },
  subscriptions: function() {
    this.storiesSub = Meteor.subscribe('stories', this.findOptions());
  },
  stories: function() {
    return Stories.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.stories().count() === this.storiesLimit();
    var nextPath = this.route.path({storiesLimit: this.storiesLimit() + this.increment});
    return {
      stories: this.stories(),
      ready: this.storiesSub.ready,
      nextPath: hasMore ? nextPath : null
    };
  }
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
  name: 'storiesList'
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
