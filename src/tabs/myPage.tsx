import React, { useState } from "react";
import { motion } from "framer-motion";

import PersonalInfo from "../tabs/myPage/personalInfo.tsx";

import Nav from "../components/nav.tsx";
import BottomInfo from "../components/bottomInfo.tsx";
import "../App.css";

export default function MyPage() {
  const [postList, setPostList] = useState<string>("개인 정보");

  return (
    <div>
      <Nav type="myPage" />
      <div className="background">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
          style={{
            width: "100%",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "1000px",
              minHeight: "650px",
              margin: "0 auto",
              marginTop: "100px",
              marginBottom: "50px",
              display: "flex",
            }}
          >
            <div
              style={{
                boxSizing: "border-box",
                width: "180px",
                height: "600px",
                borderRight: "1px solid #444",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize: "30px",
                  color: "#fff",
                  textShadow: "0 0 0.1em, 0 0 0.1em",
                }}
              >
                마이페이지
              </div>

              <div
                style={{
                  marginTop: "40px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                }}
              >
                <div
                  className="side_tabs"
                  style={
                    postList === "개인 정보"
                      ? {
                          boxSizing: "border-box",
                          color: "#2CC295",
                          borderRight: "1px solid #2cc295",
                        }
                      : {}
                  }
                  onClick={() => {
                    setPostList("개인 정보");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  개인 정보
                </div>
                <div
                  className="side_tabs"
                  style={
                    postList === "회원 관리"
                      ? {
                          boxSizing: "border-box",
                          color: "#2CC295",
                          borderRight: "1px solid #2cc295",
                        }
                      : {}
                  }
                  onClick={() => {
                    setPostList("회원 관리");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  회원 관리
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                y: { duration: 0.5 },
              }}
              key={postList}
              style={{
                position: "relative",
                width: "820px",
                height: "100%",
                textAlign: "left",
                paddingLeft: "50px",
              }}
            >
              {postList === "개인 정보" ? (
                <PersonalInfo />
              ) : (
                <>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Pretendard-Bold",
                        fontSize: "30px",
                        color: "#fff",
                      }}
                    >
                      회원 관리
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
