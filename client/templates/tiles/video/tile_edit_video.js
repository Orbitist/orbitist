Template.tileEditVideo.onCreated(function() {
  Session.set('tileEditVideoErrors', {});
});

Template.tileEditVideo.helpers({
  errorMessage: function(field) {
    return Session.get('tileEditVideoErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileEditVideoErrors')[field] ? 'has-error' : '';
  },
  uploadingVideo: function(n) {
    return Session.equals('uploadingVideo', n);
  }
});


Template.tileEditVideo.events({
  "change input[type='file']": function(e, template) {
    Session.set('uploadingVideo', 'true');
    var files;
    files = e.currentTarget.files;
    return Cloudinary.upload(files, {
      resource_type: "video"
      // folder: "secret",
      // type: "private"
    }, function(error, result) {
      if (error){
        return throwError(error)
      }
      Session.set('videoUrlVar', result.secure_url);
      Session.set('videoIdVar', result.public_id);
      Session.set('uploadingVideo', 'false');
      $( '.videoUploadThumb' ).replaceWith('<video class="img-responsive" controls poster="https://res.cloudinary.com/orbitist/video/upload/' + result.public_id + '.jpg"><source src="https://res.cloudinary.com/orbitist/video/upload/' + result.public_id + '.webm" type="video/webm"/><source src="https://res.cloudinary.com/orbitist/video/upload/' + result.public_id + '.mp4" type="video/mp4"/><source src="https://res.cloudinary.com/orbitist/video/upload/' + result.public_id + '.ogv" type="video/ogg"/></video>');

    });
  },

  'submit form': function(e, template) {
    e.preventDefault();

    var videoUrlVar = Session.get('videoUrlVar');
    var videoIdVar = Session.get('videoIdVar');

    var $checkVideoField = $(e.target).find('[name=video]');
    var videoInput = $checkVideoField.val();
    if (videoInput < 1) {
      videoUrlVar = this.videoUrl;
      videoIdVar = this.videoId;
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
      videoUrl: videoUrlVar,
      videoId: videoIdVar,
      latitude: latInput,
      longitude: lngInput
    }

    var errors = {};
    if (! tileProperties.videoUrl) {
      errors.video = "Please select an video.";
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
