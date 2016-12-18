Meteor.startup(function() {
  GoogleMaps.load({
    key: 'AIzaSyCG1Uapj30o6EtJTpvBNPBlJZF0P6rY5Vo',
    libraries: 'places'  // also accepts an array if you need more than one
  });
});
