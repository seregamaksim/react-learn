import { YMaps, Map, ZoomControl, Placemark } from 'react-yandex-maps';

export default function UserMapProfile(props) {
  return (
    <YMaps>
      <Map
        className={props.className}
        defaultState={{
          center: props.location,
          zoom: 9,
          controls: true,
        }}
        width="100%"
        height="450px"
      >
        <ZoomControl options={{ float: 'right' }} />
        <Placemark
          geometry={props.location}
          properties={{
            hintContent: 'Это хинт',
            balloonContent: props.location,
          }}
          modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
        />
      </Map>
    </YMaps>
  );
}
