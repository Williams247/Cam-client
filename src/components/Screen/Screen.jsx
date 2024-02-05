import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faCogs,
  faDownload,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { generateRandomNumbers } from "../../utils/random";
import "./Screen.css";
import Settings from "../Settings/Settings";

const Screen = () => {
  const [isSettingsOpen, setIsSettings] = useState(false);
  const [imageType, setImageType] = useState({
    label: "None",
    value: "None",
    canvasValue: "",
  });
  const handleMountCamera = () => {
    const video = document.getElementById("video");
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
          video.play();
        });
    }
  };
  const handleSnapPhoto = () => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const video = document.getElementById("video");
    document.getElementById("modal").style.display = "flex";
    context.filter = imageType.canvasValue;
    context.drawImage(video, 0, 0, 640, 480);
  };
  const handleCloseModal = () => {
    document.getElementById("modal").style.display = "none";
  };
  const handleDownloadImage = () => {
    const canvas = document.getElementById("canvas");
    const fullQuality = canvas.toDataURL("image/jpeg", 1.0);
    const tmpLink = document.createElement("a");
    tmpLink.download = `IMG_${generateRandomNumbers()}.jpeg`;
    tmpLink.href = fullQuality;
    document.body.appendChild(tmpLink);
    tmpLink.click();
    document.body.removeChild(tmpLink);
    handleCloseModal();
  };
  const handleOpenCloseSettings = () => {
    setIsSettings(!isSettingsOpen);
  };
  const handleSetImageType = (type) => {
    setImageType(type);
  };
  useEffect(() => {
    handleMountCamera();
  });
  return (
    <div className={"container"}>
      <div id="screen-container" className="d-flex justify-content-center">
        <div id="screen">
          <video
            id="video"
            autoplay
            className={
              imageType.value === "" || imageType.value === "None"
                ? ""
                : imageType.value
            }
          ></video>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div id="control-container" className="d-flex">
          <div
            className="control-space cursor-pointer"
            onClick={handleSnapPhoto}
          >
            <FontAwesomeIcon icon={faCamera} />
          </div>
          <div
            className="control-space cursor-pointer"
            onClick={handleOpenCloseSettings}
          >
            <FontAwesomeIcon icon={faCogs} />
          </div>
        </div>
      </div>
      <div id="modal" className="d-flex justify-content-center">
        <div id="modal-box">
          <div id="modal-box-close-container">
            <button>
              <div
                className="control-space cursor-pointer"
                onClick={handleDownloadImage}
                title="Save/Download"
              >
                <FontAwesomeIcon icon={faDownload} />
              </div>
            </button>
            <button
              id="close"
              className="cursor-pointer"
              title="close"
              onClick={handleCloseModal}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <canvas id="canvas" width="650" height="480"></canvas>
          <div
            id="modal-control-container"
            className="d-flex justify-content-center"
          ></div>
        </div>
      </div>
      <Settings
        isSettingsOpen={isSettingsOpen}
        handleOpenCloseSettings={handleOpenCloseSettings}
        handleSetImageType={handleSetImageType}
        imageType={imageType}
      />
    </div>
  );
};

export default Screen;
