import React from 'react';
import Autosuggest from 'react-autosuggest';

let data = [];

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : data.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
}

function getSuggestionValue(suggestion) { // when suggestion selected, this function tells
  return suggestion.name;                 // what should be the value of the input
}

//get the data into the right format
function formatData(obj){
      var ret = [];
      for (var item in obj){
          ret.push({"name": obj[item]})
      }

      return ret;
  }

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

class DropDownComplete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: getSuggestions('')
    };

    //set initial data
    data = formatData(this.props.locations);

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  }


  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  }

  onSuggestionsUpdateRequested({ value }) {
    this.setState({
      suggestions: getSuggestions(value)
    });
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Type location',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest suggestions={suggestions}
                   onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                   getSuggestionValue={getSuggestionValue}
                   renderSuggestion={renderSuggestion}
                   inputProps={inputProps} />
    );
  }
}

export default DropDownComplete;