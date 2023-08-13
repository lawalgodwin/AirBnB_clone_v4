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
  const API_BASE_URL = 'http://127.0.0.1:5001/api/v1/status/';
  $.get(API_BASE_URL, (data) => {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  const PLACES_URL = 'http://127.0.0.1:5001/api/v1/places_search/';
  $.post({
    url: PLACES_URL,
    data: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
    dataType: 'json',
    success: (data) => {
      for (const d of data) {
        const article = `
          <article>
            <div class="title_box">
              <h2>${d.name}</h2>
              <div class="price_by_night">$${d.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${d.max_guest} Guest(s)</div>
              <div class="number_rooms">${d.number_rooms} Bedroom(s)</div>
              <div class="number_bathrooms">${d.number_bathrooms} Bathroom(s)</div>
            </div>
            <div class="description">${d.description}</div>
          </article>`;
        $('SECTION.places').append(article);
      }
    },
    error: (error) => {
      console.error(error);
    }
  });
});
