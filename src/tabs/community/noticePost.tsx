import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import dompurify from "dompurify";

import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import GetNoticeAPI from "../../api/notices/getNoticeAPI.tsx";
import DeleteNoticesAPI from "../../api/notices/deleteNoticesAPI.tsx";

import "../../App.css";

type Post = {
  noticeId: number;
  member: { studentId: string; name: string };
  title: string;
  content: string;
  type: string;
  images: string[];
  files: string[];
  comments: string[];
  createdAt: number[];
  updatedAt: number[];
};

export default function NoticePost() {
  const sanitizer = dompurify.sanitize;

  const [searchParams, setSearchParams] = useSearchParams();

  const [postData, setPostData] = useState<Post>({
    noticeId: 0,
    member: { studentId: "", name: "" },
    title: "",
    content: "",
    type: "",
    images: [],
    files: [],
    comments: [],
    createdAt: [],
    updatedAt: [],
  });

  useEffect(() => {
    GetNoticeAPI(searchParams.get("id")).then((data) => {
      setPostData(data);
    });
  }, [searchParams]);

  return (
    <div>
      <Nav type="community" />
      <div id="background" className="background">
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
              minHeight: "960px",
              margin: "0 auto",
              marginTop: "100px",
              marginBottom: "150px",
              display: "flex",
            }}
          >
            <div
              style={{
                boxSizing: "border-box",
                width: "180px",
                minHeight: "100%",
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
                공지 사항
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
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  목록으로
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
              style={{
                position: "relative",
                width: "820px",
                height: "100%",
                textAlign: "left",
                paddingLeft: "50px",
              }}
            >
              <div
                style={{
                  marginBottom: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "18px",
                    color: "#2CC295",
                  }}
                >
                  {postData.type}
                </div>
                <div style={{ height: "30px" }}>
                  <img
                    src="../../img/btn/trash_disabled.png"
                    alt="trash"
                    style={{
                      width: "30px",
                      cursor: "pointer",
                      marginRight: "15px",
                    }}
                    onClick={() => {
                      const confirm = window.confirm("정말 삭제하시겠습니까?");
                      if (confirm) {
                        DeleteNoticesAPI(postData.noticeId);
                      }
                    }}
                    onMouseOver={(e) => {
                      (
                        e.target as HTMLImageElement
                      ).src = `../../img/btn/trash_enabled.png`;
                    }}
                    onMouseOut={(e) => {
                      (
                        e.target as HTMLImageElement
                      ).src = `../../img/btn/trash_disabled.png`;
                    }}
                  />
                  <img
                    src="../../img/btn/edit_enabled.png"
                    alt="edit"
                    style={{ width: "30px", cursor: "pointer" }}
                    onClick={() => {
                      window.location.href = "/noticeEdit";
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  marginBottom: "13px",
                  fontFamily: "Pretendard-SemiBold",
                  fontSize: "30px",
                  color: "#fff",
                }}
              >
                {postData.title}
              </div>
              <div
                style={{
                  marginBottom: "50px",
                  fontFamily: "Pretendard-Light",
                  fontSize: "16px",
                  color: "#777",
                }}
              >
                작성자: {postData.member.name}
                &emsp; 작성 일자:{" "}
                {postData.createdAt[0] +
                  "/" +
                  postData.createdAt[1] +
                  "/" +
                  postData.createdAt[2] +
                  " " +
                  postData.createdAt[3] +
                  ":" +
                  postData.createdAt[4] +
                  ":" +
                  postData.createdAt[5]}
              </div>
              <div>
                <div
                  style={{
                    marginBottom: "15px",
                    fontFamily: "Pretendard-Light",
                    fontSize: "16px",
                    color: "#fff",
                    lineHeight: "22px",
                  }}
                >
                  <div
                    className="container"
                    dangerouslySetInnerHTML={{
                      __html: sanitizer(`${postData.content}`),
                    }}
                    style={{
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#fff",
                      lineHeight: "1.4",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
