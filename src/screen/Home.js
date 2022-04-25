import { Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const playlist = ["85WGN0PVyZk", "QEncrWjy4Q4", "0zCFhqs-1Ik", "gKm4gNqUiNw"];

function Home(props) {
  const [playerOpen, setPlayerOpen] = useState(false);
  const [playVideoId, setPlayVideoId] = useState();
  const [select, setSelect] = useState(0);

  const thumbnailRefs = useRef([]);
  const navigate = useNavigate();

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
      if (e.key === "Enter") {
        setPlayerOpen(true);
      } else if (e.key === "GoBack" || e.key === "Escape") {
        window.close();
      } else if (e.key === "ArrowRight") {
        setSelect((sel) => (sel + 1) % playlist.length);
      } else if (e.key === "ArrowLeft") {
        setSelect((sel) => (playlist.length + sel - 1) % playlist.length);
      } else if (e.key === "ArrowUp") {
        navigate("/detail");
      }
    },
    [navigate, playerOpen]
  );

  useEffect(() => {
    console.log("focus changed", select);
    setPlayVideoId(playlist[select]);
    thumbnailRefs.current[select].focus();
    thumbnailRefs.current[select].scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [select]);

  useEffect(() => {
    window.addEventListener("keydown", keyListener);
    return () => window.removeEventListener("keydown", keyListener);
  }, [keyListener]);

  console.log("kks", process.env.PUBLIC_URL);

  return (
    <>
      <Paper>
        <Box sx={{ minHeight: "100vh", p: 5 }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ mx: 4, mt: 20, mb: 10 }}
          >
            <span style={{ color: "#6861E2" }}>틔운</span>이{" "}
            <span style={{ color: "#6861E2" }}>백이진님</span>의 행복한 순간을
            함께하면 좋겠어요.
            <br />
            오랫동안 함께 할 수 있도록 도움이 되는 콘텐츠를 보여드릴께요.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              overflowX: "hidden",
              m: 3,
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
                    outline: "5px solid white",
                  },
                }}
              >
                <img
                  width={index === select ? "650" : "600"}
                  height={index === select ? "368" : "340"}
                  src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                  alt=""
                  style={{ objectFit: "cover" }}
                />
              </Button>
            ))}
          </Box>
        </Box>
      </Paper>
      <Modal
        open={playerOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <iframe
            id="player"
            width="1200"
            height="675"
            src={`https://www.youtube.com/embed/${playVideoId}?autoplay=1&rel=0&modestbranding=1&fs=0&controls=0&enablejsapi=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            allowFullScreen
          />
        </Box>
      </Modal>
    </>
  );
}

export default Home;
