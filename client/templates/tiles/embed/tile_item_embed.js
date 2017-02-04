Template.tileItemEmbed.helpers({
  hasAttribution: function() {
    return this.attribution.length > 1;
  },
  hasText: function() {
    return this.text.length > 1;
  }
});
