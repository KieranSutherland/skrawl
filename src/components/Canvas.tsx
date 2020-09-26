import React from "react";
import CanvasDraw from "react-canvas-draw";

const defaultProps = {
    onChange: null,
    loadTimeOffset: 5,
    lazyRadius: 30,
    brushRadius: 12,
    brushColor: "#444",
    catenaryColor: "#0a0302",
    gridColor: "rgba(150,150,150,0.17)",
    hideGrid: false,
    canvasWidth: 800,
    canvasHeight: 800,
    disabled: false,
    imgSrc: "",
    saveData: null,
    immediateLoading: false,
    hideInterface: false
  };

function Canvas() {
  return (
    <CanvasDraw 
      canvasWidth={800}
      canvasHeight={800}
      brushColor="rgb(10,10,10)"
      brushRadius={2}
      lazyRadius={0}
      hideGrid={true}
      hideInterface={true}
      />
  )
}
  
export default Canvas;