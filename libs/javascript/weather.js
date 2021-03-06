$("#searchCity").click(function () {
  var term = $("#city").val();
  term = term.replace(/\s/g, "%20");

  $.ajax({
    url: "/geo/libs/php/search.php",
    type: "POST",
    dataType: "json",
    data: {
      searchTerm: term,
    },
    success: function (result) {
      console.log(result["geonames"]);

      var response = result["geonames"][0];
      if (typeof response === "undefined" || typeof response === "null") {
        alert("Error");
        location.reload();
      }

      var lng = response["lng"];
      var lat = response["lat"];
      var city = response["name"];
      var address =
        response["name"] +
        ", " +
        response["countryName"] +
        ", " +
        response["countryCode"];
      var gUrl = `https://maps.google.com/maps?q=${city}&t=&z=11&ie=UTF8&iwloc=&output=embed`;

      $("#txtLng").html("Longitude: " + lng);
      $("#txtLat").html("Latitude: " + lat);
      $("#txtAddress").html("Address: " + address);
      $("#gmap_canvas").attr("src", gUrl);
      $("input").val("");

      $.ajax({
        url: "/geo/libs/php/weather.php",
        type: "POST",
        dataType: "json",
        data: {
          lng: lng,
          lat: lat,
        },
        success: function (result) {
          console.log(result["weatherObservation"]);
          var response = result["weatherObservation"];
          if (typeof response === "undefined" || typeof response === "null") {
            alert("Error");
            location.reload();
          }
          var temp = response["temperature"];
          var humidity = response["humidity"];
          var str = `<tr><td>Temperature: ${temp} &#8451;</td></tr><tr><td>Humidity: ${humidity}% </td></tr>`;
          $("#txtTitle").html("Weather");
          $("#aside").html(str);
        },
      });
    },
    error: function (xhr, ajaxOptions, thrownError) {
      var errorMsg = xhr.status + ": " + xhr.statusText;
      alert("Error - " + errorMsg);
      $("input").val("");
    },
  });
});
