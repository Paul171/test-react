import React from 'react';
import ReactDOM from 'react-dom';
import { WidgetTable } from './components/widget-table';
import { WidgetForm } from './components/widget-form'
// const widgetData = [{
//     id: 1, name: 'Small Red Widget', description: 'A small, red widget.',
//     color: 'red', size: 'small', quantity: 2
// },{
//     id: 2, name: 'Medium Blue Widget', description: 'A medium, blue widget.',
//     color: 'blue', size: 'medium', quantity: 15
// }];
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
        fetch('http://localhost:3000/widgets')
            .then(res => res.json())
            .then(widgets => this.setState({ widgets }));
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
        return <div>
    <h1>Widget Tool</h1>
    <WidgetTable widgets={this.state.widgets} onSave={this.saveWidget} onEdit={this.editWidget} onCancel={this.cancelWidget} editRowId={this.state.editRowId} onDelete={this.deleteWidget} />
    <WidgetForm onSubmit={this.saveWidget}/>
</div>;
    }

}

ReactDOM.render(
<WidgetTool />, document.querySelector('main'));
