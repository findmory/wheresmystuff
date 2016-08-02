import React from 'react';
import { History } from 'react-router';
import h from '../helpers';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';

@autobind
// autobind decorator is the same as calling {this.goToStore.bind(this)} but it does the binding for you
// can autobind at the class or method level
// requires es7.decorators. 
// so in gulpfile.js you need to include  transform:  [babelify.configure({stage : 0 })] in your buildScript
class StorePicker extends React.Component {

    goToStore(event){
        event.preventDefault();
        console.log('ya submitted it', this.refs);
        //get the data from the input
        var storeId = this.refs.storeId.value;
        //transition from StorePicker to App
        this.history.pushState( null, '/store/' + storeId);
    }

    render() {
        return (
            /* comments need to be like this in JSX */
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Enter your database</h2>
                <input type="text" ref="storeId" defaultValue={h.getFunName()} required/>
                <input type="Submit" value="Submit"/>
            </form>
        )
    }
};

reactMixin.onClass(StorePicker, History);

export default StorePicker;