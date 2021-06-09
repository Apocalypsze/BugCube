import './App.css';
import {useEffect, useState, useRef } from "react";
import Axios from "axios";
import { PublicationMenu } from './components/Publication.jsx';
import { Grid } from '@material-ui/core';
import { ImageScroller } from './components/ImageScroller';
import Button from '@material-ui/core/Button';

function App() {

  var [publist, setpublist] = useState([""]); 
  var [channelList, setChannelList] = useState([])
  var [datasetList, setDatasetList] = useState([])
  var [directionsOptionList, setDirectionOptionList] = useState([])

  var datasetLogger = useRef("")
  var channelLogger = useRef("")
  var directionLogger = useRef("")

  var [leftImgState, setLeftImgState] = useState(process.env.PUBLIC_URL + '/Img/BugCubeLogo.jpeg')
  var [rightImgState, setRightImgState] = useState(process.env.PUBLIC_URL + '/Img/BugCubeLogo.jpeg')

  var [imgList,setImgList] = useState([[],[],[],[]])
  var [textInfo, setTextInfo] = useState("")

  //On loadup run getlist function to fill first Menu
  useEffect( () => {

    getlist();

  },[] );

  const getlist = () => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/publist`).then((response) => {
      setpublist(response.data);
      //console.log("Response Data: " + response.data[0])
      getDatasets(response.data[0]);
    });
  }

  //get request based on the currentinfo which is passed back via params
  const getDatasets = (currentInfo) => {
    datasetLogger.current = currentInfo;
    //console.log("Datasets Loggers: ",datasetLogger.current,directionLogger.current,channelLogger.current)
    //console.log("test", datasetLogger)
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/datasets`,{ params: { datasetname: datasetLogger.current } }).then((response) => {
      setDatasetList(response.data);
      getDirectionsOptions(response.data[0]);
      //console.log("getDirectionsOptions: " + response.data[0])
    })
  }

  const getDirectionsOptions = (currentdir) => {
    //console.log("currentdir: ", currentdir)
    directionLogger.current = currentdir;
    //console.log("Direction Loggers: ",datasetLogger.current,directionLogger.current,channelLogger.current)
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/directions`,{ params: { directionsname: [directionLogger.current,datasetLogger.current] } }).then((response) => {
      setDirectionOptionList(response.data);
      getChannels(response.data[0]);
      getTextInfo();
      //console.log("getChannels: ", response.data[0]);
    })
  }

  const getTextInfo = () => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/textinfo`,{ params: { textname: [directionLogger.current,datasetLogger.current] } }).then((response) => {
      setTextInfo(response.data);
      //console.log(response.data)
    })
  }

  const getChannels = async (currentInfo) => {
    channelLogger.current = currentInfo;
    //console.log("Channel Loggers: ",datasetLogger.current,directionLogger.current,channelLogger.current)
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/channels`,{ params: { channelname: [channelLogger.current,datasetLogger.current,directionLogger.current] } }).then((response) => {
      setChannelList(response.data);
      getImgList(response.data[0]);
      //console.log("getImgList " + response.data[0]);
      //console.log("------------------------------------")
    })
  }


  const getImgList = (currentInfo) => {
    //console.log("ImgList Loggers: ",datasetLogger.current,directionLogger.current,channelLogger.current)
    
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/images`,{ params: { pathinfo: [directionLogger.current,datasetLogger.current,channelLogger.current,currentInfo] } }).then((response) => {
      setImgList([[],[],[],[]]);
      setImgList(response.data);
    })
  }


  return (
    <div className="App">

    <Grid item xs={12}>
      <div className="NavBar"></div>
    </Grid>

    <Grid container spacing={2}>
        <Grid item xs={4}>

        <Grid item xs={12} container spacing={2}>
          
          <Grid item xs={12}>

          <div className="MenuBar">

        <PublicationMenu id="Publication" list={publist} channelprop={getDatasets} labelName={"Publication"}></PublicationMenu>

        <PublicationMenu id="Dataset" list={datasetList} channelprop={getDirectionsOptions} labelName={"Dataset"}></PublicationMenu>
        
        <PublicationMenu id="DirectionsOption" list={directionsOptionList} channelprop={getChannels} labelName={"DirectionsOption"}></PublicationMenu>

        <PublicationMenu id="Channel" list={channelList} channelprop={getImgList} labelName={"Channel"}></PublicationMenu>

        </div>

          </Grid>

          <Grid item xs={12}  >
            <div className="InfoBox">
            <textarea readOnly="readonly" className="InnerBox" value={textInfo}></textarea>          
            </div>
      
            </Grid>

        </Grid>

    <div >  
        <Grid container spacing={3} className="ScrollingContainer">

        <Grid item xs={3}>
          <ImageScroller imgprop={imgList[0]} leftImgProp={setLeftImgState} rightImgProp={setRightImgState}></ImageScroller>
        </Grid>
        <Grid item xs={3}>
          <ImageScroller imgprop={imgList[1]} leftImgProp={setLeftImgState} rightImgProp={setRightImgState}></ImageScroller>
        </Grid>
        <Grid item xs={3}>
          <ImageScroller imgprop={imgList[2]} leftImgProp={setLeftImgState} rightImgProp={setRightImgState}></ImageScroller>
        </Grid>
        <Grid item xs={3}>
          <ImageScroller imgprop={imgList[3]} leftImgProp={setLeftImgState} rightImgProp={setRightImgState}></ImageScroller>
        </Grid>

      </Grid>
      </div>

      <div className="test1">
      <Grid container spacing={2} >

      <Grid container xs={12}>

        <Grid xs={3} container direction="column" spacing={1}>

        <Grid item xs={12}>
            <Button variant="contained" color="default">Download 01</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="default">Download 02</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="default">Download 03</Button>
          </Grid>

        </Grid>

        <Grid xs={3} container direction="column" spacing={1}>
          
        <Grid item xs={12}>
            <Button variant="contained" color="default">Download 01</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="default">Download 02</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="default">Download 03</Button>
          </Grid>

        </Grid>

        <Grid xs={3} container direction="column" spacing={1}>
          
        <Grid item xs={12}>
            <Button variant="contained" color="default">Download 01</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="default">Download 02</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="default">Download 03</Button>
          </Grid>

        </Grid>

        <Grid xs={3} container direction="column" spacing={1}>
          
          <Grid item xs={12}>
            <Button variant="contained" color="default">Download 01</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="default">Download 02</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="default">Download 03</Button>
          </Grid>

        </Grid>
      </Grid>
      
      </Grid>

      </div>
        <div className="footer">
          <p1>Just a footer paragraph! &copy; </p1>
          <p2>Just some info</p2>
        </div>

      </Grid>

      <Grid item xs={4} class="Panelz">

      <Grid item xs={12}>
      <div className="PanelBar"></div> {/*This is a placeholder for a futre info div */}
      </Grid>

      <div id="Image-Panel-1">
        
        <img className="ImgHolder" src={leftImgState} alt="testing"></img>
      
      </div>
       </Grid>

       <Grid item xs={4} class="Panelz">

      <Grid item xs={12}>
      <div className="PanelBar"></div> {/*This is a placeholder for a futre info div */}
      </Grid>

      <div id="Image-Panel-2">
      <img className="ImgHolder" src={rightImgState} alt="testing" width="480" height="880"></img>
      </div>
       </Grid>
      </Grid>
    
      {/*<footer>Some footer</footer>*/}

    </div>
  );
}

export default App;
