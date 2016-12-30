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
      gestureHandling: 'greedy'
    });

    Tiles.find({field:this._id}).forEach(function(point) {
      // Popup Templates
      var popup;
      if (point.tileType == 'text') {
        popup = '<p>' + point.text + '</p>';
      }
      if (point.tileType == 'image') {
        popup = '<img width="300" class="img-responsive" src="https://res.cloudinary.com/orbitist/image/upload/t_1500/' + point.imageId + '"/><br><p>' + point.text + '</p>';
      }
      if (point.tileType == 'video') {
        popup = '<video width="300" controls poster="https://res.cloudinary.com/orbitist/video/upload/' + point.videoId + '.jpg"><source src="https://res.cloudinary.com/orbitist/video/upload/' + point.videoId + '.webm" type="video/webm"/><source src="https://res.cloudinary.com/orbitist/video/upload/' + point.videoId + '.mp4" type="video/mp4"/><source src="https://res.cloudinary.com/orbitist/video/upload/' + point.videoId + '.ogv" type="video/ogg"/></video><br><p>' + point.text + '</p>';
      }
      if (point.tileType == 'iframe') {
        popup = point.iframe + '<p>' + point.text + '</p>';
      }
      if (point.tileType == 'pointOfInterest') {
        popup = '<img width="300" class="img-responsive" src="https://res.cloudinary.com/orbitist/image/upload/t_1500/' + point.imageId + '"/>' + '<p class="lead">' + point.title + '</p><p>' + point.text + '</p>';
      }
      // End Popup Templates

      if (point.latitude >= -91) {
        var orbitistIcon = {
          url: 'https://res.cloudinary.com/orbitist/image/upload/c_scale,w_60/v1481982860/eee0g1qjw3nh4p7doruq.png',
          size: new google.maps.Size(30, 30),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(15, 30),
          scaledSize: new google.maps.Size(30, 30)
        };
        var infowindow = new InfoBox({
          content: popup,
          boxClass: 'popup-content',
          disableAutoPan: false,
          maxWidth: 0,
          alignBottom: true,
          pixelOffset: new google.maps.Size(-150, -40),
          zIndex: null,
          boxStyle: {
           background: "none",
           opacity: 1,
           width: "300px"
          },
          closeBoxMargin: "0px 0px -20px 0px",
          closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
          infoBoxClearance: new google.maps.Size(20, 20),
          isHidden: false,
          pane: "floatPane",
          enableEventPropagation: false,
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
