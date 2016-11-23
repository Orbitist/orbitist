if (Stories.find().count() === 0) {
  Stories.insert({
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/'
  });

  Stories.insert({
    title: 'Meteor',
    url: 'http://meteor.com'
  });

  Stories.insert({
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com'
  });
}
