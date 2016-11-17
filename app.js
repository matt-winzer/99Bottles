$(document).ready(function() {
  //Initialize Select
  $('select').material_select();
  //Store URL for styles GET request
  var styleURL = 'https://galvanize-cors-proxy.herokuapp.com/https://api.brewerydb.com/v2/styles/?key=53f372495b64d9d4e9a86e2a8ca999b4';
  //GET request for beer styles
  $.get(styleURL, appendStyles);
});

function appendStyles(styleData) {
  sortStyles(styleData);
  //Iterate through styleData object from GET request
  for (var i = 0; i < styleData.data.length; i++) {
    $('#beerType').append('<option value="' + styleData.data[i].id + ',' + i + '">' + styleData.data[i].name + '</option>');
  }
  //Re-initialize Select
  $('select').material_select();
  //On select change, append card with style info
  $('#beerType').change(addStyleCard);

  function addStyleCard() {
    var parts = this.value.split(',');
    var index = parts[1];
    var name = styleData.data[index].name;
    var description = styleData.data[index].description;
    var abvMin = styleData.data[index].abvMin;
    var abvMax = styleData.data[index].abvMax;
    var abvRange = abvMin + ' - ' + abvMax;
    if (abvMin === undefined || abvMax === undefined) {
      abvRange = 'N/A';
    }
    var ibuMin = styleData.data[index].ibuMin;
    var ibuMax = styleData.data[index].ibuMax;
    var ibuRange = ibuMin + ' - ' + ibuMax;
    if (ibuMin === undefined || ibuMax === undefined) {
      ibuRange = 'N/A';
    }
    var styleId = parts[0];
    var beerUrl = 'https://galvanize-cors-proxy.herokuapp.com/https://api.brewerydb.com/v2/beers/?key=53f372495b64d9d4e9a86e2a8ca999b4&styleId=' + styleId + '&hasLabels=y&withBreweries=y';
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
                '<p class="abv-range">ABV: ' + abvRange + '%</p>' +
                '<img class="hops-image" src="img/Hops-52-Orange.png" alt="hops"/>' +
                '<p class="ibu-range">IBU: ' + ibuRange + '</p>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
    // GET request for beer data based on value of select
    $.get(beerUrl, addBeerCards)
      .then(function(beerData) {
        if (beerData.numberOfPages > 1) {
          for (var j = 2; j <= beerData.numberOfPages; j++) {
            var newUrl = beerUrl + '&p=' + j;
            $.get(newUrl, addBeerCards);
          }
        }
      });
  }
}

// function triggerModal() {
//   console.log('Modal Trigger');
//   console.log(this.id);
//   var beerId = this.id;
//   var beerIdUrl = 'https://galvanize-cors-proxy.herokuapp.com/https://api.brewerydb.com/v2/beer/' + beerId + '/?key=53f372495b64d9d4e9a86e2a8ca999b4';
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
  for (var i = 0; i < beerData.data.length; i++) {
    var img = beerData.data[i].labels.large;
    var name = beerData.data[i].name;
    var id = beerData.data[i].id;
    var abv = beerData.data[i].abv;
    var ibu = beerData.data[i].ibu;
    var organic = beerData.data[i].isOrganic;
    var brewery = beerData.data[i].breweries[0].name;
    var description = beerData.data[i].description;
    if (description === undefined) {
      description = 'No description is currently available for this beer.';
    }
    if (abv === undefined) {
      abv = 'N/A';
    }
    if (ibu === undefined) {
      ibu = 'N/A';
    }
    if (organic === 'Y') {
      organic = 'Yes';
    } else {
      organic = 'No';
    }
    appendBeers(img, name, id, description, abv, ibu, organic, brewery);
  }
  return beerData;
}

function appendBeers(beerImage, beerName, beerId, beerDescription, beerABV, beerIBU, organic, brewery) {
  $('#beerCards').append(
    '<div class="beer-card-container col s12 m6 l4">' +
      '<div class="card sticky-action beer-card hoverable">' +
        '<div class="card-image">' +
          '<img id="' + beerId + '" class="activator" src="' + beerImage + '">' +
        '</div>' +
          '<div class="beer-name-container card-action grey darken-4">' +
            '<p class="beer-name center-align truncate">' + beerName + '</p>' +
          '</div>' +
          '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + brewery + '<i class="material-icons right">close</i></span>' +
            '<p>' + beerDescription + '</p>' +
            '<div class="ibu-organic-container">' +
              '<span class="grey-text text-darken-4">ABV: ' + beerABV + '%' + '</span>' +
              '<span class="grey-text text-darken-4">IBU: ' + beerIBU + '</span>' +
              '<span class="grey-text text-darken-4">Organic: ' + organic + '</span>' +
            '</div>' +
          '</div>' +
      '</div>' +
    '</div>'
  );
}

// Sort function
function sortStyles (styles) {
  styles.data.sort(function(a, b){
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
}
