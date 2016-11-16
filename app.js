$(document).ready(function() {
  //Initialize Select
  $('select').material_select();

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
  }
}

function addBeerCards(beerData) {
  console.log(beerData);
  console.log(beerData.data.length);
  console.log('Number of pages: ' + beerData.numberOfPages);
  console.log('Current Page: ' + beerData.currentPage);

  for (var i = 0; i < beerData.data.length; i++) {
    var img = beerData.data[i].labels.medium;
    var name = beerData.data[i].name;
    var id = beerData.data[i].id;
    appendBeers(img, name, id);
  }
  return beerData;
}

function appendBeers(beerImage, beerName, beerId) {
  $('#beerCards').append(
    '<div id="' + beerId +'" class="beer-card-container col s6 m4 l3">' +
      '<div class="card beer-card hoverable">' +
        '<div class="card-image">' +
          '<img src="' + beerImage + '">' +
          // '<span class="card-title">Card Title</span>' +
        '</div>' +
        // '<div class="card-content">' +
        //   '<p>' + name + '</p>' +
        // '</div>' +
        // '<div class="beer-name-container">' +
          '<div class="beer-name-container card-action grey darken-4">' +
            '<p class="beer-name center-align truncate">' + beerName + '</p>' +
          '</div>' +
        // '</div>' +
      '</div>' +
    '</div>'
  );
}



// var url = "http://www.omdbapi.com/?s=300"
// $.get(url)
//   .then(function (movieList) {
//     console.log(movieList)
//     // return $.get("http://www.omdbapi.com/?t=" + movieList.Search[0].Title)
//     return movieList.Search[0].Title
//   })
//   .then(function (title) {
//     return $.get("http://www.omdbapi.com/?t=" + title)
//   })
//   .then(function (details) {
//     console.log(details);
//   })
//   .catch(function (err) {
//     console.log(err);
//   })
