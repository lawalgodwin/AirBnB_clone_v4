$(document).ready(function () {
  const amenities = {};
  $('li input[type="checkbox"]').change(function () {
    if (this.checked) {
      amenities[this.dataset.name] = this.dataset.id;
    } else {
      delete amenities[this.dataset.name];
    }
    const amenityNames = Object.keys(amenities);
    $('div.amenities h4').text(amenityNames.sort().join(', '));
  });
  // get the status of the api to consume
  const API_BASE_URL = "http://127.0.0.1:5001/api/v1/status/";
  $.get(API_BASE_URL, (data) => {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
