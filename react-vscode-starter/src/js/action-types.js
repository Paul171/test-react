import keyMirror from 'key-mirror';
/*
Key Mirror is a helpful utility 
for declaring properties whose values are the property names themselves
*/
// ensure that consistent action-type names are used
// two actions for asyn call 
// REQUEST action: to transmit the call
// DONE action to receive the result when the call completes
export const actionTypes = keyMirror({
    REFRESH_WIDGETS_REQUEST: null,
    REFRESH_WIDGETS_DONE: null,
    EDIT_WIDGET: null,//replace a view row with an edit row
    CANCEL_WIDGET: null,//replace an edit row with a view row
    SAVE_WIDGET_REQUEST: null, //save the edited widget and change the edit row to a view row
    DELETE_WIDGET_REQUEST: null,//trigger the widget to be deleted
});
