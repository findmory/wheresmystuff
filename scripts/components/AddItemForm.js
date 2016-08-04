import React from 'react';
import autobind from 'autobind-decorator';
import { DropdownButton, MenuItem } from 'react-bootstrap';

@autobind
class AddItemForm extends React.Component{

    constructor(){
        super();
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
            location: this.refs.location.value
        }

        console.log('our item is: ', item);

        // 3. Add the fish the App State
        this.props.writeItem(item);

        // 4 . clear the form and hide the control
        this.refs.addItemForm.reset();
        this.props.showHide();
    }

    //get the value of the locations and use to propogate a dropdown
    setLocation(eventKey, event){
        this.refs.location.value = event.target.innerHTML;
    }


    render() {
        console.log('the locations are: ', this.props.locations);

        return (
            <form className="addItemHolder" ref="addItemForm" onSubmit={this.addItem}>
                <input className="inputField" type="text" ref="name" placeholder="item name"/>
                <input className="inputField" type="text" ref="location" placeholder="item location"/>
                <DropdownButton title="Dropdown" id="bg-nested-dropdown" onSelect={this.setLocation}>
                    {this.props.locations.map(function(item){
                        return <MenuItem key={item} eventKey={item}>{item}</MenuItem>
                    })}
                </DropdownButton>
                <button className="btn btn-primary" type="button" onClick={this.cancel}>Cancel</button>
                <button className="btn btn-success" type="submit">OK</button>
            </form>
        )
    }
}
export default AddItemForm;
