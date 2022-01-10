import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import GeneralCameraSettings from "../../constants/general-settings.json";
import PhotoSettings from "../../constants/photo-settings.json";
import ImageQuality from "../../constants/image-quality.json";
import ImageTiming from "../../constants/timer-settings.json";
import "./Settings.css";

const Settings = ({ isSettingsOpen, handleOpenCloseSettings, handleSetImageType, imageType }) => {
  const [currentSettingsList, setCurrentSettingsList] = useState(0);
  const handleNavigateListMenu = (mN) => setCurrentSettingsList(mN);
  return (
    <div>
    {isSettingsOpen && (<div id="settings-modal">
      <div id="settings-menu">
        <div
          id="settings-close"
          className="cursor-pointer"
          title="Close settings"
        >
          <FontAwesomeIcon icon={faTimes} onClick={handleOpenCloseSettings} />
        </div>
        <div id="setting-menu-heading">Camera Settings</div>
        <div id="settings-menu-list">
          {GeneralCameraSettings.map((data, index) => {
            return (
              <div>
                <div
                  className={
                    currentSettingsList === index
                      ? "general-settings cursor-pointer general-settings-active"
                      : "general-settings cursor-pointer"
                  }
                  key={index}
                  onClick={() => handleNavigateListMenu(index)}
                >
                  <div className="d-flex">
                    <FontAwesomeIcon icon={currentSettingsList === index ? faChevronDown : faChevronRight} />
                    <div style={{ paddingLeft: "10px", fontSize: "15px" }}>{data}</div>
                  </div>
                </div>
                {currentSettingsList === index && (
                  <div className="each-menu-list">
                    {currentSettingsList === 0 && (
                      <div>
                        {PhotoSettings.map((data1, index1) => {
                          return (
                            <div
                                key={index1}
                                className={imageType.value === data1.value ? "sub-menu-items cursor-pointer sub-menu-items-active":"sub-menu-items cursor-pointer"}
                                onClick={() => handleSetImageType({
                                  label: data1.label,
                                  value: data1.value,
                                  canvasValue: data1.canvasValue
                              })}
                            >{index1 + 1}.
                            {data1.value}
                           </div>
                          )
                        })}
                      </div>
                    )}
                    {currentSettingsList === 1 && (
                      <div>
                        {ImageTiming.map((data2, index2) => {
                          return (
                            <div key={index2} className="sub-menu-items cursor-pointer">{data2.label}</div>
                          )
                        })}
                      </div>
                    )}
                    {currentSettingsList === 2 && (
                      <div>
                        {ImageQuality.map((data3, index3) => {
                          return (
                            <div key={index3} className="sub-menu-items cursor-pointer">{data3.label}</div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>)}
    </div>
  );
};

export default Settings;
