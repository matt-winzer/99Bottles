$(document).ready(function() {
  $('select').material_select();

  var styleURL = 'http://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/styles/?key=53f372495b64d9d4e9a86e2a8ca999b4';

  $.get(styleURL, appendStyles);

});

function appendStyles(styleData) {
  console.log(styleData.data.length);
  console.log(styleData.data[0].name);

  for (var i = 0; i < styleData.data.length; i++) {
    $('#beerType').append('<option value="' + (1 + i) + '">' + styleData.data[i].name + '</option>');
  }
  $('select').material_select();
}
