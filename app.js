$(document).ready(function() {
  //Initialize Select
  $('select').material_select();

  //Store URL for styles GET request
  var styleURL = 'http://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/styles/?key=53f372495b64d9d4e9a86e2a8ca999b4';

  //GET request for beer styles
  $.get(styleURL, appendStyles);

  //Event listener for Select change


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
    // console.log($(this).val());

    $('#styleCard').append(
      '<div class="col s12">' +
      '<h2 class="header">' + styleData.data[index].name + '</h2>' +
      '<div class="card horizontal">' +
      // '<div class="card-image">' +
      // '<img src="http://lorempixel.com/100/190/nature/6"></div>' +
      '<div class="card-stacked"><div class="card-content">' +
      '<p>' + styleData.data[index].description + '</p></div>' +
      '<div class="card-action grey darken-4"><div class="valign-wrapper infoGroup">' +
      '<img class="alcohol-image" src="img/wine-bottle-orange.png" alt="alcohol"/>' +
      '<p class="abv-range">ABV: ' + styleData.data[index].abvMin + ' - ' + styleData.data[index].abvMax + '%</p>' +
      '<img class="hops-image" src="img/Hops-52-Orange.png" alt="hops"/>' +
      '<p class="ibu-range">IBUs: ' + styleData.data[index].ibuMin + ' - ' + styleData.data[index].ibuMax + '</p>' +
      '</div></div></div></div></div>'
    );

  }
}
