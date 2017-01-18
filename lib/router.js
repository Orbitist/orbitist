Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

StoriesListController = RouteController.extend({
  template: 'storiesList',
  increment: 100,
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
    return Stories.find({userId: Meteor.userId()}, this.findOptions());
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

StoriesAllController = RouteController.extend({
  template: 'storiesList',
  increment: 100,
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
    return [
      Meteor.subscribe('singleStory', this.params._id),
      Meteor.subscribe('tiles', this.params._id)
    ];
  },
  data: function() { return Stories.findOne(this.params._id); }
});

Router.route('/story/:_id/edit', {
  name: 'storyEdit',
  waitOn: function() {
    return [
      Meteor.subscribe('singleStory', this.params._id),
      Meteor.subscribe('tiles', this.params._id)
    ];
  },
  data: function() { return Stories.findOne(this.params._id); }
});

Router.route('/story/:_id/map', {
  name: 'storyMap',
  waitOn: function() {
    return [
      Meteor.subscribe('singleStory', this.params._id),
      Meteor.subscribe('tiles', this.params._id)
    ];
  },
  data: function() { return Stories.findOne(this.params._id); }
});

Router.route('/story/:_id/settings', {
  name: 'storySettings',
  waitOn: function() {
    return Meteor.subscribe('singleStory', this.params._id);
  },
  data: function() { return Stories.findOne(this.params._id); }
});

/////////////////// TILE EDIT PAGES ////////////////////////
Router.route('/tile/:_id/edit', {
  name: 'tileEdit',
  waitOn: function() {
    return Meteor.subscribe('singleTile', this.params._id);
  },
  data: function() { return Tiles.findOne(this.params._id); }
});

Router.route('/story-submit', {name: 'storySubmit'});

Router.route('/user-settings', {name: 'userSettings'});

Router.route('/:storiesLimit?', {
  name: 'storiesList'
});

Router.route('/all/:storiesLimit?', {
  name: 'storiesAll'
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
