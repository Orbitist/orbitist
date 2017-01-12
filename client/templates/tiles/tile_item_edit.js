Template.tileItemEdit.helpers({
  isStoryEditPage: function() {
    return Router.current().route.getName() == 'storyEdit'
  },
  submittedText: function() {
    return this.submitted.toString();
  },
  ownTile: function() {
    return this.userId === Meteor.userId();
  },
  tileTypeText: function() {
    return this.tileType === 'text';
  },
  tileTypeImage: function() {
    return this.tileType === 'image';
  },
  hasImage: function() {
    return this.imageUrl != '';
  },
  hasText: function() {
    return this.text != '';
  },
  hasPhone: function() {
    return this.phone != '';
  },
  hasEmail: function() {
    return this.email != '';
  },
  hasHours: function() {
    return this.hours != '';
  },
  hasCost: function() {
    return this.cost != '';
  },
  hasAccessibility: function() {
    return this.accessibility != '';
  },
  tileTypeVideo: function() {
    return this.tileType === 'video';
  },
  tileTypeSlideshow: function() {
    return this.tileType === 'slideshow';
  },
  hasSlide: function() {
    return this.url.length > 1;
  },
  hasCaption: function() {
    return this.caption.length > 1;
  },
  tileTypeEmbed: function() {
    return this.tileType === 'embed';
  },
  tileTypePointOfInterest: function() {
    return this.tileType === 'pointOfInterest';
  },
  tileTypeLink: function() {
    return this.tileType === 'link';
  }
});

Template.tileItemEdit.onRendered(function() {
  $(".embed-overlay").click(function() {
      $(".embed-overlay").hide();
      clearTimeout($.data(this, 'overlayTimer'));
      $.data(this, 'overlayTimer', setTimeout(function() {
        $(".embed-overlay").show();
      }, 2000));
  });
});
