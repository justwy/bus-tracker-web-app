import { createReducer } from "redux-starter-kit";
import { ofType } from "redux-observable";
import { map, mergeMap, debounce } from "rxjs/operators";

import GeoJSON from "geojson";
import { Observable, empty, timer } from "rxjs";
import { deprecate } from "util";

// acctions
const withPrefix = action => `BUS_GEO_INFO/${action}`;

const CHANGE_VIEWPORT = withPrefix("CHANGE_VIEWPORT");
const SELECT_BUS_ID = withPrefix("SELECT_BUS_ID");
const RECEIVE_BUS_ROUTE_AND_STOPS = withPrefix("RECEIVE_BUS_ROUTE_AND_STOPS");
const RECEIVE_BUS_LOCATIONS = withPrefix("RECEIVE_BUS_LOCATIONS");

const initState = {
  viewport: {
    //width: 400,
    //height: 400,
    latitude: 40.8066046,
    longitude: -73.9912461,
    zoom: 11,
    bearing: 0,
    pitch: 2
  },
  activeBusId: '',
  activeBusRoute: {},
  activeBusStops: {},
  activeBusLocations: [],
  routeCenter: {},
  noRoute: false
};

// reducers
export default createReducer(initState, {
  [CHANGE_VIEWPORT]: (state, action) => {
    state.viewport = action.payload;
  },
  [SELECT_BUS_ID]: (state, action) => {
    state.activeBusId = action.payload.busId;
    state.noRoute = false;
    localStorage.setItem('busId', action.payload.busId)
    //state.activeBusRoute = null;
    //state.activeBusLocations = [];
    //state.activeBusStops = null;
    //state.routeCenter = {};
  },
  [RECEIVE_BUS_ROUTE_AND_STOPS]: (state, action) => {
    state.activeBusRoute = action.payload.route.type
      ? action.payload.route
      : null;
    state.activeBusStops = action.payload.stops.type
      ? action.payload.stops
      : null;
    if (!action.payload.stops.type) {
      state.noRoute = true;
    }
    state.routeCenter = action.payload.center;

    if (action.payload.reCenter) {
      state.viewport = { ...state.viewport, ...action.payload.center };
    }
  },
  [RECEIVE_BUS_LOCATIONS]: (state, action) => {
    state.activeBusLocations = action.payload;
  }
});

// action creators
export const changeViewpoint = viewpoint => ({
  type: CHANGE_VIEWPORT,
  payload: viewpoint
});

export const selectBusId = (busId, reCenter = true) => ({
  type: SELECT_BUS_ID,
  payload: { busId, reCenter }
});

export const receiveBusRouteAndStops = (route, stops, center, reCenter) => ({
  type: RECEIVE_BUS_ROUTE_AND_STOPS,
  payload: { route, stops, center, reCenter }
});

export const receiveBusLocations = busLocationsGeoJSON => ({
  type: RECEIVE_BUS_LOCATIONS,
  payload: busLocationsGeoJSON
});

// epics
export const getBusRouteAndStopsEpic = (action$, state$, { makeRequest }) =>
  action$.pipe(
    ofType(SELECT_BUS_ID),
    debounce(() => timer(1000)),
    mergeMap(({ type, payload }) => {
      if (!payload.busId) return empty();

      return makeRequest(`/v1/routes/njt/${payload.busId}`, "GET").pipe(
        map(response =>
          receiveBusRouteAndStops(
            parseBusRouteMultiLineString(response.response),
            parseBusStopsMultiPoint(response.response),
            (response.response && response.response.center) || {},
            payload.reCenter
          )
        )
      );
    })
  );

export const getBusLocationsEpic = (action$, state$, { makeRequest }) =>
  action$.pipe(
    ofType(SELECT_BUS_ID),
    debounce(() => timer(1000)),
    mergeMap(({ type, payload }) => {
      if (!payload.busId) return empty();

      return makeRequest(`/v1/buses/njt/${payload.busId}`, "GET").pipe(
        map(response => receiveBusLocations(response.response))
      );
    })
  );

const parseBusRouteMultiLineString = route => {
  if (!route) return {};

  const { routeId, routeDescription } = route;
  const twoDimArray = route.busLines.map(busLine =>
    busLine.polyline.map(point => [point.longitude, point.latitude])
  );

  const result = {
    twoDimArray,
    routeId,
    routeDescription
  };

  return GeoJSON.parse(result, { MultiLineString: "twoDimArray" });
};

const parseBusStopsMultiPoint = route => {
  if (!route) return {};
  const points = route.busLines.flatMap(busLine =>
    busLine.polyline.filter(point => point.id)
  );

  return GeoJSON.parse(points, {
    Point: ["latitude", "longitude"]
  });
};

// deprecate
export const parseBuseLocationsMultiPoint = locations => {
  if (!locations) return {};

  return GeoJSON.parse(locations, {
    Point: ["location.latitude", "location.longitude"]
  });
};
