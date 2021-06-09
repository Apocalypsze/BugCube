{/*import React, { Component } from 'react';
import axios from 'axios';

export class ImageReader extends Component {
  state = { source: null };

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/currentImage`).then(response => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
        console.log("test: " + base64)
        this.setState({ source: "data:;base64," + base64 });
      });
  }

  render() {
    return <img src={this.state.source} />;
  }
}

//export default ImageReader;
*/}
