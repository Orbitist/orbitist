// Fixture data
// if (Stories.find().count() === 0) {
//   var now = new Date().getTime();
//
//   // create two users
//   var tomId = Meteor.users.insert({
//     profile: { name: 'Tom Coleman' }
//   });
//   var tom = Meteor.users.findOne(tomId);
//   var sachaId = Meteor.users.insert({
//     profile: { name: 'Sacha Greif' }
//   });
//   var sacha = Meteor.users.findOne(sachaId);
//
//   var telescopeId = Stories.insert({
//     title: 'Introducing Telescope',
//     userId: sacha._id,
//     author: sacha.profile.name,
//     url: 'http://sachagreif.com/introducing-telescope/',
//     submitted: new Date(now - 7 * 3600 * 1000)
//   });
//
//   Tiles.insert({
//     storyId: telescopeId,
//     userId: tom._id,
//     author: tom.profile.name,
//     submitted: new Date(now - 5 * 3600 * 1000),
//     text: 'Interesting project Sacha, can I get involved?'
//   });
//
//   Tiles.insert({
//     storyId: telescopeId,
//     userId: sacha._id,
//     author: sacha.profile.name,
//     submitted: new Date(now - 3 * 3600 * 1000),
//     text: 'You sure can Tom!'
//   });
//
//   Stories.insert({
//     title: 'Meteor',
//     userId: tom._id,
//     author: tom.profile.name,
//     url: 'http://meteor.com',
//     submitted: new Date(now - 10 * 3600 * 1000)
//   });
//
//   Stories.insert({
//     title: 'The Meteor Book',
//     userId: tom._id,
//     author: tom.profile.name,
//     url: 'http://themeteorbook.com',
//     submitted: new Date(now - 12 * 3600 * 1000)
//   });
//
//   for (var i = 0; i < 30; i++) {
//     Stories.insert({
//       title: 'Test post #' + i,
//       author: sacha.profile.name,
//       userId: sacha._id,
//       url: 'http://google.com/?q=test-' + i,
//       submitted: new Date(now - i * 3600 * 1000)
//     });
//   }
// }
