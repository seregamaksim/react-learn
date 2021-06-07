export default function initMap(location) {
  // eslint-disable-next-line no-undef
  ymaps.ready(init);
  function init() {
    if (document.getElementById('map').childElementCount > 0) {
      document.getElementById('map').innerHTML = '';
    }
    // eslint-disable-next-line no-undef
    var myMap = new ymaps.Map('map', {
      center: location,
      zoom: 13,
    });
    myMap.balloon.open(location, `${location}`);
  }
}
