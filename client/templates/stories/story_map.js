Template.storyMap.events({
  'click .create-tile': function() {
    return Session.set('tileMenu', 'true');
  }
});

Template.storyMap.helpers({
  tiles: function() {
    return Tiles.find({storyId: this._id}, {sort: {rank: 1}});
  },
  showTileMenu: function(n) {
    return Session.equals('tileMenu', n);
  },
  ownStory: function() {
    return this.userId === Meteor.userId();
  }
});

Template.storyMap.onRendered(function() {

  function initMap() {

    var bounds = new google.maps.LatLngBounds();
    var map = new google.maps.Map(document.getElementById('map'), {
      //Options
    });

    Tiles.find({field:this._id}).forEach(function(point) {
      if (point.latitude != NaN) {
        var orbitistIcon = {
          url: 'https://res.cloudinary.com/orbitist/image/upload/c_scale,w_60/v1481982860/eee0g1qjw3nh4p7doruq.png',
          size: new google.maps.Size(30, 30),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(15, 30),
          scaledSize: new google.maps.Size(30, 30)
        };
        var infowindow = new google.maps.InfoWindow({
          content: point.text
        });
        var marker = new google.maps.Marker({
          position: {lat: point.latitude, lng: point.longitude},
          icon: orbitistIcon,
          map: map
        });
        bounds.extend(marker.position);
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
        google.maps.event.addListener(map, "click", function(event) {
            infowindow.close();
        });
      }
    });
    map.fitBounds(bounds);

  }

  initMap();

});
