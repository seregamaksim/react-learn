export default function initMap(location) {
  // eslint-disable-next-line no-undef
  ymaps.ready(init);
  function init() {
    if (document.getElementById('map').childElementCount > 0) {
      document.getElementById('map').innerHTML = '';
    }
    // eslint-disable-next-line no-undef
    var myMap = new ymaps.Map('map', {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: location,
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 7,
    });
    myMap.balloon.open(location, `${location}`, {
      // Опция: не показываем кнопку закрытия.
      // closeButton: false
    });
  }
}
