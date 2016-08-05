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
    setLoc(e){
        this.refs.location.value = e.target.value;
    }


    render() {
        console.log('the locations are: ', this.props.locations);

        return (
            <form className="addItemHolder" ref="addItemForm" onSubmit={this.addItem}>
                <input className="inputField" type="text" ref="name" placeholder="item name"/>
                <input className="inputField" type="text" ref="location" placeholder="item location"/>
                <select onChange={this.setLoc}>
                    <option value="">Location</option>
                    {this.props.locations.map(function(item){
                        return <option key={item} value={item}>{item}</option>
                    })}
                </select>
                <button className="btn btn-primary" type="button" onClick={this.cancel}>Cancel</button>
                <button className="btn btn-ok" type="submit">OK</button>
            </form>
        )
    }
}
export default AddItemForm;
