Template.loginScreen.created = function() {
  Session.setDefault('currentLoginScreen', 'login');
};

Template.loginScreen.events({
  'click #goRegister': function() {
    return Session.set('currentLoginScreen', 'register');
  },
  'click #goLogin': function() {
    return Session.set('currentLoginScreen', 'login');
  }
});

Template.loginScreen.helpers({
  isCurrentLoginScreen: function(n) {
    return Session.equals('currentLoginScreen', n);
  }
});
