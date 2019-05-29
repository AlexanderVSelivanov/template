import React, {useState} from 'react';
import {Map, Marker, Popup, TileLayer, Viewport} from 'react-leaflet';

import useStyles from './styles';

type PageProps = {};

const DEFAULT_VIEWPORT: Viewport = {
  center: [40.7484, 73.9857],
  zoom: 10,
};

const Page: React.FC<PageProps> = () => {
  const classes = useStyles();
  const [viewport, setViewport] = useState<Viewport>(DEFAULT_VIEWPORT);

  const onClickReset = () => {
    setViewport(DEFAULT_VIEWPORT);
  };

  const onViewportChanged = (viewportValue: Viewport) => {
    setViewport(viewportValue);
  };
  return (
    <Map
      onClick={onClickReset}
      onViewportChanged={onViewportChanged}
      viewport={viewport}
    >
      <TileLayer
        attribution="&amp;copy <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </Map>
  );
};

export default Page;
