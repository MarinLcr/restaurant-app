import { SAVE_SELECT_OPTION_MORE } from '../actions'

const initialState = {
    select: 5
}
export default function (selectReducerMore = initialState, action) {
    switch (action.type) {
        /* Récupération de la valeur du filtre n°2 */
        case SAVE_SELECT_OPTION_MORE:
            return {
                ...selectReducerMore,
                select: action.payload
            }
        default:
    }
    return selectReducerMore;
}