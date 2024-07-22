import React from 'react';

class PersonaForm extends React.Component {
    handleChange(event) {
        const text = event.target.value;
        this.props.onTextChange(text);
      }
  
    render() {
      return (
        <div>
            <textarea
          value={this.props.text}
          onChange={this.handleChange.bind(this)}
          style={{ resize: 'both', minHeight: '100px', width: '100%' }}
        />
        </div>
      );
    }
  }

  export default PersonaForm;