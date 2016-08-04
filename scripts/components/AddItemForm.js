import React from 'react';
import autobind from 'autobind-decorator';
import DropDownComplete from './DropDownComplete';

@autobind
class AddItemForm extends React.Component{

    constructor(){
        super();
        this.state = {
            location:''
        }
    }

    cancel(e){
        console.log('cancelled.  hide the item');
        this.props.showHide();
    }

    addItem(e){
        // 1. stop the form from submitting
        e.preventDefault();

        var item = {
            name: this.refs.name.value,
            location: this.state.location
        }

        console.log('our item is: ', item);

        // 3. Add the fish the App State
        this.props.writeItem(item);

        // 4 . clear the form and hide the control
        this.refs.addItemForm.reset();
        this.props.showHide();
    }

    addLocation(loc){
        this.setState({
            location: loc
        })
    }

    render() {

        return (
            <form ref="addItemForm" onSubmit={this.addItem}>
                <input type="text" ref="name" placeholder="item name"/>
                <DropDownComplete locations={this.props.locations} addLocation={this.addLocation}/>
                <button type="button" onClick={this.cancel}>Cancel</button>
                <button type="submit">OK</button>
            </form>
        )
    }
}
export default AddItemForm;
