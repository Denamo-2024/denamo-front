import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";

var API_SERVER_DOMAIN = "http://52.78.239.177:8080";

async function getMember(accessToken, page) {
  return fetch(API_SERVER_DOMAIN + `/api/members?page=${page}&size=10`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to get member");
    }
    return response.json();
  });
}

export default async function GetMembersAPI(page) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      let data = await getMember(accessToken, page);
      console.log(data.result);

      return data.result;
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);
          alert("Refresh accessToken");

          let newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );
          let data = await getMember(newAccessToken, page);
          console.log(data.result);

          return data.result;
        } catch (error) {
          console.error("Failed to refresh access token:", error);
          alert("다시 로그인해주세요.");
          removeCookie("accessToken");
          removeCookie("refreshToken");
          window.location.href = "/";
        }
      } else {
        console.error("No RefreshToken");
        alert("다시 로그인 해주세요.");
        removeCookie("accessToken");
        window.location.href = "/";
      }
    }
  } else {
    console.error("No AccessToken");
    alert("다시 로그인 해주세요.");
    window.location.href = "/";
  }
}
