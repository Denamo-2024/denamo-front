import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import ImageSlider from "../../components/imageSlider.tsx";
import "../../App.css";

export default function SelfStudy() {
  return (
    <div>
      <Nav type="study" />
      <div className="background">
        <div
          style={{
            padding: "200px 0 300px",
            fontFamily: "Pretendard-Bold",
            fontSize: "40px",
          }}
        >
          Coming Soon...
        </div>

        <BottomInfo />
      </div>
    </div>
  );
}
