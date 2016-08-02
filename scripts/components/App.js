import React from 'react';

// two way data binding of nested objects.
// the built-in "LinkState" only works on the top level items
import Catalyst from 'react-catalyst';

import Header from './Header';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator'

import AddItemForm from './AddItemForm';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

@autobind 
class OurTable extends React.Component { 
    constructor(){
        super();
        this.locations = {};
    }


    /* 
        takes data formatted with keys and makes the key some named id in your objects
        item1: {name: 'mike', desc: 'blah'}
        becomes
        [{id:item1, name:'mike', desc: 'blah'}]
    */

    //should i pass data in already in this format?
    //i.e. after i get it from firebase lets just format it into an array for the table stuff

    //if so change the way listItemsInColumn works.
    //seems heavy to keep iterating through the keys
    dataToArray(data, id){
        let dataArray = [];
        Object.keys(data).map(
            (key) => {
                let dataObj = data[key];
                dataObj[id] = key;
                dataArray.push(dataObj)
            }
        );
        return dataArray;
    }

    onAfterSaveCell(){
        console.log("saved!");
        alert("test");
    }

    btnClick(){
        console.log('toggling');
        {this.props.toggleHidden()}
    }
    
    enumFormatter(cell, row, enumObject) {
        return enumObject[cell];
    }

    // pass in a column name.  generate an object with all the unique names of this column for drop-down
    listItemsInColumn(colName) {
        let d = this.props.sampleData;
        Object.keys(d) .map(
            (key) => {
                this.locations[d[key][colName]] = d[key][colName];
            }
        )
        console.log("locations: ",this.locations);
    }

    componentWillUpdate(){
        console.log('updating...')

    }

       
    render() {
        console.log('calling render...');
        
        //
        this.listItemsInColumn("location");

        const cellEditProp = {
            mode: 'click',
            afterSaveCell: this.onAfterSaveCell
        };

        let w = (window.innerWidth - 120).toString();

        return (
            <div>
                <button type="button" className="btn btn-success btn-padding" onClick={this.btnClick}>Add New</button>
                <BootstrapTable 
                    data={this.dataToArray(this.props.sampleData, "id")} 
                    striped={false} 
                    hover={true} 
                    cellEdit={cellEditProp}>

                    <TableHeaderColumn isKey={true} dataField="id" hidden={ true }>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" width={w} dataSort={true}>Name</TableHeaderColumn>
                    <TableHeaderColumn 
                        dataField="location" 
                        filterFormatted 
                        dataFormat={ this.enumFormatter } 
                        formatExtraData={ this.locations }
                        filter={ { type: 'SelectFilter', options: this.locations } }>
	                    Location
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }

}


@autobind  //makes "this" refer to the react component
class App extends React.Component {

    constructor() {
        super();

        this.state = {
            sampleData : require('../sample-data'),
            hidden : true
        }
    }

    showHide(){
        console.log('hidding or showing');
        this.setState({
            hidden : this.state.hidden ? false : true
        })
    }

    setStoreName(store){
        this.setState({
            store : store
        })
    }

    addItem(item){
        //add the item to the database
        console.log("adding item", item);
    }

    render() {
        return (
            <div>
                <Header tagline="Your data below" storeId={this.props.params.storeId}/>
                <OurTable 
                    sampleData={this.state.sampleData} 
                    toggleHidden = {this.showHide}
                />
                {this.state.hidden ? null : <AddItemForm showHide = {this.showHide} addItem = {this.addItem} />}

            </div>
        )
    }   
};

reactMixin.onClass(App, Catalyst.LinkedStateMixin);

export default App;
