import React from 'react';

export class WidgetForm extends React.Component{
    static propsTypes = {
        onSubmit: React.PropTypes.func
    };
    constructor(props){
        super(props);

        this.state = {
            name: '',
            description: '',
            color: '',
            size: '',
            quantity: 0,
        };

    }
    onChange = e => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.type === 'number'
                ? Number(e.currentTarget.value)
                : e.currentTarget.value
        });
    }

    onClick = () => {

        this.props.onSubmit({
            name: this.state.name,
            description: this.state.description,
            color: this.state.color,
            size: this.state.size,
            quantity: this.state.quantity,
        });

        this.setState({
            name: '',
            description: '',
            color: '',
            size: '',
            quantity: 0,
        });
    }
    render() {
        return <form>
            <div>
                <label htmlFor="widget-name-input">Name:</label>
                <input type="text" id="widget-name-input" name="name"
                    value={this.state.name} onChange={this.onChange} />
            </div>
            <div>
                <label htmlFor="widget-description-input">Description:</label>
                <input type="text" id="widget-description-input" name="description"
                    value={this.state.description} onChange={this.onChange} />
            </div>
            <div>
                <label htmlFor="widget-color-input">Color:</label>
                <input type="text" id="widget-color-input" name="color"
                    value={this.state.color} onChange={this.onChange} />
            </div>
            <div>
                <label htmlFor="widget-size-input">Size:</label>
                <input type="text" id="widget-size-input" name="size"
                    value={this.state.size} onChange={this.onChange} />
            </div>
            <div>
                <label htmlFor="widget-quantity-input">Quantity:</label>
                <input type="number" id="widget-quantity-input" name="quantity"
                    value={this.state.quantity} onChange={this.onChange} />
            </div>
            <button type="button" onClick={this.onClick}>Add Widget</button>
        </form>;
    }
}