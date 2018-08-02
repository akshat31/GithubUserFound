import React, { Component } from 'react';


class UserImage extends Component {

  render() {
    return (
        <div>
            <img src={this.props.userIMG} width="50%" className='img-thumbnail' alt="profile pic"/>
        </div>
    );
  }
}

export default UserImage;