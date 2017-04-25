import { actionTypes } from '../action-types';

import { refreshWidgetsDone } from './refresh-widgets';

export const saveWidgetsRequest = widget => ({
    type: actionTypes.SAVE_WIDGET_REQUEST,
    widget,
});

export const saveWidget = (widget) => {

    return dispatch => {

        dispatch(saveWidgetsRequest(widget));

        let widgetSavePromise = null;

        if (widget.id) {
            widgetSavePromise = fetch('http://localhost:3000/widgets/' + encodeURIComponent(widget.id), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(widget),
            });
        } else {
            widgetSavePromise = fetch('http://localhost:3000/widgets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(widget),
            });
        }

        widgetSavePromise
            .then(() => fetch('http://localhost:3000/widgets'))
            .then(res => res.json())
            .then(widgets => dispatch(refreshWidgetsDone(widgets)));
    };
};