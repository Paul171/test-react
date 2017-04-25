import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';
import { WidgetTable } from './components/widget-table';
import { WidgetForm } from './components/widget-form';
import { refreshWidgets } from './actions/refresh-widgets';
import { editWidget, cancelWidget } from './actions/edit-widget';
import { saveWidget } from './actions/save-widget';
import { deleteWidget } from './actions/delete-widget';
import { appStore } from './app-store';
// const widgetData = [{
//     id: 1, name: 'Small Red Widget', description: 'A small, red widget.',
//     color: 'red', size: 'small', quantity: 2
// },{
//     id: 2, name: 'Medium Blue Widget', description: 'A medium, blue widget.',
//     color: 'blue', size: 'medium', quantity: 15
// }];

//destructuring: allows specific properties of an input object to plucked off as variables
const mapStateToProps = ({ widgets, editRowId }) => ({ widgets, editRowId });
const mapDispatchToProps = dispatch => bindActionCreators({
    refreshWidgets,
    onEdit: editWidget,
    onCancel: cancelWidget,
    onSave: saveWidget,
    onDelete: deleteWidget,
}, dispatch);
class WidgetTool extends React.Component {
    // static propTypes = {
    //     widgets: React.PropTypes.arrayOf(React.PropTypes.shape({
    //         id: React.PropTypes.number,
    //         name: React.PropTypes.string,
    //         description: React.PropTypes.description,
    //         color: React.PropTypes.string,
    //         size: React.PropTypes.string,
    //         quantity: React.PropTypes.number,
    //     })).isRequired
    // };
    constructor(props){
        super(props);
        this.state = {
            widgets: [],
            editRowId: 0,
        };
    }
    //inject code at critical points in a component's lifetime
    componentDidMount() {
        // fetch('http://localhost:3000/widgets')
        //     .then(res => res.json())
        //     .then(widgets => this.setState({ widgets }));

        //the return value from the subscribe function is an unsubscribe function
        this.appStoreUnsubscribe = appStore.subscribe(() => {
            this.setState({
                widgets: appStore.getState().widgets,
            });
        });
        this.props.refreshWidgets();
        appStore.dispatch(refreshWidgets());
    }
    static propTypes = {
        refreshWidgets: React.PropTypes.func,
        onSave: React.PropTypes.func,
    };

    //unsubscribe function which is invoked with the component is unmounted to prevent memory leaks
    componentWillUnmount() {
        this.appStoreUnsubscribe();
    }
    editWidget = widgetId => {
        this.setState({
            editRowId: widgetId
        });
    }

    deleteWidget = widgetId => {
        let widgetDelPromise = null;
        widgetDelPromise = fetch("http://localhost:3010/widget/" + encodeURIComponent(widgetId),{
            method: 'DELETE'
        }).then(() => fetch('http://localhost:3000/widgets'))
        .then(res => res.json())
        .then(widgets => this.setState({ widgets, editRowId: 0 }));
    }

    cancelWidget = () => {
        this.setState({
            editRowId: 0,
        });
    }
    saveWidget = widget => {
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
            .then(widgets => this.setState({ widgets, editRowId: 0 }));
    };
    render() {
        console.log(this.props.widgets);
        console.log(Object.isFrozen(this.props));
        //spread operator in ES2015, passes this.props as individual props to the WidgetTable component
        return <div>
    <h1>Widget Tool</h1>
    <WidgetTable {...this.props} /> 
    <WidgetForm onSubmit={this.props.onSave}/>
</div>;
    }

}
//React-Redux(connect and Provider component)
//connect function: produces a container component that connects the application state to the action dispatch functions
const WidgetToolContainer = connect(mapStateToProps, mapDispatchToProps)(WidgetTool);
//Provider component: pass in the store and make it available to all container components in the tree via React's context feature
ReactDOM.render(
<Provider store={appStore}>
        <WidgetToolContainer />
    </Provider>, document.querySelector('main'));
