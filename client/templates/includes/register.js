if (Meteor.isClient) {
  Template.register.events({
    'submit form': function(event){
      event.preventDefault();
      var emailVar = event.target.registerEmail.value;
      var passwordVar = event.target.registerPassword.value;
      console.log("Form submitted.");
      Accounts.createUser({
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
