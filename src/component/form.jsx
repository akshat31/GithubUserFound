import React, { Component } from 'react';


class form extends Component {

  render() {
    return (
        <form onSubmit={this.props.getDetail}>
            <div>
                <input type="text" className="form-control" name="gitUser"/>
                <button type="submit" className="btn btn-primary btn-block">get detail</button>
            </div>
        </form>
    );
  }
}

export default form;