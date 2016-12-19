Template.tileLocationControl.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $("#locationSearch").geocomplete({map:'#map', mapOptions:{draggable:false, zoom:1, zoomControl:false, streetViewControl:false, mapTypeControl:false, mapTypeId: 'hybrid', center:{lat: 20, lng: 0}}, details:'.form-group'});
    }
  });
});


Template.tileLocationControlEdit.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $("#locationSearch").geocomplete({map:'#map', mapOptions:{draggable:false, zoom:1, zoomControl:false, streetViewControl:false, mapTypeControl:false, mapTypeId: 'hybrid', center:{lat: 20, lng: 0}}, details:'.form-group'});
    }
  });
});
