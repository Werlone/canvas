import React, { useEffect, useState, useRef } from "react";
import { Stage, Layer, Line, Circle } from "react-konva";
import { throttle } from "lodash";
import ReactColor from "react-input-color";  // Import react-input-color library
import 'bootstrap/dist/css/bootstrap.min.css';

function DrawingCanvas({ drawing, onSave}) {
  const [localDrawing, setLocalDrawing] = useState(drawing); // Track local drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDrawingDot, setIsDrawingDot] = useState(false); // Track if we're drawing a dot
  const [color, setColor] = useState("#000000"); // Default drawing color (black)
  const [lineWidth, setLineWidth] = useState(2); // Default drawing width 2
  const stageRef = useRef(null);
  const layerRef = useRef(null);

  // Use a ref to persist the throttled function across renders
  const throttledSave = useRef(
    throttle((updatedDrawing) => {
      onSave(updatedDrawing);
    }, 50)
  ).current;

  useEffect(() => {
    setLocalDrawing(drawing); // Sync prop to local state when prop changes
  }, [drawing]);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex); // Update the drawing color
  };

  const handleWidthChange = (newWidth) => {
    setLineWidth(newWidth);
  }

  // Handle mouse down event
  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();

    if (isDrawingDot) {
      // Draw a dot at the position
      const newDot = { x: pos.x, y: pos.y, type: "dot", color:color, radius:lineWidth+2 };
      const updatedDrawing = [...localDrawing, newDot];
      setLocalDrawing(updatedDrawing);
      throttledSave(updatedDrawing);
    } else {
      // Draw a line starting at the position
      const newLine = { points: [pos.x, pos.y], type: "line", color:color, lineWidth:lineWidth };
      const updatedDrawing = [...localDrawing, newLine];
      setLocalDrawing(updatedDrawing);
      throttledSave(updatedDrawing);
    }
  };

  // Handle mouse move event (draw line if drawing line mode)
  const handleMouseMove = (e) => {
    if (!isDrawing || isDrawingDot) return;

    const stage = stageRef.current;
    const point = stage.getPointerPosition();

    const updatedDrawing = [...localDrawing];
    updatedDrawing[updatedDrawing.length - 1].points.push(point.x, point.y);

    throttledSave(updatedDrawing);
  };

  // Handle mouse up event (end drawing)
  const handleMouseUp = () => {
    setIsDrawing(false);
    onSave(localDrawing); // Save the drawing to the parent after the drawing is finished
  };

  // Toggle drawing mode (line or dot)
  const toggleDrawingMode = () => {
    setIsDrawingDot((prev) => !prev); // Toggle between line and dot mode
  };

   // Function to handle saving the image and submitting the form
  /*const handleSubmit = async () => {
    const stage = stageRef.current;
    const imageUri = stage.toDataURL(); // Export as PNG

    // Convert the base64 image URI to a Blob
    const response = await fetch(imageUri);
    const blob = await response.blob();

    // Create a FormData object to submit
    const formData = new FormData();
    formData.append("image", blob, "drawing.png"); // Append the image with the filename

    // Submit the form to the server
    try {
      const res = await fetch("https://your-server-url.com/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Image successfully submitted:", data);
      // Handle the response as needed
    } catch (error) {
      console.error("Error submitting the image:", error);
    }
  };*/

  // Function to handle downloading the image
  const handleDownload = () => {
    const stage = stageRef.current;
    const imageUri = stage.toDataURL(); // Export as PNG

    // Convert the base64 image URI to a Blob
    const response = fetch(imageUri)
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "drawing.png"; // Specify the file name for the download
        link.click(); // Trigger the download
        URL.revokeObjectURL(link.href); // Clean up the object URL after the download
      })
      .catch((error) => console.error("Error downloading the image:", error));
  };


  // Update the canvas when the 'drawing' prop changes
  useEffect(() => {
    if (drawing.length > 0 && layerRef.current) {
      layerRef.current.batchDraw();
    }
  }, [drawing]); // Trigger effect when 'drawing' prop changes

  return (
    <div>
      <div
        style={{
          border: "2px solid black", // Add a black border
          display: "inline-block",
        }}
      >
        <Stage
          width={1100}
          height={750}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          ref={stageRef}
        >
          <Layer ref={layerRef}>
            {drawing.map((item, index) => {
              if (item.type === "dot") {
                return (
                  <Circle
                    key={index}
                    x={item.x}
                    y={item.y}
                    radius={item.radius || 4} // Set the radius for the dot
                    fill={item.color || "black"}  // Use the color saved in the line object
                  />
                );
              } else {
                return (
                  <Line
                    key={index}
                    points={item.points}
                    stroke={item.color ||"black"}  // Use the color saved in the line object
                    strokeWidth={item.lineWidth || 2}
                    lineCap="round"
                    lineJoin="round"
                  />
                );
              }
            })}
          </Layer>
        </Stage>
      </div>
      <div style={{justifyContent: "center", display: "flex"}}>
        <button style={{margin: "5px"}} onClick={toggleDrawingMode}>
            {isDrawingDot ? "Drawing Mode - Dot" : "Drawing Mode - Line"}
        </button>
        <button onClick={handleDownload} style={{ margin: "5px" }}>
            Download Image
        </button>
        {/*<button style={{margin: "5px"}} onClick={onSave} >Save</button>
        <button style={{margin: "5px"}} onClick={onLoad} >Load</button>
        <button style={{margin: "5px"}} onClick={onClear} >Clear</button>*/}

        <label htmlFor="colorPicker" style={{margin: "5px", padding: "10px", border: "solid 1px black"}}><b>Color -&gt;</b></label>
        <ReactColor
            style={{margin: "5px", height: "48px"}}
            initialValue={color}  // Initial color for the color picker
            onChange={handleColorChange} // Update color when user selects a new one
        />        
          <label htmlFor="lineWidth" style={{margin: "5px", padding: "10px", border: "solid 1px black"}}><b>Line Width: {lineWidth}</b></label>
          <button
            onClick={() => handleWidthChange(Math.max(lineWidth - 1, 1))}
            style={{ margin: "5px"}}
          >
            -
          </button>
          <button
            onClick={() => handleWidthChange(Math.min(lineWidth + 1, 10))}
            style={{ margin: "5px"}}
          >
            +
          </button>    
      </div>
      
    </div>
  );
}

export default DrawingCanvas;
