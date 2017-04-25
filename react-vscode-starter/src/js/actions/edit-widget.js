import { actionTypes } from '../action-types';

export const editWidget = widgetId => ({
    type: actionTypes.EDIT_WIDGET,
    widgetId
});

export const cancelWidget = () => ({
    type: actionTypes.EDIT_WIDGET,
    widgetId: -0
});