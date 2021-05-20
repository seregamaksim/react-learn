import initMap from './initMap';
const loadMaps = (location) => {
  const existingScript = document.getElementById('mapScript');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src =
      'https://api-maps.yandex.ru/2.1/?apikey=f00883a3-bd7d-4007-a65b-4754989e662c&lang=ru_RU';
    script.id = 'mapScript';
    document.body.appendChild(script);
    script.onload = () => {
      if (location) initMap(location);
    };
  }
  if (existingScript && location) initMap(location);
};
export default loadMaps;
