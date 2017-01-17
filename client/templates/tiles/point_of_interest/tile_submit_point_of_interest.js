Template.tileSubmitPointOfInterest.onCreated(function() {
  Session.set('tileSubmitErrors', {});
});

Template.tileSubmitPointOfInterest.helpers({
  errorMessage: function(field) {
    return Session.get('tileSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileSubmitErrors')[field] ? 'has-error' : '';
  },
  uploadingImage: function(n) {
    return Session.equals('uploadingImage', n);
  }
});

Template.tileSubmitPointOfInterest.events({
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

    var imageUrlVar = Session.get('imageUrlVar');
    var imageIdVar = Session.get('imageIdVar');
    if (!imageUrlVar) {
      imageUrlVar = '';
      imageIdVar = '';
    }


    var topTile = Tiles.findOne({storyId: template.data._id}, {sort: {rank: 1}});
    if (topTile) {
      var topRank = topTile.rank - 1;
    } else {
      var topRank = 1;
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

    var $tags = $(e.target).find('[name=tags]');
    var tagsInput = $tags.tagsinput('items');

    var $attribution = $(e.target).find('[name=attribution]');
    var attributionInput = $attribution.val();
    if (!attributionInput) {
      attributionInput = '';
    }

    var tile = {
      tileType: 'pointOfInterest',
      text: textInput,
      title: titleInput,
      imageUrl: imageUrlVar,
      imageId: imageIdVar,
      videoUrl: '',
      videoId: '',
      slideshow: [],
      url: '',
      embed: '',
      phone: phoneInput,
      email: emailInput,
      hours: hoursInput,
      cost: costInput,
      accessibility: accessibilityInput,
      storyId: template.data._id,
      rank: topRank,
      latitude: latInput,
      longitude: lngInput,
      tags: tagsInput,
      attribution: attributionInput
    };

    var errors = {};
    if (! tile.title) {
      errors.title = "Please enter a title.";
      return Session.set('tileSubmitErrors', errors);
    }

    Meteor.call('tileInsert', tile, function(error, tileId) {
      if (error){
        throwError(error.reason);
      } else {
        var $imageField = $(e.target).find('[name=image]');
        $imageField.val('');
        Session.set('tileMenu', 'false');
      }
    });
  }
});
