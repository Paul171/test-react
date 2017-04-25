import { actionTypes } from '../action-types';

import { refreshWidgetsDone } from './refresh-widgets';

export const deleteWidgetRequest = widgetId => ({
    type: actionTypes.DELETE_WIDGET_REQUEST,
    widgetId,
});

export const deleteWidget = (widgetId) => {

    return dispatch => {

        dispatch(deleteWidgetRequest(widgetId));

        fetch('http://localhost:3000/widgets/' + encodeURIComponent(widgetId), {
            method: 'DELETE',
        })
            .then(() => fetch('http://localhost:3000/widgets'))
            .then(res => res.json())
            .then(widgets => dispatch(refreshWidgetsDone(widgets)));
    };
};