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
});
