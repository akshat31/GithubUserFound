import React, { Component } from 'react';

class tableHead extends Component {

  render() {
    return (
        <tr className="text-center">
            <th>Repository Name</th>
            <th>Description</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Pushed</th>
            <th>Preview</th>
            <th>Download</th>
        </tr>
    );
  }
}

export default tableHead;