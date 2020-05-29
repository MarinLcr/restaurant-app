import React, { Component } from "react";
import { saveSelectValue } from "../actions/index";
import { saveSelectValueMore } from "../actions/index";
import { connect } from "react-redux";
import Comment from "../containers/comment-form";
import Average from "./average";

class RestaurantListItem extends Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);

    this.state = {
      average: 0,
      showComponent: false,
    };
  }

  componentDidMount() {
    this.setState({ average: this.props.restExchange.rating });
  }

  /* Affichage du contenaire pour ajouter un avis */
  handleClick(event) {
    this.setState({
      showComponent: true,
    });
    event.preventDefault();
  }

  handler() {
    this.setState({
      showComponent: false,
    });
  }

  /* Rendu de la moyenne par affichage étoilé */
  renderAverage() {
    /* let nbrStars = [];
    if (this.props.restExchange.ratings.length > 0) {
      this.props.restExchange.ratings.map((ratings) =>
        nbrStars.push(ratings.stars)
      );
      let evaluation = 0;
      for (let i = 0; i < nbrStars.length; i++) {
        evaluation = evaluation + nbrStars[i];
      }
      let percent = (this.props.restExchange.rating / 5) * 100;
      return <Average average={percent} />;
    } else {
      return console.log("Pas de ratings");
    } */
    let nbrStars = [];
    if (this.props.restExchange.ratings === undefined) {
      console.log("pas de rati");
    } else if (this.props.restExchange.ratings.length > 0) {
      console.log("a la geolocalisation");
      this.props.restExchange.ratings.map((ratings) =>
        nbrStars.push(ratings.stars)
      );
      let evaluation = 0;
      for (let i = 0; i < nbrStars.length; i++) {
        evaluation = evaluation + nbrStars[i];
      }
      let percent = (this.props.restExchange.rating / 5) * 100;
      return <Average average={percent} />;
    } else {
      console.log("pas de ");
    }
  }

  /* Rendu des notes utilisateurs avec le commentaires associé */
  renderRatings() {
    return (
      <React.Fragment>
        {this.props.restExchange.ratings.map((rating) => {
          return (
            <div className="restau_avis" key={rating.text}>
              <p>{rating.rating}</p>
              <p className="restau_comment">{rating.text}</p>
            </div>
          );
        })}
      </React.Fragment>
    );
  }

  /* Affichage des restaurants en fonction du filtre */
  renderTotal() {
    if (
      this.state.average >= this.props.selectLess &&
      this.state.average <= this.props.selectMore
    ) {
      return (
        <React.Fragment>
          <div className="container_restau_item">
            <h2>{this.props.restExchange.restaurantName}</h2>
            <div className="adress_star">
              <p className="restau_adress">{this.props.restExchange.address}</p>
              {this.renderAverage()}
            </div>
            <div className="container_streetview">
              <img src={this.props.streetViewImage} alt="" />
            </div>

            {this.props.restExchange.ratings !== undefined && (
              <div className="avis">{this.renderRatings()}</div>
            )}

            <button
              className="btn btn-primary button-list-container"
              onClick={(e) => this.handleClick(e)}
            >
              Avis
            </button>
          </div>
          {this.state.showComponent ? (
            <Comment
              action={this.handler}
              initialValues={{
                restaurantName: this.props.restExchange.restaurantName,
              }}
            />
          ) : null}
        </React.Fragment>
      );
    } else {
    }
  }

  render() {
    console.log("Rest excahnge : ", this.props.restExchange.ratings);
    return (
      <div className="restaurant-list-container">{this.renderTotal()}</div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    selectLess: store.selectReducer.select,
    selectMore: store.selectReducerMore.select,
  };
};

const mapDispatchToProps = {
  saveSelectValue,
  saveSelectValueMore,
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantListItem);
