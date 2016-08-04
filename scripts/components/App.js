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
            sampleData : require('../sample-data')
           
        }
    }

    setStoreName(store){
        this.setState({
            store : store
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
            </div>
        )
    }   
};


export default App;
