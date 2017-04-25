import { actionTypes } from '../action-types';

export const refreshWidgetsRequest = () => ({
    type: actionTypes.REFRESH_WIDGETS_REQUEST
});

export const refreshWidgetsDone = widgets => ({
    type: actionTypes.REFRESH_WIDGETS_DONE,
    widgets
});

export const refreshWidgets = () => {

    return dispatch => {

        dispatch(refreshWidgetsRequest());

        return fetch('http://localhost:3000/widgets')
            .then(res => res.json())
            .then(widgets => dispatch(refreshWidgetsDone(widgets)));
    };
};

/*
import { actionTypes } from '../action-types';

// mock data until the asynchronous code is wired up
const widgets = [{
    id: 1, name: 'Small Red Widget', description: 'A small, red widget.',
    color: 'red', size: 'small', quantity: 2
},{
    id: 2, name: 'Medium Blue Widget', description: 'A medium, blue widget.',
    color: 'blue', size: 'medium', quantity: 15
}];
//action creator function
export const refreshWidgets = () => ({
    type: actionTypes.REFRESH_WIDGETS,
    widgets //shorthand property, value and property have the same name then simplifies the code
});
*/