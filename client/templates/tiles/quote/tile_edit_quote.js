Template.tileEditQuote.onCreated(function() {
  Session.set('tileEditImageErrors', {});
});

Template.tileEditQuote.helpers({
  errorMessage: function(field) {
    return Session.get('tileEditImageErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileEditImageErrors')[field] ? 'has-error' : '';
  },
  uploadingImage: function(n) {
    return Session.equals('uploadingImage', n);
  },
  hasImage: function() {
    return this.imageUrl.length > 1;
  }
});


Template.tileEditQuote.events({
  "change input[type='file']": function(e, template) {
    Session.set('uploadingImage', 'true');
    var files;
    files = e.currentTarget.files;
    return Cloudinary.upload(files, {
      // folder: "secret",
      // type: "private"
    }, function(error, result) {
      if (error){
        return throwError(error)
      }
      Session.set('imageUrlVar', result.secure_url);
      Session.set('imageIdVar', result.public_id);
      Session.set('uploadingImage', 'false');
      $( '.imageUploadThumb' ).html('<img class="img-responsive" src="https://res.cloudinary.com/orbitist/image/upload/t_1500/' + result.public_id + '"/><a href="#" class="btn btn-danger btn-xs delete-image"><span class="fa fa-close"></span> Delete Image</a>');

    });
  },
  'click .delete-image': function() {
    Session.set('imageUrlVar', '');
    Session.set('imageIdVar', '');
    $( '.imageUploadThumb' ).html('');
  },

  'submit form': function(e, template) {
    e.preventDefault();

    var currentTileId = this._id;

    var imageUrlVar = Session.get('imageUrlVar');
    var imageIdVar = Session.get('imageIdVar');
    var $checkImageField = $(e.target).find('[name=image]');
    var imageInput = $checkImageField.val();
    if (imageInput < 1 && this.imageUrl > 1) {
      imageUrlVar = this.imageUrl;
      imageIdVar = this.imageId;
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

    var $tags = $(e.target).find('[name=tags]');
    var tagsInput = $tags.tagsinput('items');

    var tileProperties = {
      text: $(e.target).find('[name=quote]').val(),
      dictator: $(e.target).find('[name=dictator]').val(),
      imageUrl: imageUrlVar,
      imageId: imageIdVar,
      latitude: latInput,
      longitude: lngInput,
      tags: tagsInput,
      attribution: $(e.target).find('[name=attribution]').val()
    }

    var errors = {};
    if (! tileProperties.text) {
      errors.quote = "Please add a quote.";
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
