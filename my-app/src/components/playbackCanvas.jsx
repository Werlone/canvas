import React, { useEffect, useState } from "react";
import { Stage, Layer, Line, Circle } from "react-konva";

function PlaybackCanvas({ recordedLines }) {
  const [playbackLines, setPlaybackLines] = useState([]);

  useEffect(() => {
    if (!recordedLines || recordedLines.length === 0) {
      console.error("No recorded lines to play back.");
      return;
    }

    console.log("Starting playback with recordedLines:", recordedLines);

    let index = 0;
    const interval = setInterval(() => {
      if (index >= recordedLines.length) {
        clearInterval(interval);
        return;
      }

      const currentLine = recordedLines[index];
      if (!currentLine) {
        console.error(`Invalid line at index ${index}:`, currentLine);
        clearInterval(interval);
        return;
      }

      // Add line or dot to the playback
      setPlaybackLines((prev) => [...prev, currentLine]);

      console.log(`Playing back item: ${index}`, currentLine);
      index++;
    }, 1000); // Add a new line or dot every 2000ms

    return () => clearInterval(interval);
  }, [recordedLines]);

  return (
    <div
      style={{
        border: "2px solid black", // Add a black border
        display: "inline-block",
        marginLeft: "10px", // Ensure the border tightly wraps around the canvas
      }}
    >
      <Stage width={1100} height={750}>
        <Layer>
          {playbackLines.map((item, index) => {
            if (item.type === "dot") {
              // If it's a dot, render a Circle
              return (
                <Circle
                  key={index}
                  x={item.x}
                  y={item.y}
                  radius={item.radius || 4} // You can adjust this as needed
                  fill={item.color || "black"}
                />
              );
            } else {
              // Otherwise, render it as a Line
              return (
                <Line
                  key={index}
                  points={item.points}
                  stroke={item.color || "black"}
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
  );
}

export default PlaybackCanvas;
