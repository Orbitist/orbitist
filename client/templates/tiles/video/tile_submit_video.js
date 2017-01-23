Template.tileSubmitVideo.onCreated(function() {
  Session.set('tileSubmitErrors', {});
});

Template.tileSubmitVideo.helpers({
  errorMessage: function(field) {
    return Session.get('tileSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileSubmitErrors')[field] ? 'has-error' : '';
  },
  uploadingVideo: function(n) {
    return Session.equals('uploadingVideo', n);
  }
});

Template.tileSubmitVideo.events({
  "change input[type='file']": function(e, template) {
    Session.set('uploadingVideo', 'true');
    var files;
    files = e.currentTarget.files;
    return Cloudinary.upload(files, {
      resource_type: "video",
      timeout:6000000
      // folder: "secret",
      // type: "private"
    }, function(error, result) {
      if (error){
        return throwError(error.message)
      }
      Session.set('videoUrlVar', result.secure_url);
      Session.set('videoIdVar', result.public_id);
      Session.set('uploadingVideo', 'false');
      $( '.videoUploadThumb' ).append('<video class="img-responsive" controls poster="https://res.cloudinary.com/orbitist/video/upload/' + result.public_id + '.jpg"><source src="https://res.cloudinary.com/orbitist/video/upload/' + result.public_id + '.webm" type="video/webm"/><source src="https://res.cloudinary.com/orbitist/video/upload/' + result.public_id + '.mp4" type="video/mp4"/><source src="https://res.cloudinary.com/orbitist/video/upload/' + result.public_id + '.ogv" type="video/ogg"/></video>');
    });
  },

  'submit form': function(e, template) {
    e.preventDefault();

    var videoUrlVar = Session.get('videoUrlVar');
    var videoIdVar = Session.get('videoIdVar');

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

    var $tags = $(e.target).find('[name=tags]');
    var tagsInput = $tags.tagsinput('items');

    var $attribution = $(e.target).find('[name=attribution]');
    var attributionInput = $attribution.val();
    if (!attributionInput) {
      attributionInput = '';
    }

    var tile = {
      tileType: 'video',
      text: textInput,
      title: '',
      imageUrl: '',
      imageId: '',
      videoUrl: videoUrlVar,
      videoId: videoIdVar,
      slideshow: [],
      url: '',
      embed: '',
      phone: '',
      email: '',
      hours: '',
      cost: '',
      accessibility: '',
      figure: '',
      icon: '',
      storyId: template.data._id,
      rank: topRank,
      latitude: latInput,
      longitude: lngInput,
      tags: tagsInput,
      attribution: attributionInput
    };

    var errors = {};
    if (! tile.videoUrl) {
      errors.video = "Please select a video.";
      return Session.set('tileSubmitErrors', errors);
    }

    Meteor.call('tileInsert', tile, function(error, tileId) {
      if (error){
        throwError(error.reason);
      } else {
        var $videoField = $(e.target).find('[name=video]');
        $videoField.val('');
        Session.set('tileMenu', 'false');
      }
    });
  }
});
