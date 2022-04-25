import { Box, Paper, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import welcomeLottie from "../assets/lottie/71338-welcomegolden.json";
import LottiePlayer from "../components/LottiePlayer";

function Welcome(props) {
  const navigate = useNavigate();
  const keyListener = useCallback(
    (e) => {
      if (e.key === "ArrowRight") {
        navigate("/detail");
      } else if (e.key === "GoBack" || e.key === "Escape") {
        window.close();
      }
    },
    [navigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", keyListener);
    return () => window.removeEventListener("keydown", keyListener);
  }, [keyListener]);

  return (
    <>
      <Paper>
        <Box sx={{ minHeight: "100vh", p: 20 }}>
          <LottiePlayer animationData={welcomeLottie} />

          <Paper sx={{ position: "absolute", top: 560, left: 0, right: 0 }}>
            <Box sx={{ px: 20, mt: 4 }}>
              <Typography variant="h4" sx={{ mt: 20 }}>
                <span style={{ color: "#6861E2" }}>이진님</span>, 환영합니다.
                <br />
                <span style={{ color: "#6861E2" }}>틔운</span>을 구매하셨네요!
                <br />
                더욱 쾌적한 공간을 만들어 볼까요?
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Paper>
    </>
  );
}

export default Welcome;
