// Set session variable for which tile form to use

Template.storyPage.events({
  'click .create-tile': function() {
    return Session.set('tileMenu', 'true');
  }
});

Template.storyPage.helpers({
  tiles: function() {
    return Tiles.find({storyId: this._id}, {sort: {rank: 1}});
  },
  showTileMenu: function(n) {
    return Session.equals('tileMenu', n);
  },
  ownStory: function() {
    return this.userId === Meteor.userId();
  }
});

//Once the Template is rendered, run this function which
//  sets up JQuery UI's sortable functionality
Template.storyPage.rendered = function() {
  if (!Meteor.userId()) {return};
  var pageStory = Blaze.getData($('.story')[0]);
  if (pageStory.userId !== Meteor.userId()){return};
   this.$('#tile-items').sortable({
       stop: function(e, ui) {
         // get the dragged html element and the one before
         //   and after it
         el = ui.item.get(0)
         before = ui.item.prev().get(0)
         after = ui.item.next().get(0)

         // Here is the part that blew my mind!
         //  Blaze.getData takes as a parameter an html element
         //    and will return the data context that was bound when
         //    that html element was rendered!
         if(!before) {
           //if it was dragged into the first position grab the
           // next element's data context and subtract one from the rank
           newRank = Blaze.getData(after).rank - 1
         } else if(!after) {
           //if it was dragged into the last position grab the
           //  previous element's data context and add one to the rank
           newRank = Blaze.getData(before).rank + 1
         }
         else
           //else take the average of the two ranks of the previous
           // and next elements
           newRank = (Blaze.getData(after).rank +
                      Blaze.getData(before).rank)/2

         //update the dragged Item's rank
         Tiles.update({_id: Blaze.getData(el)._id}, {$set: {rank: newRank}})
       }
   })
   $('.navbar').css('margin-top', '0px');
 }
