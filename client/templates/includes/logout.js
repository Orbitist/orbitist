if(Meteor.isClient){
  Template.logout.events({
  	'click .logout': function(event){
  		event.preventDefault();
      Session.set('currentLoginScreen', 'login');
  		Meteor.logout();
  	}
  });
}
