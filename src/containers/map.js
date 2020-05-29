import React, { Component, Fragment } from "react";
import { fetchRestaurants } from "../actions/index";
import { fetchPlaces } from "../actions/index";
import { saveSelectValue } from "../actions/index";
import { saveSelectValueMore } from "../actions/index";
import Pin from "../media/img/signs.png";
import Form from "./restaurant-form";
import { connect } from "react-redux";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { MAP } from "react-google-maps/lib/constants";

export class MyMap extends Component {
  static defaultProps = {
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDJeT4j-lwP3eOvoC7NsrkSLhCB7GwR8V0&v=3.exp&libraries=geometry,drawing,places",
  };

  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);

    this.state = {
      currentPosition: {
        lat: 48.1157123,
        lng: -1.6865404,
      },
      markers: [],
      showComponent: false,
      lat: 0,
      long: 0,
      places: [],
    };
    this.service = "";
    this.mapMounted = this.mapMounted.bind(this);
  }

  componentWillMount() {
    this.props.fetchRestaurants();
    if (!!navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          this.setState({
            currentPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        },
        (err) => console.log(err),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
      );
    } else {
      //  // No Support Web
      alert("Le navigateur ne supporte pas la géolocalisation");
    }
  }

  componentDidMount() {
    this.fetchPlaces(this.state.places);
  }

  componentWillUpdate() {
    this.fetchPlaces(this.state.places);
  }

  fetchPlaces(data) {
    this.props.fetchPlaces(data);
  }

  // ------- TEST TEST TEST ------- //
  fetchPlacesses(map) {
    // Ajout de nouveaux restaurants et de nouveaux avis
    this.service = new window.google.maps.places.PlacesService(map);

    // Restaurant(s) à 500 ètres autour de ma position
    this.service.nearbySearch(
      {
        location: map.getCenter(),
        radius: "500",
        type: ["restaurant"],
      },
      this.callback
    );
  }

  // Envoie des restaurants à partir d'une zone de recherche
  // Arrow fx for binding
  callback = (results, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      this.addRestaurants(results);
    }
  };

  // Ajout des restaurants via Google Places
  addRestaurants = (results) => {
    let places = [];
    for (let i = 0; i < results.length; i++) {
      this.service.getDetails(results[i], (result, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          this.addRestaurantByGooglePlaces(
            i,
            result.name,
            result.geometry.location,
            result.geometry.location.lat(),
            result.geometry.location.lng(),
            result.vicinity,
            result.rating,
            result.reviews
          );
        }
        this.setState({ places });
      });
    }
  };

  addRestaurantByGooglePlaces = (
    index,
    name,
    location,
    lat,
    lng,
    address,
    rating,
    reviews
  ) => {
    const { places } = this.state;
    let tmpRestaurant = {};
    tmpRestaurant.index = index;
    tmpRestaurant.restaurantName = name;
    tmpRestaurant.address = address;
    tmpRestaurant.lat = lat;
    tmpRestaurant.lng = lng;
    if (rating === undefined) {
      tmpRestaurant.rating = 0;
    } else {
      tmpRestaurant.rating = Math.round(rating);
    }
    tmpRestaurant.ratings = reviews;
    tmpRestaurant.location = location;
    places.push(tmpRestaurant);
    this.setState({ places });
  };

  mapMounted(element) {
    const mapObject = element.context[MAP];
    this.fetchPlacesses(mapObject);
  }

  /* Rendu de la map */
  CMap = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        ref={this.mapMounted}
        defaultZoom={15}
        defaultCenter={{
          lat: this.state.currentPosition.lat,
          lng: this.state.currentPosition.lng,
        }}
        onClick={(e) => this.handleClick(e)}
      >
        {props.children}
      </GoogleMap>
    ))
  );

  /* Recalcul et actualisation des moyennes des Places lorsque qu'une Place est ajouté */
  updateAverageState() {
    let placesAverage = this.calcAveragePlaces();
    for (let i = 0; i < this.state.places.length; i++) {
      let average = placesAverage[i];
      this.state.places[i].average = average;
    }
  }

  handleClick(event) {
    this.setState({
      showComponent: true,
      lat: event.latLng.lat(),
      long: event.latLng.lng(),
    });
  }

  handler() {
    this.setState({
      showComponent: false,
    });
  }

  calcAveragePlaces() {
    let myArray = this.state.places.map((place) => {
      let nbrStars = place.rating;
      return nbrStars;
    });
    return myArray;
  }

  render() {
    this.updateAverageState();
    const forYou = () => {
      return (
        <this.CMap
          googleMapURL={this.props.googleMapURL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `calc(90vh - 20px)` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          center={{ lat: 25.03, lng: 121.6 }}
        >
          <Marker
            position={{
              lat: this.state.currentPosition.lat,
              lng: this.state.currentPosition.lng,
            }}
            icon={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
          />
          {this.state.places.map((place, i) => {
            if (
              place.average >= this.props.selectLess &&
              place.average <= this.props.selectMore
            ) {
              return (
                <Marker
                  key={place.restaurantName}
                  position={{ lat: place.lat, lng: place.lng }}
                />
              );
            } else {
              return console.log(
                "Restaurant hors des critères du filtre : ",
                place
              );
            }
          })}

          {this.props.newPlaces.map((place, i) => {
            if (
              place.rating >= this.props.selectLess &&
              place.rating <= this.props.selectMore
            ) {
              return (
                <Marker
                  key={this.props.newPlaces[i].restaurantName}
                  position={{
                    lat: this.props.newPlaces[i].lat,
                    lng: this.props.newPlaces[i].long,
                  }}
                />
              );
            } else {
              return console.log(
                "Restaurant hors des critères du filtre : ",
                place
              );
            }
          })}
        </this.CMap>
      );
    };
    return (
      <Fragment>
        {forYou()}
        {this.state.showComponent ? (
          <Form
            action={this.handler}
            lat={this.state.lat}
            long={this.state.long}
            initialValues={{ lat: this.state.lat, long: this.state.long }}
          />
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    restaurants: store.restaurantsReducer.restaurants,
    selectLess: store.selectReducer.select,
    selectMore: store.selectReducerMore.select,
    newPlaces: store.newReducerPlaces.restaurants,
  };
};

const mapDispatchToProps = {
  fetchRestaurants,
  saveSelectValue,
  saveSelectValueMore,
  fetchPlaces,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyMap);
