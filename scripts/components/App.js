import React from 'react';
import autobind from 'autobind-decorator';
import Header from './Header';
import OurTable from './OurTable';
import AddItemForm from './AddItemForm';

//Firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://findmory-wms.firebaseio.com/');

@autobind  //makes "this" refer to the react component
class App extends React.Component {

    constructor() {
        super();

        this.state = {
            sampleData : require('../sample-data'),
            items: {},
            store: ''
           
        }
    }

    componentDidMount() {
        base.syncState(this.props.params.storeId + '/items', {
            context: this,
            state: 'items'
        }); //takes our state and syncs it with firebase

        var localStorageRef = localStorage.getItem('store' + this.props.params.storeId);

        if(localStorageRef) {
            //update our component state to reflect what is in local storage
            this.setState({
                store : JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('store-' + this.props.params.storeId, JSON.stringify(nextState.items));
    }

    setStoreName(store){
        this.setState({
            store : store
        })
    }

    writeItem(item) {
        console.log('writing item to state!');
        var timestamp = (new Date()).getTime();
        //update the state object
        this.state.items['item-' + timestamp] = item;
        // set the state (so it rerenders) and only pass an oject of the state that has changed
        // so it doesn't have to look through all the state for changes
        this.setState({ items : this.state.items });
    }

    render() {
        return (
            <div>
                <Header tagline="Your data below" storeId={this.props.params.storeId}/>
                <OurTable 
                    items={this.state.items} 
                    toggleHidden = {this.showHide}
                    writeItem = {this.writeItem}
                />
            </div>
        )
    }   
};


export default App;
