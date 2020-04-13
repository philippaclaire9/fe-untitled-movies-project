import React from "react";
import Header from "./Header";
import SearchMovie from "./SearchMovie";
import WrappedMap from "./MovieMap";
import APIKey from "../config";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <SearchMovie />
      <div style={{ width: "75%", height: "100vh" }}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${APIKey}`}
          loadingElement={<div style={{ height: "100" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div>
    </div>
  );
};

export default Dashboard;