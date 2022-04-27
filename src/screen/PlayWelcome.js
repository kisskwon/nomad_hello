import { Box } from "@mui/system";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import videofile from "../assets/video/hello.mov";

function PlayWelcome(props) {
  const navigate = useNavigate();
  const keyListener = useCallback((e) => {
    if (e.key === "GoBack" || e.key === "Escape") {
      window.close();
    }
  }, []);
  useEffect(() => {
    window.addEventListener("keydown", keyListener);
    return () => window.removeEventListener("keydown", keyListener);
  }, [keyListener]);
  return (
    <Box>
      <video
        controls
        autoPlay
        muted
        width="100%"
        // onEnded={() => navigate("/home")}
      >
        <source src={videofile} type="video/mp4" />
      </video>
    </Box>
  );
}

export default PlayWelcome;
