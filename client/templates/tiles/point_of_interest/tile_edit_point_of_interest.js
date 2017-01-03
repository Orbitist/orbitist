Template.tileEditPointOfInterest.onCreated(function() {
  Session.set('tileEditImageErrors', {});
});

Template.tileEditPointOfInterest.helpers({
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


Template.tileEditPointOfInterest.events({
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
      $( '.imageUploadThumb' ).replaceWith( '<img class="img-responsive" src="https://res.cloudinary.com/orbitist/image/upload/t_1500/' + result.public_id + '"/>');

    });
  },

  'submit form': function(e, template) {
    e.preventDefault();

    var imageUrlVar = Session.get('imageUrlVar');
    var imageIdVar = Session.get('imageIdVar');

    var $checkImageField = $(e.target).find('[name=image]');
    var imageInput = $checkImageField.val();
    if (imageInput < 1 && this.imageUrl > 1) {
      imageUrlVar = this.imageUrl;
      imageIdVar = this.imageId;
    } else if (imageInput < 1 && this.imageUrl < 1) {
      imageUrlVar = '';
      imageIdVar = '';
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

    var $phone = $(e.target).find('[name=phone]');
    var phoneInput = $phone.val();
    if (!phoneInput) {
      phoneInput = '';
    }

    var $email = $(e.target).find('[name=email]');
    var emailInput = $email.val();
    if (!emailInput) {
      emailInput = '';
    }

    var $hours = $(e.target).find('[name=hours]');
    var hoursInput = $hours.val();
    if (!hoursInput) {
      hoursInput = '';
    }

    var $cost = $(e.target).find('[name=cost]');
    var costInput = $cost.val();
    if (!costInput) {
      costInput = '';
    }

    var $accessibility = $(e.target).find('[name=accessibility]');
    var accessibilityInput = $accessibility.val();
    if (!accessibilityInput) {
      accessibilityInput = '';
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
      title: titleInput,
      imageUrl: imageUrlVar,
      imageId: imageIdVar,
      phone: phoneInput,
      email: emailInput,
      hours: hoursInput,
      cost: costInput,
      accessibility: accessibilityInput,
      latitude: latInput,
      longitude: lngInput
    }

    var errors = {};
    if (! tileProperties.title) {
      errors.title = "Please add a title.";
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
