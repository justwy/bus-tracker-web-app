import React from "react";
import ReactMapGL, { StaticMap } from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Color from "color";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { Marker } from "react-map-gl";
import { parseBuseLocationsMultiPoint } from "../modules/busGeoInfo";
import Typography from "@material-ui/core/Typography";
import Snackbar from '@material-ui/core/Snackbar';

const InputDiv = styled.div`
  max-width: 200px;
  margin: 0 auto;
`;

const ColoredSpan = styled.span`
  color: #ab003c;
`;

const defaultLatitude = 40.8066046;
const defaultLongitude = -73.9912461;

// const viewport = {
//   latitude: 40.8066046,
//   longitude: -73.9912461,
//   zoom: 11,
//   bearing: 0,
//   pitch: 2
// }

function BusMapComponent({
  viewport,
  onViewportChange,
  onBusIdChange,
  activeBusId,
  activeBusRoute,
  activeBusStops,
  activeBusLocations,
  routeCenter,
  noRoute,
}) {
  console.log("routeCenter", routeCenter);

  const busRouteLayer = new GeoJsonLayer({
    id: "`${activeBusId}`-route-layer",
    data: activeBusRoute,
    pickable: true,
    stroked: false,
    filled: true,
    extruded: true,
    lineWidthScale: 1,
    lineWidthMinPixels: 2,
    getLineColor: Color("#2196f3")
      .rgb()
      .array(),
    getRadius: 100,
    getLineWidth: 1,
    getElevation: 30,
    onHover: ({ object, x, y }) => {
      //const tooltip = object.properties.name || object.properties.station;
      //console.log(`hover on object ${JSON.stringify(object)} ${x} ${y}`);
      /* Update tooltip
         http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
      */
    }
  });

  const busStopsLayer = new GeoJsonLayer({
    id: "`${activeBusId}`-stops-layer",
    data: activeBusStops,
    pickable: true,
    stroked: false,
    filled: true,
    extruded: true,
    lineWidthScale: 1,
    lineWidthMinPixels: 2,
    getFillColor: Color("#1769aa")
      .rgb()
      .array(),
    getRadius: 2,
    pointRadiusMinPixels: 2,
    getLineWidth: 1,
    getElevation: 30,
    onHover: ({ object, x, y }) => {
      //const tooltip = object.properties.name || object.properties.station;
      console.log(`hover on object ${JSON.stringify(object)} ${x} ${y}`);
      /* Update tooltip
         http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
      */
    }
  });

  const busLocationsLayer = new GeoJsonLayer({
    id: "`${activeBusId}`-bus_locations-layer",
    data: parseBuseLocationsMultiPoint(activeBusLocations),
    pickable: true,
    stroked: false,
    filled: true,
    extruded: true,
    lineWidthScale: 1,
    lineWidthMinPixels: 2,
    getFillColor: Color("#ab003c")
      .rgb()
      .array(),
    getRadius: 5,
    pointRadiusMinPixels: 5,
    getLineWidth: 1,
    getElevation: 30,
    onHover: ({ object, x, y }) => {
      //const tooltip = object.properties.name || object.properties.station;
      console.log(`hover on object ${JSON.stringify(object)} ${x} ${y}`);
      /* Update tooltip
         http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
      */
    }
  });

  /*   return (
    <DeckGL {...viewport} layers={[busRouteLayer]}>
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MapboxAccessToken}
        {...viewport}
        // list of all predefined map styles: https://docs.mapbox.com/mapbox-gl-js/api/
        mapStyle="mapbox://styles/mapbox/streets-v10"
        onViewportChange={onViewportChange}
      />
    </DeckGL>
  ); */

  return (
    <div>
      <div style={{ position: "relative" }}>
        <DeckGL
          className="mymap"
          style={{ display: "flex", position: "static" }}
          //latitude={viewport.latitude || 0}
          //longitude={viewport.longitude || 0}
          //bearing={viewport.bearing}
          //zoom={viewport.zoom}
          //pitch={viewport.pitch}
          viewState={viewport}
          //initialViewState={{ ...viewport, latitude: routeCenter.latitude || defaultLatitude, longitude: routeCenter.longitude || defaultLongitude}}
          //width={600}
          height={window.innerHeight}
          controller={true}
          layers={[busLocationsLayer, busRouteLayer, busStopsLayer]}
          onViewStateChange={onViewportChange}
        >
          <StaticMap
            style={{ display: "flex", position: "static" }}
            // list of all predefined map styles: https://docs.mapbox.com/mapbox-gl-js/api/
            mapStyle="mapbox://styles/mapbox/light-v10"
            preventStyleDiffing={true}
            reuseMaps
            mapboxApiAccessToken={process.env.REACT_APP_MapboxAccessToken}
            //onViewStateChange={onViewportChange}
          >
            {activeBusLocations.map((loc, index) => (
              <Marker
                key={index}
                latitude={loc.location.latitude}
                longitude={loc.location.longitude}
                offsetLeft={4}
                offsetTop={0}
              >
                <Typography variant="caption" gutterBottom>
                  <ColoredSpan>To {loc.dest}</ColoredSpan>
                </Typography>
              </Marker>
            ))}
          </StaticMap>
        </DeckGL>
      </div>

      <InputDiv>
        <TextField
          id="standard-name"
          value={activeBusId}
          placeholder="Give me a bus route"
          onChange={event => onBusIdChange(event.target.value)}
          margin="normal"
        />
      </InputDiv>

      <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={noRoute}
          //onClose={this.handleClose}
          //ContentProps={{
            //'aria-describedby': 'message-id',
          //}}
          message={<span>Cannot found the bus route {activeBusId}</span>}
        />
    </div>
  );
}

export default BusMapComponent;
