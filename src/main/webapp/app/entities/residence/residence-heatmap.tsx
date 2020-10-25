import L, {
  LatLng,
  Map,
  MapOptions,
  LeafletMouseEvent,
  Popup,
} from 'leaflet';
import 'leaflet.heat';
import React, { useEffect, useState } from 'react';
import api from "../../Api";
import log from 'loglevel';


type HeatLatLngTuple = [number, number, number | string];

type ResidenceCoordinates = [number, number];

interface ResidenceHeatValue {
  latitude: number;
  longitude: number;
  cap: number;
}

const ResidencesHeatMap = () => {

  const center = { lat: -21.980108, lng: -44.931743 };

  const [initialPosition, setInitialPosition] = useState(center)

  const [coordinates, setCoordinates] = useState<ResidenceHeatValue[]>([]);

  const [map, setMap] = useState<Map>(null);

  function getInitialGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        setInitialPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }
  }

  function initMap() {
    getInitialGeoLocation();
    const mapOptions: MapOptions = {
      maxZoom: 16,
    };
    const leafletMap = L.map("map", mapOptions).setView([initialPosition.lat, initialPosition.lng], 12);

    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(leafletMap);

    leafletMap.on('click', (event: LeafletMouseEvent) => {
      const latlng = leafletMap.mouseEventToLatLng(event.originalEvent);
      // eslint-disable-next-line no-console
      console.log(latlng);

      L.popup()
        .setLatLng(latlng)
        .setContent(`Coordenadas: ${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`)
        .addTo(leafletMap);
    })

    setMap(leafletMap);
  }

  async function getResidenceCoordinates() {
    const response = await api.get<Array<ResidenceCoordinates>>("residences/coordinates");
    setCoordinates(response.data);
  }

  useEffect(() => {
    initMap();
    getResidenceCoordinates();
  }, []);

  useEffect(() => {
    const latLgns: LatLng[] = coordinates.map(coordinate => new LatLng(coordinate.latitude, coordinate.longitude, coordinate.cap));

    log.info("Coordenadas: ", latLgns);

    if (map) {
      const heatOptions = {
        maxZoom: 13,
        // max: 0.5
      };
      L.heatLayer(latLgns, heatOptions).addTo(map);
    }

  }, [coordinates, map])

  useEffect(() => {
    if (map) {
      map.setView([initialPosition.lat, initialPosition.lng], 12)
    }
  }, [initialPosition])

  return (
    <div>
      <h1>Mapa de Calor</h1>
      <div id="map" style={{ height: '800px' }}></div>
    </div>
  )
}

export default ResidencesHeatMap;
