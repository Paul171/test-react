import { actionTypes } from './action-types';
//add a reducer function to process the action
//reducer accepts the state and the action as the parameters
/*
 params:
 @state: current application state, including model data and UI data
 @action: the operation triggered by the application to update the state
 Each action dispatched into the store is processed by every reducer
*/
export const reducer = (state = { widgets: [], editRowId: 0 }, action) => {
    
    switch (action.type) {
        case actionTypes.REFRESH_WIDGETS:
            return Object.assign({}, state, { widgets: action.widgets });
        case actionTypes.REFRESH_WIDGETS_REQUEST:
            return Object.assign({}, state, { widgets: [] });
        case actionTypes.REFRESH_WIDGETS_DONE:
            return Object.assign({}, state, { widgets: action.widgets });
        case actionTypes.EDIT_WIDGET:
            return Object.assign({}, state, { editRowId: action.widgetId });
        case actionTypes.CANCEL_WIDGET:
            return Object.assign({}, state, { editRowId: 0 });
        case actionTypes.SAVE_WIDGET_REQUEST:
            return Object.assign({}, state, { widget: action.widget });  
        case actionTypes.DELETE_WIDGET_REQUEST:
            return Object.assign({}, state, { widgetId: action.widgetId });      
        default:
            return state;
    }

};