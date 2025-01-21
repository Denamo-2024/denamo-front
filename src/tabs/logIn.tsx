import React from "react";
import { useForm } from "react-hook-form";

import Button from "../components/button.tsx";

import LogInAPI from "../api/members/logInAPI.tsx";

import "../App.css";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = (e: any) => {
    console.log(e, "onValid");
    LogInAPI(e.StudentNum, e.Password);
  };
  const onInvalid = (e: any) => {
    console.log(e, "onInvalid");
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "70px",
          left: "50%",
          transform: "translate(-50%, 0)",
          width: "500px",
          display: "flex",
          justifyContent: "space-between",
          zIndex: "-10",
        }}
      >
        <div
          style={{
            marginTop: "20px",
            width: "300px",
            height: "80px",
            borderRadius: "1171px",
            background: "#297FB8",
            filter: "blur(110px)",
          }}
        ></div>
        <div
          style={{
            width: "300px",
            height: "80px",
            borderRadius: "1171px",
            background: "#2CC295",
            filter: "blur(110px)",
          }}
        ></div>
      </div>
      <div
        style={{
          marginTop: "160px",
        }}
      >
        <div style={{ marginBottom: "100px" }}>
          <img
            src="..\img\main_logo_neon.png"
            alt="login_logo"
            style={{ width: "400px" }}
          />
        </div>

        <div style={{ width: "400px", margin: "0 auto" }}>
          <form
            style={{ textAlign: "left", width: "400px" }}
            onSubmit={handleSubmit(onValid, onInvalid)}
          >
            <div
              style={{
                margin: "0 auto",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "400px",
                  height: "40px",
                  backgroundColor: "#111015",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                  borderRadius: "20px",
                  margin: "0 auto",
                  marginBottom: "12px",
                }}
              >
                <input
                  id="studentNum"
                  placeholder="학 번"
                  type="text"
                  {...register("StudentNum", {
                    required: "학번 혹은 비밀번호를 확인해주세요.",
                  })}
                  style={{
                    width: "220px",
                    height: "40px",
                    margin: "0 20px",
                    borderRadius: "10px",
                    fontFamily: "Pretendard-Light",
                    fontSize: "18px",
                  }}
                />
                <span
                  style={{
                    fontFamily: "Pretendard-Regular",
                    fontSize: "16px",
                    color: "#777",
                  }}
                >
                  @sangmyung.kr
                </span>
              </div>
              <div
                style={{
                  width: "400px",
                  height: "40px",
                  backgroundColor: "#111015",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                  borderRadius: "20px",
                  margin: "0 auto",
                  marginBottom: "10px",
                }}
              >
                <input
                  id="password"
                  placeholder="비밀번호"
                  type="password"
                  {...register("Password", {
                    required: "이메일 혹은 비밀번호를 확인해주세요.",
                  })}
                  style={{
                    width: "360px",
                    height: "40px",
                    margin: "0 20px",
                    borderRadius: "10px",
                    fontFamily: "Pretendard-Light",
                    fontSize: "18px",
                  }}
                />
              </div>
              <div
                style={{
                  width: "400px",
                  height: "20px",
                  color: "#FF5005",
                  fontSize: "12px",
                  textAlign: "left",
                }}
              >
                {errors.StudentNum ? (
                  <span
                    style={{
                      display: "block",
                      paddingLeft: "20px",
                    }}
                  >
                    * {String(errors.StudentNum.message)}
                  </span>
                ) : errors.Password ? (
                  <span
                    style={{
                      display: "block",
                      paddingLeft: "20px",
                    }}
                  >
                    * {String(errors.Password.message)}
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div
              style={{
                width: "400px",
                margin: "10px 0",
                textAlign: "center",
              }}
            >
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "0",
                  border: "none",
                  backgroundColor: "transparent",
                }}
              >
                <Button type="primary" size="large" title="로그인" />
              </button>
            </div>
          </form>
          <div
            style={{
              width: "400px",
              marginTop: "40px",
              marginBottom: "30px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <a
              href="/"
              className="a"
              style={{
                fontFamily: "Pretendard-Regular",
                fontSize: "15px",
                color: "#777",
                textDecorationLine: "none",
              }}
            >
              비밀번호 찾기
            </a>
            <a
              href="/signUp"
              className="a"
              style={{
                fontFamily: "Pretendard-Regular",
                fontSize: "15px",
                color: "#777",
                textDecorationLine: "none",
              }}
            >
              회원가입
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
