import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";

var API_SERVER_DOMAIN = "http://52.78.239.177:8080";

async function deletePapers(accessToken, id) {
  return fetch(API_SERVER_DOMAIN + `/api/library-posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to pdelete activies");
    }
    return response.json();
  });
}

export default async function DeletePapersAPI(id) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      await deletePapers(accessToken, id);

      alert("삭제 완료");
      window.location.href = "/alexandria?tab=&search=&page=1&size=10";

      return 0;
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);

          const newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );
          await deletePapers(newAccessToken, id);

          alert("삭제 완료");
          window.location.href = "/alexandria?tab=&search=&page=1&size=10";
        } catch (error) {
          console.error("Failed to refresh accessToken: ", error);
          alert("다시 로그인 해주세요.");
          removeCookie("accessToken");
          removeCookie("refreshToken");
          window.location.href = "/";
        }
      } else {
        alert("다시 로그인 해주세요.");
        removeCookie("accessToken");
        window.location.href = "/";
      }
    }
  } else {
    alert("다시 로그인 해주세요.");
    window.location.href = "/";
  }
}
