import { combineReducers } from 'redux';
import ReducerRestaurants from './reducer_restaurants';
import ReducerSelect from './reducer_select'
import ReducerSelectMore from './reducer_select_more'
import { reducer as ReducerForm } from "redux-form"
import Reducer_places from './reducer_places';
import newReducer_places from './reducer_new_place';


const rootReducer = combineReducers({
  restaurantsReducer: ReducerRestaurants,
  selectReducer: ReducerSelect,
  selectReducerMore: ReducerSelectMore,
  placesReducer: Reducer_places,
  newReducerPlaces: newReducer_places,
  form: ReducerForm

});

export default rootReducer;
 