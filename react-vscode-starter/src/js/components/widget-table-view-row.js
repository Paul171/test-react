import React from 'react';

export class WidgetTableViewRow extends React.Component {

    static propTypes = {
        widget: React.PropTypes.shape({
            id: React.PropTypes.number,
            name: React.PropTypes.string,
            description: React.PropTypes.description,
            color: React.PropTypes.string,
            size: React.PropTypes.string,
            quantity: React.PropTypes.number,
        }).isRequired,
        onEdit: React.PropTypes.func.isRequired,
        onDelete: React.PropTypes.func.isRequired,
    };

    render() {
        return <tr>
            <td>{this.props.widget.name}</td>
            <td>{this.props.widget.description}</td>
            <td>{this.props.widget.color}</td>
            <td>{this.props.widget.size}</td>
            <td>{this.props.widget.quantity}</td>
            <td>
                <button type="button" onClick={() => this.props.onEdit(this.props.widget.id)}>Edit</button>
                <button type="button" onClick={() => this.props.onDelete(this.props.widget.id)}>Delete</button>
            </td>
        </tr>;
    }
}