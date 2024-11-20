export const saveDrawingToLocal = (lines) => {
    localStorage.setItem("drawing", JSON.stringify(lines));
  };
  
  export const loadDrawingFromLocal = () => {
    const data = localStorage.getItem("drawing");
    return data ? JSON.parse(data) : [];
  };
  