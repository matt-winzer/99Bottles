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
    $('#beerType').append('<option value="' + styleData.data[i].name + '">' + styleData.data[i].name + '</option>');
  }
  //Re-initialize Select
  $('select').material_select();
  //On select change, append card with style info
  $('#beerType').change(addStyleCard);


  function addStyleCard() {
    console.log($(this).val());

    $('#styleCard').append(
      '<div class="col s12 m7"><h2 class="header">Horizontal Card</h2><div class="card horizontal"><div class="card-image"><img src="http://lorempixel.com/100/190/nature/6"></div><div class="card-stacked"><div class="card-content"><p>I am a very simple card. I am good at containing small bits of information.</p></div><div class="card-action"><a href="#">This is a link</a></div></div></div></div>');

  }
}
