
(function( window, undefined ) {

  var urlNekudo = "https://geoip.nekudo.com/api";
  var urlFreegeoip = "https://freegeoip.net/json/";
  var country = "ES";
  console.log("Checking conection origin...")
  $.getJSON( urlNekudo, {} )
    .done(function( json ) {
      console.log( "Country: " + json.country.code );
      if (country == json.country.code){
        //defer.resolve('done');
        console.log("Conection origin: OK")
      } else {
        location.href = window.location.href.replace(window.location.hash, "")+'notallowed.html';
      }
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
      $.getJSON( urlFreegeoip, {} )
        .done(function( json ) {
          console.log( "Country (second attemp): " + json.country_code );
          if (country == json.country_code){
            console.log("Conection origin: OK")
          } else {
            location.href = window.location.href.replace(window.location.hash, "")+'notallowed.html';
          }
        })
        .fail(function( jqxhr, textStatus, error ) {
          var err = textStatus + ", " + error;
          console.log( "Request Failed (second attemp): " + err );
          //defer.reject();
      });
  });


})(window);
