import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from "react";
import DrawingCanvas from "./components/drawingCanvas";
import PlaybackCanvas from "./components/playbackCanvas";
import Toolbar from "./components/toolbar";
import { saveDrawingToLocal, loadDrawingFromLocal } from "./utils/storageUtils";

function App() {
  const [drawing, setDrawing] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSave = (lines) => {
    setDrawing(lines);
    saveDrawingToLocal(lines);
    //console.log("Received lines to save: ", lines);
  };

  const handleLoad = () => {
    const loadedDrawing = loadDrawingFromLocal();
    setDrawing(loadedDrawing);
  };

  const handleClear = () => {
    // Clear both drawing and playback lines
    setDrawing([]);
    setIsPlaying(false); // Stop playback if active
    console.log("Clear button pressed");
  };
  
  
  /*return (
    <div>
      <div>
      <Toolbar
        onSave={() => {
          //console.log("Toolbar Save triggered"); 
          // Ensure latest data is used
          handleSave(drawing);
        }}
        onLoad={handleLoad}
        onClear={handleClear}
      />
      </div>
      <div>
      {!isPlaying ? (
        <DrawingCanvas drawing={drawing} onSave={handleSave} />
      ) : (
        <PlaybackCanvas recordedLines={drawing} />
      )}
      <button style={{marginLeft: "10px"}} onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Stop Playback" : "Start Playback"}
      </button>
      </div>
    </div>
  );*/

  return (
    <div>
      <div style={{marginBottom: "10px"}}>
      <Toolbar
        onSave={() => {
          //console.log("Toolbar Save triggered"); 
          // Ensure latest data is used
          handleSave(drawing);
        }}
        onLoad={handleLoad}
        onClear={handleClear}
      />
      </div>
      
      <div className="container-fluid vh-100">
        <div className="row">
          <div className="col-2" style={{margin: "20px", textAlign: "center"}}>

          </div>
          <div className="col-8 d-flex">
            <div className="ms-auto me-auto" style={{width: "95%", textAlign: "center"}}>
              <h2 style={{width: "1000px"}}><b><i><u>Given Prompt</u></i></b></h2>
            </div>
          </div>
        </div>
        {/* First Row */}
        <div className="row h-70">
          <div className="col-2 align-items-top" style={{border: "solid 2px black", margin: "20px", textAlign: "center"}}>
            <ul className="ms-auto me-auto" style={{width: "95%", listStyleType: "none", paddingLeft: "0px"}}>
              <li className="playerItem" style={{textAlign: "center", height: "80px", lineHeight: "80px", margin: "5px"}}>
                <p style={{margin: "auto"}}>Player 1</p>
              </li>
              <li className="playerItem" style={{textAlign: "center", height: "80px", lineHeight: "80px", margin: "5px"}}>
                <p style={{margin: "auto"}}>Player 2</p>
              </li>
              <li className="playerItem" style={{textAlign: "center", height: "80px", lineHeight: "80px", margin: "5px"}}>
                <p style={{margin: "auto"}}>Player 3</p>
              </li>
              <li className="playerItem" style={{textAlign: "center", height: "80px", lineHeight: "80px", margin: "5px"}}>
                <p style={{margin: "auto"}}>Player 4</p>
              </li>
              <li className="playerItem" style={{textAlign: "center", height: "80px", lineHeight: "80px", margin: "5px"}}>
                <p style={{margin: "auto"}}>Player 5</p>
              </li>
            </ul>
          </div>
          <div className="col-8 d-flex" style={{margin: "20px"}}>  
              {!isPlaying ? (
                <DrawingCanvas drawing={drawing} onSave={handleSave} />
              ) : (
                <PlaybackCanvas recordedLines={drawing} />
              )}
          </div>
        </div>

        {/* Second Row */}
        <div className="row h-30 mt-2">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <button style={{marginLeft: "10px"}} onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? "Stop Playback" : "Start Playback"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;