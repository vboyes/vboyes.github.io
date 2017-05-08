$(document).ready(function() {
  $('#pokeGet').click(loadPoke);
  $('#nextButton').click(loadNext);
  $('#previousButton').click(loadPrevious)
});
function loadPoke() {
  var pokeID = $('#pokeNum').val();
  $.ajax({
    url: 'http://pokeapi.co/api/v2/pokemon/' + pokeID + '/',
    success: apiSuccess,
    error: apiFail
  });
  }

function apiFail() {
  alert("Something went wrong. Please check that you have entered a valid name or number ID and try again.");
}

function apiSuccess(pokemonData) {
  loadTitle(pokemonData);
  loadPokeFront(pokemonData);
  loadPokeBack(pokemonData);
  loadTypes(pokemonData);
  loadDescription(pokemonData);
  loadWeakness(pokemonData);
}

function loadTitle(pokemonData) {
  $('#pokeName').html(pokemonData.name);
}

function loadPokeFront(pokemonData) {
  var pokeFront = pokemonData.sprites.front_default;
  $('#pokeImage').html("<img src='" + pokeFront + "'>")
}

function loadPokeBack(pokemonData) {
  var pokeBack = pokemonData.sprites.back_default;
  $('#pokeImage').append("<img src='" + pokeBack + "'>")
}

function loadTypes(pokemonData) {
  $('#pokeType').html("<h3>Types</h3>");
  pokemonData.types.forEach(function (entry) {
    $('#pokeType').append("<br><span class='type " + entry.type.name + "'>" + entry.type.name + "</span><br><br>");
  });
}

function loadDescription(pokemonData) {
  $.ajax({
    url: pokemonData.species.url,
    success: apiDesSuccess,
    error: apiFail
  });

  function apiDesSuccess(speciesData) {
    speciesData.flavor_text_entries.some(function( entry ) {
      if (entry.language.name == 'ko') {
        $('#pokeDes').html("<h3>Description</h3>" + entry.flavor_text);
        return true;
      }
    });
  }
}

function loadWeakness(pokemonData) {
  $.ajax({
    url: pokemonData.types[0].type.url,
    success: apiWeakSuccess,
    error: apiTypeFail
  });

  function apiWeakSuccess(typeData) {
    $('#pokeWeakness').html('<h3>Weaknesses</h3>');
    typeData.damage_relations.double_damage_from.forEach(function (entry){
      $('#pokeWeakness').append("<br><span class='weakness " + entry.name + "'>" + entry.name + "</span><br><br>");
    });
  }
}

function apiTypeFail(typeData) {
  alert("apiTypeFail")
}

function loadPrevious() {
  val = $('#pokeNum').val();
  val--;
  $('#pokeNum').val(val);
  loadPoke();

}

function loadNext() {
  val = $('#pokeNum').val();
  val++;
  $('#pokeNum').val(val);
  loadPoke();

}
