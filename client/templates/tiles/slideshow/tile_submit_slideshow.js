Template.tileSubmitSlideshow.onCreated(function() {
  Session.set('tileSubmitErrors', {});
});

Template.tileSubmitSlideshow.helpers({
  errorMessage: function(field) {
    return Session.get('tileSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileSubmitErrors')[field] ? 'has-error' : '';
  },
  uploadingSlideshow: function(n) {
    return Session.equals('uploadingSlideshow', n);
  }
});

Template.tileSubmitSlideshow.events({
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
      $( '.slideshowUploadThumb' ).append( '<img class="img-responsive" src="https://res.cloudinary.com/orbitist/slideshow/upload/t_1500/' + result.public_id + '"/>');

    });
  },

  'submit form': function(e, template) {
    e.preventDefault();

    var slideshowUrlVar = Session.get('slideshowUrlVar');
    var slideshowIdVar = Session.get('slideshowIdVar');

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

    var tile = {
      tileType: 'slideshow',
      text: textInput,
      title: '',
      slideshowUrl: slideshowUrlVar,
      slideshowId: slideshowIdVar,
      videoUrl: '',
      videoId: '',
      url: '',
      embed: '',
      phone: '',
      email: '',
      hours: '',
      cost: '',
      accessibility: '',
      storyId: template.data._id,
      rank: topRank,
      latitude: latInput,
      longitude: lngInput
    };

    var errors = {};
    if (! tile.slideshowUrl) {
      errors.slideshow = "Please select an slideshow.";
      return Session.set('tileSubmitErrors', errors);
    }

    Meteor.call('tileInsert', tile, function(error, tileId) {
      if (error){
        throwError(error.reason);
      } else {
        var $slideshowField = $(e.target).find('[name=slideshow]');
        $slideshowField.val('');
        Session.set('tileMenu', 'false');
      }
    });
  }
});
