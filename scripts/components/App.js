import React from 'react';
import autobind from 'autobind-decorator';
import Header from './Header';
import OurTable from './OurTable';
import AddItemForm from './AddItemForm';

@autobind  //makes "this" refer to the react component
class App extends React.Component {

    constructor() {
        super();

        this.state = {
            sampleData : require('../sample-data'),
            hidden : true
        }
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

    showHide(){
        console.log('hidding or showing');
        this.setState({
            hidden : this.state.hidden ? false : true
        })
    }

    render() {
        return (
            <div>
                <Header tagline="Your data below" storeId={this.props.params.storeId}/>
                <OurTable 
                    sampleData={this.state.sampleData} 
                    toggleHidden = {this.showHide}
                />
                {this.state.hidden ? null : <AddItemForm 
                    showHide = {this.showHide} 
                    addItem = {this.addItem} 
                />}

            </div>
        )
    }   
};



export default App;
