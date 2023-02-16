import React, { useEffect } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const Cameraweb = () => {
  const webcamRef = React.useRef(null);
  const setIntervalId = React.useRef(null);

  useEffect(() => {
    setIntervalId.current = setInterval(capture, 300000);
    return function clearUp() {
      clearInterval(setIntervalId.current);
    };
  }, []);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 600,
      height: 600,
    });
    console.log(imageSrc);
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={true}
        height={100}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={100}
        videoConstraints={videoConstraints}
      />
      {/* <button onClick={capture}>Capture photo</button> */}
    </>
  );
};

export default Cameraweb;
