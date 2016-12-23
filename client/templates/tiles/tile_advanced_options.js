Template.tileAdvancedOptions.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $("#locationSearch").geocomplete({
        map:'#map',
        mapOptions: {
          draggable:true,
          zoom:1,
          zoomControl:false,
          streetViewControl:false,
          mapTypeControl:false,
          mapTypeId: 'hybrid',
          center: {
            lat: 20,
            lng: 0
          }
        },
        markerOptions: {
          draggable: true
        },
        details: '.form-group'
      });

      $("#locationSearch").bind("geocode:dragged", function(event, latLng){
        $("input[name=lat]").val(latLng.lat());
        $("input[name=lng]").val(latLng.lng());
        $("#reset").show();
      });

    }
  });
});


Template.tileAdvancedOptionsEdit.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $("#locationSearch").geocomplete({
        map:'#map',
        mapOptions: {
          draggable:true,
          zoom:1,
          zoomControl:false,
          streetViewControl:false,
          mapTypeControl:false,
          mapTypeId: 'hybrid',
          markerOptions: {
            draggable: true
          },
          center: {
            lat: 20,
            lng: 0
          }
        },
        markerOptions: {
          draggable: true
        },
        details: '.form-group'
      });

      $("#locationSearch").bind("geocode:dragged", function(event, latLng){
        $("input[name=lat]").val(latLng.lat());
        $("input[name=lng]").val(latLng.lng());
        $("#reset").show();
      });

    }
  });
});
