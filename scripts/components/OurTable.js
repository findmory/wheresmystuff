import React from 'react';

// two way data binding of nested objects.
// the built-in "LinkState" only works on the top level items
import Catalyst from 'react-catalyst';

import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator'

import AddItemForm from './AddItemForm';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

@autobind 
class OurTable extends React.Component { 
    constructor(){
        super();
        this.locations = {};  //TODO: do i need to make this state?
        this.state =  {
             hidden : true
        }
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

    /*
        takes data formatted like
        {key2: 'val1', key2: 'val2'}
        becomes
        [val1, val2]
        becuase i need an array of the values for dropdown
    */
    objToArray(obj){
        console.log('the obj is: ', obj);
      var ret = [];
      for (var item in obj){
          ret.push(obj[item])
      }

      return ret;
  }

    onAfterSaveCell(){
        console.log("saved!");
        alert("test");
    }

    enumFormatter(cell, row, enumObject) {
        return enumObject[cell];
    }

    showHide(){
        console.log('hidding or showing');
        this.setState({
            hidden : this.state.hidden ? false : true
        })
    }

    writeItem(item){
        console.log('write item to DB and state: ', item);
    }

    // pass in a column name.  generate an object with all the unique names of this column for drop-down
    listItemsInColumn(colName) {
        let d = this.props.sampleData;
        Object.keys(d).map(
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
                <button type="button" className="btn btn-success btn-padding" onClick={this.showHide}>Add New</button>
                <BootstrapTable 
                    data={this.dataToArray(this.props.sampleData, "id")} 
                    striped={false} 
                    hover={true} 
                    cellEdit={cellEditProp}>

                    <TableHeaderColumn isKey={true} dataField="id" hidden={true}>ID</TableHeaderColumn>

                    <TableHeaderColumn 
                        dataField="name" 
                        filter={{type:"TextFilter", placeholder:"Search"}}
                        width={w} 
                        dataSort={true} >
                        Name
                    </TableHeaderColumn>

                    <TableHeaderColumn 
                        dataField="location" 
                        filterFormatted
                        dataSort={true}
                        dataFormat={ this.enumFormatter } 
                        formatExtraData={ this.locations }
                        filter={ { type: 'SelectFilter', options: this.locations } }>
	                    Location
                    </TableHeaderColumn>

                </BootstrapTable>
                {this.state.hidden ? null : <AddItemForm 
                    showHide = {this.showHide}
                    writeItem = {this.writeItem}
                    
                    locations = {this.objToArray(this.locations)}
                />}
            </div>
        )
    }

}

reactMixin.onClass(OurTable, Catalyst.LinkedStateMixin);

export default OurTable;
