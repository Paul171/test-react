import React from 'react';

export class WidgetTableEditRow extends React.Component {

    static propTypes = {
        widget: React.PropTypes.shape({
            id: React.PropTypes.number,
            name: React.PropTypes.string,
            description: React.PropTypes.description,
            color: React.PropTypes.string,
            size: React.PropTypes.string,
            quantity: React.PropTypes.number,
        }).isRequired,
        onSave: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.widget.name,
            description: this.props.widget.description,
            color: this.props.widget.color,
            size: this.props.widget.size,
            quantity: this.props.widget.quantity,
        };
    }

    onChange = e => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.type === 'number'
                ? Number(e.currentTarget.value)
                : e.currentTarget.value
        });
    }

    saveWidget = () => {
        this.props.onSave(Object.assign({ id: this.props.widget.id }, this.state));
    }

    render() {
        return <tr>
            <td><input type="text" name="name"
                value={this.state.name} onChange={this.onChange} /></td>
            <td><input type="text" name="description"
                value={this.state.description} onChange={this.onChange} /></td>
            <td><input type="text" name="color"
                value={this.state.color} onChange={this.onChange} /></td>
            <td><input type="text" name="size"
                value={this.state.size} onChange={this.onChange} /></td>
            <td><input type="number" name="quantity"
                value={this.state.quantity} onChange={this.onChange} /></td>
            <td>
                <button type="button" onClick={this.saveWidget}>Save</button>
                <button type="button" onClick={this.props.onCancel}>Cancel</button>
            </td>
        </tr>;
    }
}