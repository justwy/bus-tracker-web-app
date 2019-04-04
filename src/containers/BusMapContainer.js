import React from "react";
import { connect } from "react-redux";
import { selectBusId, changeViewpoint } from "../modules/busGeoInfo";
import BusMapComponent from "../components/BusMapComponent";
import styled from "styled-components";
import Fab from "@material-ui/core/Fab";
import RefreshIcon from "@material-ui/icons/Refresh";

const MapView = styled.div`
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
`;

const FixedDiv = styled.div`
  position: fixed;
  bottom: 3%;
  left: 3%;
`;

class BusMapContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(selectBusId(localStorage.getItem('busId') || '158'));
  }

  render() {
    const {
      viewport,
      activeBusId,
      activeBusRoute,
      activeBusStops,
      activeBusLocations
    } = this.props;

    return (
      <MapView>
        <BusMapComponent
          {...this.props}
          onViewportChange={({ viewState }) =>
            this.props.dispatch(changeViewpoint(viewState))
          }
          onBusIdChange={busId => this.props.dispatch(selectBusId(busId))}
        />
        {/* <div>{activeBusId}</div>
        <div>{JSON.stringify(activeBusRoute)}</div>
        <div>{JSON.stringify(activeBusLocations)}</div>
        <div>{JSON.stringify(activeBusStops)}</div> */}

        <FixedDiv>
          <Fab color="primary" aria-label="Refresh" onClick={() => {
            this.props.dispatch(selectBusId(activeBusId, false))
          }}>
            <RefreshIcon />
          </Fab>
        </FixedDiv>
      </MapView>
    );
  }
}

const mapStateToProps = state => ({
  viewport: state.busGeoInfo.viewport,
  activeBusId: state.busGeoInfo.activeBusId,
  activeBusRoute: state.busGeoInfo.activeBusRoute,
  activeBusStops: state.busGeoInfo.activeBusStops,
  activeBusLocations: state.busGeoInfo.activeBusLocations,
  routeCenter: state.busGeoInfo.routeCenter,
  noRoute: state.busGeoInfo.noRoute
});

export default connect(mapStateToProps)(BusMapContainer);
