import { Avatar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import exitButton from "../assets/img/exit_button.png";
import lgLogo from "../assets/img/lg_logo.png";
import videofile from "../assets/video/hello.mp4";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  p: 0,
};

const playlist = ["og0G1GLoFw0", "ToUULWWcIRE", "sWC-pp6CXpA"];

function Home(props) {
  const [playerOpen, setPlayerOpen] = useState(false);
  const [playVideoId, setPlayVideoId] = useState();
  const [select, setSelect] = useState(0);
  const [opening, setOpening] = useState(true);

  const thumbnailRefs = useRef([]);

  const handleOpen = (e, index) => {
    setSelect(index);
    setPlayerOpen(true);
  };
  const handleClose = () => setPlayerOpen(false);

  const keyListener = useCallback(
    (e) => {
      console.log("keyListener", e.key, playerOpen);
      if (playerOpen) {
        if (e.key === "GoBack") {
          setPlayerOpen(false);
        }
        return;
      }

      if (e.key === "GoBack" || e.key === "Escape") {
        window.close();
      }

      if (opening) {
        return;
      }
      if (e.key === "Enter") {
        setPlayerOpen(true);
      } else if (e.key === "ArrowRight") {
        setSelect((sel) => (sel + 1) % playlist.length);
      } else if (e.key === "ArrowLeft") {
        setSelect((sel) => (playlist.length + sel - 1) % playlist.length);
      } else if (e.key === "ArrowUp") {
        window.location.reload();
      }
    },
    [opening, playerOpen]
  );

  useEffect(() => {
    if (opening) {
      return;
    }
    console.log("focus changed", select);
    setPlayVideoId(playlist[select]);
    thumbnailRefs.current[select].focus();
    thumbnailRefs.current[select].scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [opening, select]);

  useEffect(() => {
    window.addEventListener("keydown", keyListener);
    return () => window.removeEventListener("keydown", keyListener);
  }, [keyListener]);

  return (
    <div style={{ position: "relative" }}>
      <CSSTransition
        in={opening}
        timeout={500}
        classNames="example"
        //unmountOnExit
      >
        <Box
          sx={{
            // minHeight: "100vh",
            position: "absolute",
            top: "0",
            height: "1080px",
          }}
        >
          <video
            autoPlay
            muted
            width="1920px"
            height="1080px"
            onEnded={() => setOpening(false)}
            style={{ outline: "none", border: "none" }}
          >
            <source src={videofile} type="video/mp4" />
          </video>
        </Box>
      </CSSTransition>
      <CSSTransition
        in={!opening}
        timeout={1000}
        classNames="alert"
        unmountOnExit
      >
        <Box
          sx={{
            px: 5,
            // minHeight: "100vh",
            width: "1920px",
            height: "1080px",
            position: "absolute",
            top: 0,
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              pt: 4,
              width: "1840px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <img src={lgLogo} alt="" width="300" />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                onClick={() => window.location.reload()}
                sx={{
                  backgroundColor: "#797A7E",
                  borderRadius: 20,
                  width: "220px",
                  height: "75px",
                  mr: 2,
                  "&:focus, &:hover": {
                    backgroundColor: "#a50034",
                  },
                }}
              >
                <Typography variant="h4" fontWeight={"bold"} fontSize={40}>
                  ????????????
                </Typography>
              </Button>
              <Button onClick={() => window.close()}>
                <Avatar
                  alt=""
                  src={exitButton}
                  sx={{ width: 85, height: 85 }}
                />
              </Button>
            </Box>
          </Box>
          <Typography
            variant="h3"
            component="div"
            sx={{
              mb: 20,
              mt: 20,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            <span style={{ color: "#a50034" }}>???????????????</span>???{" "}
            <span style={{ color: "#a50034" }}>??????</span>?????? ????????? ?????????
            ???????????? ????????????.
            <br />
            ???????????? ?????? ??? ??? ????????? ????????? ?????? ???????????? ??????????????????.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              overflowX: "scroll",
              m: 3,
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {playlist.map((videoId, index) => (
              <Button
                ref={(el) => (thumbnailRefs.current[index] = el)}
                key={index}
                variant="outlined"
                onClick={(e) => handleOpen(e, index)}
                tabIndex={index}
                disableRipple={true}
                sx={{
                  flex: "0 0 auto",
                  m: 2,
                  p: 0,
                  borderWidth: 0,
                  "&:focus, &:hover": {
                    outline: "5px solid #a50034",
                  },
                }}
              >
                <img
                  width={index === select ? "650" : "600"}
                  height={index === select ? "368" : "340"}
                  src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                  alt=""
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Button>
            ))}
          </Box>
        </Box>
      </CSSTransition>
      <Modal
        open={playerOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle} height="878px">
          <iframe
            id="player"
            width="1560"
            height="878"
            src={`https://www.youtube.com/embed/${playVideoId}?autoplay=1&rel=0&modestbranding=1&fs=0&controls=0&enablejsapi=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            allowFullScreen
          />
        </Box>
      </Modal>
    </div>
  );
}

export default Home;
