import axios from "axios"

/* récupération des restaurants du fichier restaurants.json */
export const GET_RESTAURANTS = "GET_RESTAURANTS"
export function fetchRestaurants() {
    return function (dispatch) {
        axios.get('restaurants.json').then(axiosResponse => {
            dispatch({ type: GET_RESTAURANTS, payload: axiosResponse.data });
        })
    }
}
 
/* filtre d'étoile n°1 */
export const SAVE_SELECT_OPTION = 'SAVE_SELECT_OPTION'
export function saveSelectValue(data) {
    return { type: SAVE_SELECT_OPTION, payload: data }
}

/* filtre d'étoile n°2 */
export const SAVE_SELECT_OPTION_MORE = 'SAVE_SELECT_OPTION_MORE'
export function saveSelectValueMore(data) {
    return { type: SAVE_SELECT_OPTION_MORE, payload: data }
}

/* Récupération des google places */
export const GET_PLACES = "GET_PLACES"
export function fetchPlaces(data) {
    return { type: GET_PLACES, payload: data }
}

/* Rcéupération des places ajoutés par l'utilisateur */
export const ADD_PLACE = 'ADD_PLACE'
export function createPost(post) {
    return { type: ADD_PLACE, payload: post }
}

/* Récupération des commentaires ajoutés par l'utilisateur */
export const ADD_COMMENT = 'ADD_COMMENT'
export function createComment(comment) {
    return { type: ADD_COMMENT, payload: comment }
}

/* Récupération des commenataires ajoutés sur les nouvelles places */
export const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT'
export function createNewComment(comment) {
    return { type: ADD_NEW_COMMENT, payload: comment }
}



