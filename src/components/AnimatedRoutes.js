import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Home from "../screen/Home";
import PlayWelcome from "../screen/PlayWelcome";

function AnimatedRoutes(props) {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="example" timeout={300}>
        <Routes location={location} key={location.key}>
          <Route path="/playwelcome" element={<PlayWelcome />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default AnimatedRoutes;
