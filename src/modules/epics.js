import { combineEpics } from "redux-observable";
import { getBusRouteAndStopsEpic, getBusLocationsEpic } from "./busGeoInfo";

export default combineEpics(
    getBusRouteAndStopsEpic,
    getBusLocationsEpic,
);
