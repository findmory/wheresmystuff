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
            <form className="addItemHolder container-fluid" ref="addItemForm" onSubmit={this.addItem}>
                <input className="inputField col-xs-12 col-md-12" type="text" ref="name" placeholder="item name"/>
                <input className="locationField col-xs-8 col-md-8" type="text" ref="location" placeholder="item location"/>
                <select onChange={this.setLoc} className="locationDrop col-xs-3 col-md-3">
                    <option value="">Location</option>
                    {this.props.locations.map(function(item){
                        return <option key={item} value={item}>{item}</option>
                    })}
                </select>
                <div className="col-xs-12 col-md-12">
                    <button className="btn btn-primary col-xs-4 col-md-4" type="button" onClick={this.cancel}>Cancel</button>
                    <span className="col-xs-4 col-md-4"></span>
                    <button className="btn btn-success col-xs-4 col-md-4" type="submit">OK</button>
                </div>
            </form>
        )
    }
}
export default AddItemForm;
