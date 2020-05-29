import React, { Component } from "react";
import RestaurantList from "../containers/restaurant-list";
import Map from "../containers/map";
import Header from "./header";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container_app">
          <div className="container_map">
            <Map />
          </div>
          <div className="container_restaurant">
            <RestaurantList />
          </div>
        </div>
      </div>
    );
  }
}
