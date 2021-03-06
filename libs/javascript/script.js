$("#btnId").click(function () {
  var term = $("#qterm").val();
  term = term.replace(/\s/g, "%20");

  $.ajax({
    url: "/geo/libs/php/getGeoAddress.php",
    type: "POST",
    dataType: "json",
    data: {
      qterm: term,
    },
    success: function (result) {
      console.log(result["address"]);

      var response = result["address"];
      if (typeof response === "undefined" || typeof response === "null") {
        alert("Error");
        location.reload();
      }
      var lng = response["lng"];
      var lat = response["lat"];
      var address =
        response["street"] +
        ", " +
        response["adminName1"] +
        ", " +
        response["countryCode"];
      var gUrl = `https://maps.google.com/maps?q=${lat},%20${lng}&t=&z=17&ie=UTF8&iwloc=&output=embed`;

      $("#txtLng").html("Longitude: " + lng);
      $("#txtLat").html("Latitude: " + lat);
      $("#txtAddress").html("Address: " + address);
      $("#gmap_canvas").attr("src", gUrl);
      $("input").val("");
      $("#aside").empty();
      $("#txtTitle").empty();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      var errorMsg = xhr.status + ": " + xhr.statusText;
      alert("Error - " + errorMsg);
      $("input").val("");
    },
  });
});
