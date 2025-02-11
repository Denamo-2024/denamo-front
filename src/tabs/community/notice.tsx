import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import CheckAuthAPI from "../../api/checkAuthAPI.tsx";
import GetNoticesAPI from "../../api/notices/getNoticesAPI.tsx";

import "../../App.css";

type Post = {
  noticeId: number;
  member: { studentId: number; name: string };
  title: string;
  content: string;
  type: string;
  views: number;
  images: string[];
  files: string[];
  comments: string[];
  createdAt: number[];
  updatedAt: number[];
};

const maxVisiblePages = 5;

export default function Notice() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const postList = searchParams.get("post") || "전체";

  const [checkAuth, setCheckAuth] = useState<number>(1);
  const [postsToDisplay, setPostsToDisplay] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const startPage =
    Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const changePage = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setSearchParams({
      post: postList,
      page: page.toString(),
      size: "8",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    CheckAuthAPI().then((data) => {
      if (data.role === "ROLE_ADMIN" || data.role === "ROLE_OPS") {
        setCheckAuth(2);
      } else if (data.role === "ROLE_ADMIN") {
        setCheckAuth(1);
      } else {
        setCheckAuth(0);
      }
    });
  }, []);

  useEffect(() => {
    GetNoticesAPI(postList, currentPage).then((result) => {
      console.log(result.content);
      var noticeData = result.content;
      setPostsToDisplay(noticeData);
      setTotalPages(result.totalPages);
      console.log(postsToDisplay, totalPages);
    });
  }, [postList, currentPage]);

  return (
    <div>
      <Nav type="community" />
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
            height: "1450px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "1000px",
              height: "1300px",
              margin: "100px auto",
              display: "flex",
            }}
          >
            <div
              style={{
                boxSizing: "border-box",
                width: "180px",
                height: "100%",
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
                {["전체", "대회 및 세미나", "동아리 공지"].map((category) => (
                  <div
                    key={category}
                    className="side_tabs"
                    style={
                      postList === category
                        ? {
                            boxSizing: "border-box",
                            color: "#2CC295",
                            borderRight: "1px solid #2cc295",
                          }
                        : {}
                    }
                    onClick={() => {
                      setSearchParams({
                        post: category,
                        page: "1",
                        size: "8",
                      });
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    {category}
                  </div>
                ))}
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
                  {postList}
                </div>

                <Link to={`/noticeAdd?post=${searchParams.get("post")}`}>
                  <img
                    src="../../img/btn/edit_enabled.png"
                    alt="edit"
                    style={{
                      width: "30px",
                      cursor: "pointer",
                      opacity: "0.8",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "0.8";
                    }}
                  />
                </Link>
              </div>

              <div style={{ margin: "40px 0 50px" }}>
                {postsToDisplay.length > 0 ? (
                  postsToDisplay.map((post) => (
                    <Link
                      to={`/noticePost?id=${post.noticeId}`}
                      key={post.noticeId}
                      style={{
                        textDecoration: "none",
                        width: "100%",
                        height: "110px",
                        backgroundColor: "#222",
                        border: "0.5px solid #343434",
                        borderRadius: "30px",
                        marginBottom: "30px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.border = "0.5px solid #777";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.border = "0.5px solid #343434";
                      }}
                    >
                      <div style={{ width: "90%", margin: "0 auto" }}>
                        <div
                          style={{
                            marginBottom: "5px",
                            fontFamily: "Pretendard-Regular",
                            fontSize: "15px",
                            color: "#2CC295",
                          }}
                        >
                          {post.type}
                        </div>
                        <div
                          style={{
                            marginBottom: "5px",
                            fontFamily: "Pretendard-SemiBold",
                            fontSize: "18px",
                            color: "#fff",
                          }}
                        >
                          {post.title}
                        </div>
                        <div
                          style={{
                            fontFamily: "Pretendard-Regular",
                            fontSize: "15px",
                            color: "#888",
                          }}
                        >
                          작성자: {post.member.name}
                          &emsp; 작성 일자:{" "}
                          {post.createdAt[0] +
                            "/" +
                            post.createdAt[1] +
                            "/" +
                            post.createdAt[2] +
                            " " +
                            post.createdAt[3] +
                            ":" +
                            post.createdAt[4] +
                            ":" +
                            post.createdAt[5]}
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div
                    style={{
                      color: "#fff",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      textAlign: "center",
                      padding: "50px 40px",
                    }}
                  >
                    게시물이 없습니다.
                  </div>
                )}
              </div>

              <div
                style={{
                  width: "770px",
                  position: "absolute",
                  bottom: "0",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button className="bottom_tabs" onClick={() => changePage(1)}>
                  {"<<"}
                </button>
                <button
                  className="bottom_tabs"
                  onClick={() => changePage(currentPage - 1)}
                >
                  {"<"}
                </button>
                {Array.from(
                  { length: endPage - startPage + 1 },
                  (_, i) => startPage + i
                ).map((page) => (
                  <button
                    key={page}
                    className="bottom_tabs"
                    onClick={() => changePage(page)}
                    style={
                      page === currentPage
                        ? {
                            textShadow: "0 0 0.1em, 0 0 0.1em",
                            color: "#2CC295",
                          }
                        : {}
                    }
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="bottom_tabs"
                  onClick={() => changePage(currentPage + 1)}
                >
                  {">"}
                </button>
                <button
                  className="bottom_tabs"
                  onClick={() => changePage(totalPages)}
                >
                  {">>"}
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <BottomInfo />
    </div>
  );
}
