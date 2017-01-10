Template.tileEditSlideshow.onCreated(function() {
  Session.set('tileEditSlideshowErrors', {});
});

Template.tileEditSlideshow.helpers({
  errorMessage: function(field) {
    return Session.get('tileEditSlideshowErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileEditSlideshowErrors')[field] ? 'has-error' : '';
  },
  uploadingSlideshow: function(n) {
    return Session.equals('uploadingSlideshow', n);
  }
});


Template.tileEditSlideshow.events({
  "change input[type='file']": function(e, template) {
    Session.set('uploadingSlideshow', 'true');
    var files;
    files = e.currentTarget.files;
    return Cloudinary.upload(files, {
      // folder: "secret",
      // type: "private"
    }, function(error, result) {
      if (error){
        return throwError(error)
      }
      Session.set('slideshowUrlVar', result.secure_url);
      Session.set('slideshowIdVar', result.public_id);
      Session.set('uploadingSlideshow', 'false');
      $( '.slideshowUploadThumb' ).replaceWith( '<img class="img-responsive" src="https://res.cloudinary.com/orbitist/slideshow/upload/t_1500/' + result.public_id + '"/>');

    });
  },

  'submit form': function(e, template) {
    e.preventDefault();

    var slideshowUrlVar = Session.get('slideshowUrlVar');
    var slideshowIdVar = Session.get('slideshowIdVar');

    var $checkSlideshowField = $(e.target).find('[name=slideshow]');
    var slideshowInput = $checkSlideshowField.val();
    if (slideshowInput < 1) {
      slideshowUrlVar = this.slideshowUrl;
      slideshowIdVar = this.slideshowId;
    }

    var $text = $(e.target).find('[name=text]');
    var textInput = $text.val();
    if (!textInput) {
      textInput = '';
    }

    var $lat = $(e.target).find('[name=lat]');
    var latInput = Number($lat.val());
    if (!latInput) {
      latInput = NaN;
    }

    var $lng = $(e.target).find('[name=lng]');
    var lngInput = Number($lng.val());
    if (!lngInput) {
      lngInput = NaN;
    }

    var currentTileId = this._id;
    var tileProperties = {
      text: textInput,
      slideshowUrl: slideshowUrlVar,
      slideshowId: slideshowIdVar,
      latitude: latInput,
      longitude: lngInput
    }

    var errors = {};
    if (! tileProperties.slideshowUrl) {
      errors.slideshow = "Please select an slideshow.";
      return Session.set('tileSubmitErrors', errors);
    }
    Tiles.update(currentTileId, {$set: tileProperties}, function(error) {
      if (error) {
        return throwError(error.reason);
      }
    });
    Router.go('storyEdit', {_id: this.storyId});
  },
  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this tile?")) {
      var currentTileId = this._id;
      Tiles.remove(currentTileId);
      Router.go('storyEdit', {_id: this.storyId});
    }
  }
});
