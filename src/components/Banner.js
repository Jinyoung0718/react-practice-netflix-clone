import axios from "../api/axios";
import React, { useState, useEffect } from "react";
import requests from "../api/requests";
import "./Banner.css";
import styled from "styled-components";

export default function Banner() {
  const [movie, setMovie] = useState([]); // 여러가지 무비 데이터를 주기위해서 usestate
  const [isCliked, setIsCliked] = useState(false);
  useEffect(() => {
    fetchData(); // fetchData 함수 내에서는 API로부터 현재 상영중인 영화 정보를 가져온 후, 이 정보 중에서 무작위로 하나의 영화를 선택하여 해당 영화의 상세 정보를 가져옵니다. 그리고 이 상세 정보에는 비디오 정보도 포함됩니다. 그 후의 렌더링에서는 해당 코드가 다시 실행되지 않으며 컴포넌트는 처음 가져온 데이터를 기반으로 화면을 렌더링합니다.
  }, []);
  // 컴포넌트가 렌더링될 때 한 번만 실행하도록 설정. 컴포넌트가 처음 렌더링될 때 데이터를 가져오고 초기 화면을 렌더링하기 위해 사용 -> 이로써 사용자가 페이지를 방문했을 때 초기 데이터가 표시되며, 그 이후의 렌더링에서는 해당 코드가 다시 실행되지 않습니다.

  const fetchData = async () => {
    // async는 비동기 함수를 선언할 때 사용하는 키워드, 이 키워드를 함수 앞에 붙이면, 함수 내에서 비동기 작업을 수행할 수 있다. :  async를 앞에 기입했기에 api를 호출하면서 awit를 할 수 있는 것

    // 현재 상영중인 영화 정보를 가져오기 (여러 영화)
    const request = await axios.get(requests.fetchNowPlaying); // await는 현재 함수를 기다리게 하고 완료되기 전까지 다음 함수로 못 넘어가게 하는 것, 보통 작업이 오래걸리는 네트워크 요청에 많이 쓰인다
    console.log(request); // 영화 정보의 경로를 보고 어느게 타이틀이고 정보인지 경로를 알아야 한다

    // 여러 영화 중 영화 하나의 ID 가져오기
    const movieID =
      request.data.results[ // id가 있는 api 데이터 경로
        Math.floor(Math.random() * request.data.results.length) // legnth를 하면은 가장 큰 값이 돼서 그 값 안에서 랜덤으로 값을 가지게 됨 : Math.floor(Math.random() * A) A가 랜덤으로 돌려지는 것에 최대값
      ].id; // 경로 뒤 필요한 id값을 추출하기 위해 .id를 붙임

    // 특정 영화의 더 상세한 정보를 가져오기 (비디오 정보도 포함)
    const { data: movieDetail } = await axios.get(`movie/${movieID}`, {
      // data 속성의 값을 movieDetail 변수에 저장
      params: { append_to_response: "videos" }, // 받아오는 response에 비디오도 같이 넣어서 전달해달라
    }); // params는 Axios를 사용하여 HTTP 요청을 보낼 때 요청에 추가 매개변수를 설정하는 데 사용되는 객체, append_to_response를 설정하는 것은 API에게 요청할 때 추가로 더 어떤 정보를 응답으로 받고 싶은지를 지정하는 것 -> append_to_response라는 매개변수를 설정하고, 해당 매개변수의 값으로 "videos"를 설정한다는 의미
    setMovie(movieDetail);
  };

  const truncate = (str, n) => {
    // 옵셔널 체이닝은 ?. 연산자로 표시되며, 이 연산자를 사용하면 해당 속성 또는 메소드가 존재하지 않는 경우 에러를 발생시키지 않고, undefined를 반환합니다.
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  /*
  const user = {
  name: "John",
  address: {
    street: "123 Main St",
    city: "New York"
  }
};

// 옵셔널 체이닝을 사용한 예시
const city = user.address?.city; // "New York"
const zipCode = user.address?.zipCode; // undefined
*/

  if (!isCliked) {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`, // movie는 usestate로 저장한 내 변수
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie.title || movie.name || movie.original_name}
          </h1>
          <div className="banner__buttons">
            <button
              className="banner__button play"
              onClick={() => setIsCliked(true)}
            >
              Play
            </button>
            <button className="banner__button info">More Information</button>
          </div>

          <h1 className="banner__description">
            {truncate(movie.overview, 100)}
          </h1>
        </div>
        <div className="banner--fadeBottom" />
      </header>
    );
  } else {
    return (
      <Container>
        <HomeContainer>
          <Iframe
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${movie.videos.results[0]?.key}?controls=0&autoplay=1&loop=1&playlist=${movie.videos.results[0]?.key}`} // 옵셔널 체이닝
            title="YouTube video player"
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
          ></Iframe>
        </HomeContainer>
      </Container>
    );
  }
}

// 스타일 컴포넌트 css 기술 사용 : npm install styled-components
const Iframe = styled.iframe`
width: 100%;
height: 100%;
z-index: -1
opacity: 0.65;
border:none;

&::after {
    content:"";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%
}
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
