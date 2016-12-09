if (Meteor.isClient) {
  Template.register.events({
    'submit form': function(event){
      event.preventDefault();
      var usernameVar = event.target.registerUsername.value;
      var emailVar = event.target.registerEmail.value;
      var passwordVar = event.target.registerPassword.value;
      if (usernameVar.length < 1) {
        return throwError("You must enter a username.");
      };
      Accounts.createUser({
        username: usernameVar,
        email: emailVar,
        password: passwordVar
      },
      function(Error) {
        if (Error)
          return throwError(Error);
      });
    }
  });
}
