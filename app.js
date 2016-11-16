$(document).ready(function() {
  //Initialize Select
  $('select').material_select();
  // Initialize modal
  $('.modal').modal();
  //Store URL for styles GET request
  var styleURL = 'http://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/styles/?key=53f372495b64d9d4e9a86e2a8ca999b4';
  //GET request for beer styles
  $.get(styleURL, appendStyles);
});

function appendStyles(styleData) {
  //Iterate through styleData object from GET request
  for (var i = 0; i < styleData.data.length; i++) {
    $('#beerType').append('<option value="' + i + '">' + styleData.data[i].name + '</option>');
  }
  //Re-initialize Select
  $('select').material_select();
  //On select change, append card with style info
  $('#beerType').change(addStyleCard);

  function addStyleCard() {
    var index = $(this).val();
    var name = styleData.data[index].name;
    var description = styleData.data[index].description;
    var abvMin = styleData.data[index].abvMin;
    var abvMax = styleData.data[index].abvMax;
    var ibuMin = styleData.data[index].ibuMin;
    var ibuMax = styleData.data[index].ibuMax;
    var styleId = parseInt(index) + 1;
    var beerUrl = 'http://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/beers/?key=53f372495b64d9d4e9a86e2a8ca999b4&styleId=' + styleId + '&hasLabels=y';
    // Remove previous content from #styleCard
    $('#styleCard').empty();
    // Remove previous content from #beerCards
    $('#beerCards').empty();
    //Append new content to #styleCard
    $('#styleCard').append(
      '<div class="col s12">' +
        '<h2 class="header center-align">' + name + '</h2>' +
        '<div class="card horizontal">' +
          '<div class="card-stacked">' +
            '<div class="card-content">' +
              '<p>' + description + '</p>' +
            '</div>' +
            '<div class="card-action grey darken-4">' +
              '<div class="valign-wrapper infoGroup">' +
                '<img class="alcohol-image" src="img/wine-bottle-orange.png" alt="alcohol"/>' +
                '<p class="abv-range">ABV: ' + abvMin + ' - ' + abvMax + '%</p>' +
                '<img class="hops-image" src="img/Hops-52-Orange.png" alt="hops"/>' +
                '<p class="ibu-range">IBUs: ' + ibuMin + ' - ' + ibuMax + '</p>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
    // GET request for beer data based on value of select
    $.get(beerUrl, addBeerCards)
      .then(function(beerData) {
        // console.log('.then chain is working');
        // console.log(beerData);
        if (beerData.numberOfPages > 1) {
          for (var j = 2; j <= beerData.numberOfPages; j++) {
            var newUrl = beerUrl + '&p=' + j;
            $.get(newUrl, addBeerCards);
          }
        }
      });
      // .then(function(){
      //   var $beerCards = $('.beer-card-container');
      //   // console.log($beerCards.html());
      //   $beerCards.click(triggerModal);
      // });
  }
}

// function triggerModal() {
//   console.log('Modal Trigger');
//   console.log(this.id);
//   var beerId = this.id;
//   var beerIdUrl = 'http://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/beer/' + beerId + '/?key=53f372495b64d9d4e9a86e2a8ca999b4';
//   $.get(beerIdUrl, populateModal);
// }
//
// function populateModal(beerIdData) {
//   console.log(beerIdData);
//   var beerName = beerIdData.data.name;
//   var beerDescription = beerIdData.data.description;
//   $('.modal-header').text(beerName);
//   $('.modal-description').text(beerDescription);
// }

function addBeerCards(beerData) {
  // console.log(beerData);
  // console.log(beerData.data.length);
  // console.log('Number of pages: ' + beerData.numberOfPages);
  // console.log('Current Page: ' + beerData.currentPage);

  for (var i = 0; i < beerData.data.length; i++) {
    var img = beerData.data[i].labels.large;
    var name = beerData.data[i].name;
    var id = beerData.data[i].id;
    var description = beerData.data[i].description;
    if (description === undefined) {

    }
    appendBeers(img, name, id, description);
  }
  return beerData;
}

function appendBeers(beerImage, beerName, beerId, beerDescription) {
  $('#beerCards').append(
    '<div id="' + beerId +'" class="beer-card-container col s12 m6 l4">' +
      '<div class="card beer-card hoverable">' +
        '<div class="card-image">' +
          '<img class="activator" src="' + beerImage + '">' +
        '</div>' +
          '<div class="beer-name-container card-action grey darken-4">' +
            '<p class="beer-name center-align truncate">' + beerName + '</p>' +
          '</div>' +
          '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>' +
            '<p>' + beerDescription + '</p>' +
          '</div>' +
      '</div>' +
    '</div>'
  );
}
