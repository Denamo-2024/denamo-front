import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx";
import ReactEditor from "../../components/ReactEditor.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import PostNoticesAPI from "../../api/notices/postNoticesAPI.tsx";
import "../../App.css";

export default function PostAdd() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [searchParams, setSearchParams] = useSearchParams();

  const [content, setContent] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [showFiles, setShowFiles] = useState<string[]>([]);

  const handleAddFiles = (event) => {
    const docLists = event.target.files; // 선택한 파일들
    let fileLists: File[] = [...files];
    let fileNameLists: string[] = [...showFiles]; // 기존 저장된 파일명들

    for (let i = 0; i < docLists.length; i++) {
      const currentFileName: string = docLists[i].name; // 파일명 가져오기
      fileLists.push(docLists[i]);
      fileNameLists.push(currentFileName);
    }

    if (fileNameLists.length > 4) {
      fileLists = fileLists.slice(0, 4);
      fileNameLists = fileNameLists.slice(0, 4); // 최대 4개 제한
    }

    setFiles(fileLists);
    setShowFiles(fileNameLists); // 파일명 리스트 저장
  };

  const handleDeleteFile = (id) => {
    setShowFiles(showFiles.filter((_, index) => index !== id));
  };

  const onValid = (e) => {
    console.log(
      e.Category + "\n" + e.Title + "\n" + content + "\n" + showFiles,
      "onValid"
    );
    alert(
      "카테고리 : " +
        e.Category +
        "\n제목 : " +
        e.Title +
        "\n내용 : \n" +
        content +
        "\n파일 : \n" +
        showFiles
    );
    const formData = new FormData();
    const jsonData = JSON.stringify({
      title: e.Title,
      content: content,
      type: e.Category,
    });

    formData.append(
      "request",
      new Blob([jsonData], { type: "application/json" })
    );
    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    }

    PostNoticesAPI(formData);
  };

  const onInvalid = (e) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
  };

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
            height: "1250px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "1000px",
              height: "1100px",
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
                <div
                  className="side_tabs"
                  onClick={() => {
                    const deleteAdd =
                      window.confirm("작성을 취소하시겠습니까?");
                    if (deleteAdd) {
                      window.history.back();
                    }
                  }}
                >
                  작성 취소
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
                  width: "100%",
                  fontFamily: "Pretendard-Bold",
                  fontSize: "30px",
                  color: "#fff",
                }}
              >
                공지 작성
              </div>

              <form style={{ width: "100%", marginTop: "40px" }}>
                <div
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div>분류</div>
                  <div
                    style={{
                      width: "620px",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <select
                      defaultValue={searchParams.get("post") || undefined}
                      style={{
                        width: "100%",
                        height: "40px",
                        backgroundColor: "transparent",
                        borderRadius: "20px",
                        border: "none",
                        fontFamily: "Pretendard-Light",
                        fontSize: "18px",
                        color: "#2CC295",
                        cursor: "pointer",
                      }}
                      {...register("Category", {
                        required: "카테고리를 선택해주세요.",
                        validate: (value) =>
                          value !== "전체" || "카테고리를 선택해주세요.",
                      })}
                    >
                      <option
                        disabled
                        value="전체"
                        style={{ background: "#111015", color: "#ddd" }}
                      >
                        카테고리 선택
                      </option>
                      <option
                        value="대회 및 세미나"
                        style={{
                          background: "#111015",
                          color: "#2CC295",
                          cursor: "pointer",
                        }}
                      >
                        대회 및 세미나
                      </option>
                      <option
                        value="동아리 공지"
                        style={{
                          background: "#111015",
                          color: "#2CC295",
                          cursor: "pointer",
                        }}
                      >
                        동아리 공지
                      </option>
                    </select>
                  </div>
                </div>

                <div
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div>제목</div>
                  <input
                    id="title"
                    type="text"
                    placeholder="제목을 입력해주세요."
                    {...register("Title", {
                      required: "제목을 입력해주세요.",
                    })}
                    style={{
                      width: "660px",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                    }}
                  />
                </div>

                <div
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "Pretendard-Light",
                    fontSize: "18px",
                  }}
                >
                  <div>내용</div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "660px",
                      height: "500px",
                      borderRadius: "20px",
                      border: "none",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      padding: "20px",
                    }}
                  >
                    <ReactEditor content={content} setContent={setContent} />
                  </div>
                </div>

                <div
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "16px",
                  }}
                >
                  <div>파일 첨부</div>
                  <label
                    htmlFor="fileInput"
                    style={{
                      boxSizing: "border-box",
                      width: "660px",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      border: "none",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#2CC295",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onChange={handleAddFiles}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      style={{
                        display: "none",
                      }}
                      multiple
                      {...register("Image", {})}
                    />
                    <img
                      src="../../img/btn/search_enabled.png"
                      alt="search"
                      style={{ width: "25px" }}
                    />
                    &emsp;첨부 파일 선택 (최대 4장)
                  </label>
                  <input type="text" style={{ display: "none" }} />
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  {showFiles.length !== 0 ? (
                    <div
                      style={{
                        width: "620px",
                        height: "110px",
                        padding: "20px",
                        marginBottom: "20px",
                        backgroundColor: "#111015",
                        boxShadow:
                          "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                        borderRadius: "20px",
                        overflow: "auto",
                      }}
                    >
                      {showFiles.map((file, id) => (
                        <div
                          key={id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontFamily: "Pretendard-Light",
                            fontSize: "14px",
                            marginBottom: "10px",
                          }}
                        >
                          <img
                            src="../../img/btn/delete_disabled.png"
                            alt="delete"
                            style={{ width: "16px", cursor: "pointer" }}
                            onClick={() => {
                              handleDeleteFile(id);
                            }}
                            onMouseEnter={(e) => {
                              (e.target as HTMLImageElement).src =
                                "../../img/btn/delete_enabled.png";
                            }}
                            onMouseLeave={(e) => {
                              (e.target as HTMLImageElement).src =
                                "../../img/btn/delete_disabled.png";
                            }}
                          />
                          &emsp;{file}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <Button
                    type="primary"
                    size="small"
                    title="작성 완료"
                    onClick={handleSubmit(onValid, onInvalid)}
                  />
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
