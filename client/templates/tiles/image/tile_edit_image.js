Template.tileEditImage.onCreated(function() {
  Session.set('tileEditImageErrors', {});
});

Template.tileEditImage.helpers({
  errorMessage: function(field) {
    return Session.get('tileEditImageErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileEditImageErrors')[field] ? 'has-error' : '';
  },
  uploadingImage: function(n) {
    return Session.equals('uploadingImage', n);
  }
});


Template.tileEditImage.events({
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
      $( '.imageUploadThumb' ).html( '<img class="img-responsive" src="https://res.cloudinary.com/orbitist/image/upload/t_1500/' + result.public_id + '"/><a href="#" class="btn btn-danger btn-xs delete-image"><span class="fa fa-close"></span> Delete Image</a>');

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
    if (imageInput < 1) {
      imageUrlVar = this.imageUrl;
      imageIdVar = this.imageId;
    }

    var $text = $(e.target).find('[name=text]');
    var textInput = $text.val();
    if (!textInput) {
      textInput = '';
    }

    var $title = $(e.target).find('[name=title]');
    var titleInput = $title.val();
    if (!titleInput) {
      titleInput = '';
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

    var $attribution = $(e.target).find('[name=attribution]');
    var attributionInput = $attribution.val();
    if (!attributionInput) {
      attributionInput = '';
    }

    var tileProperties = {
      text: textInput,
      title: titleInput,
      imageUrl: imageUrlVar,
      imageId: imageIdVar,
      latitude: latInput,
      longitude: lngInput,
      tags: tagsInput,
      attribution: attributionInput
    }

    var errors = {};
    if (! tileProperties.imageUrl) {
      errors.image = "Please select an image.";
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
