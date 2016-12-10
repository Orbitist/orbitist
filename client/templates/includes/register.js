if (Meteor.isClient) {
  Template.register.events({
    'submit form': function(event){
      event.preventDefault();
      var usernameVar = event.target.registerUsername.value;
      var emailVar = event.target.registerEmail.value;
      var email2Var = event.target.registerEmail2.value;
      var passwordVar = event.target.registerPassword.value;
      if (email2Var.length > 0) {
        return throwError("Please pick a different email.");
      };
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
