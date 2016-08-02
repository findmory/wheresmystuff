import React from 'react';
import autobind from 'autobind-decorator'

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

        // 2. take the data from the form and create an object
        var item = {
            name: this.refs.name.value,
            location: this.refs.location.value
        }

        console.log(item);

        // 3. Add the fish the App State
        this.props.addItem(item);

        // 4 . clear the form and hide the control
        this.refs.addItemForm.reset();
        this.props.showHide();
    }

    render() {

        //TODO: can we fill out the location with the data list?
        /*
            - App
               - AddItemForm
               - Header
               - OurTable (contains the data)
                    - AddItemForm 
        */


        return (
            <form ref="addItemForm" onSubmit={this.addItem}>
                <input type="text" ref="name" placeholder="item name"/>
                <input type="text" ref="location" placeholder="location" />
                <button type="button" onClick={this.cancel}>Cancel</button>
                <button type="submit">OK</button>
            </form>
        )
    }
}
export default AddItemForm;
