import React from 'react';

class Item extends React.Component{
    onButtonClick(){
        //this will be our delete at some point
    }

    render(){
        console.log("props: ", this.props);
        let item = this.props.item;
        let key = this.props.index;
        return (
	        <li key={key}>
                <span className="name">{item.name}</span>
                <span className="desc">{item.desc}</span>
                <br/>
            </li>
        )
    }
}

export default Item;
