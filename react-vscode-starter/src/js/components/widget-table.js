import React from 'react';
import { WidgetTableViewRow } from './widget-table-view-row';
import { WidgetTableEditRow } from './widget-table-edit-row';
export class WidgetTable extends React.Component {
    static propTypes = {
        widgets: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.number,
            name: React.PropTypes.string,
            description: React.PropTypes.description,
            color: React.PropTypes.string,
            size: React.PropTypes.string,
            quantity: React.PropTypes.number,
        })).isRequired,
        onEdit: React.PropTypes.func.isRequired,
        onDelete: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func.isRequired,
        editRowId: React.PropTypes.number.isRequired,
    };
    
    render() {
        console.log(this.props.widgets);
        console.log(Object.isFrozen(this.props));
        return (
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Color</th>
                <th>Size</th>
                <th>Quantity</th>
            </tr>
        </thead>
        <tbody>
            {this.props.widgets.map(widget => 
             (widget.id === this.props.editRowId)?
             <WidgetTableEditRow key={widget.id} widget={widget} onSave={this.props.onSave} onCancel={this.props.onCancel} />:
             <WidgetTableViewRow key={widget.id} widget={widget} onEdit={this.props.onEdit} onDelete={this.props.onDelete} />
       
            )}
        </tbody>
        </table>);
    }

}