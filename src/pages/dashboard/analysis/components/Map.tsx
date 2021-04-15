import React, { useEffect, useState } from 'react';
import { HeadMap, MapAPI } from '../service';
import { Card } from 'antd';

const MapContainer: React.FC<{}> = () => {
  const [html, sethtml] = useState('');

  const PointsMap = () => {
    HeadMap()
      .catch(() => {})
      .then((res) => {
        const data = [];
        for (let i = 0; i < res.length; i += 1) {
          data.push({
            // eslint-disable-next-line radix
            lat: res[i] === undefined ? 0 : parseFloat(res[i].lat),
            // eslint-disable-next-line radix
            lng: res[i] === undefined ? 0 : parseFloat(res[i].lon),
          });
        }

        maps(data);
      });
  };
  function maps(coord: any) {
    MapAPI(coord)
      .catch(() => {})
      .then(() => {
        sethtml('https://api-geo.herokuapp.com/maparender');
      });
  }
  useEffect(() => {
    PointsMap();
  }, []);

  return (
    <Card
      loading={false}
      bordered={false}
      title={'Mapa de Localização Estudantes - Teresina'}
      style={{
        height: '100%',
        padding: '2%',
      }}
      bodyStyle={{ padding: 0 }}
    >
      <div className="map-container">
        <div style={{ height: '80vh', width: '100%' }}>
          <iframe
            style={{ border: 'none' }}
            width="100%"
            height="80%"
            id="myFrame"
            src={html}
          ></iframe>
          {/* <GoogleMapReact
          defaultCenter={{ lat: -5.08921, lng: -42.8016 }}
          bootstrapURLKeys={{ libraries: ['visualization'], key: 'AIzaSyBixcB4pPVDW7Z0zz0JuT2_ST5Zivl91G0' }}
          zoom={15}
          heatmap={{ positions: points, options: { opacity: 0.9 } }}
        >
        </GoogleMapReact> */}
        </div>
      </div>
    </Card>
  );
};
export default MapContainer;
