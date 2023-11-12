import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "./Row.css";
import MovieModal from "./MovieModal";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Row({ title, id, fetchUrl, isLargeRow }) {
  const [movie, setmovie] = useState([]);
  const [modalOpen, setmodalOpen] = useState(false);
  const [movieSelected, setmovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData(); // 영화 정보 가져오기
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    console.log("request", request); // api내 경로 확인
    setmovie(request.data.results);
  };

  const handleClick = (movie) => {
    setmodalOpen(true);
    setmovieSelected(movie); // 내가 선택한 movie 정보를 기입
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          1378: {
            slidesPerView: 6,
            sliderPerGroup: 6,
          },
          998: {
            slidesPerView: 5,
            sliderPerGroup: 8,
          },
          625: {
            slidesPerView: 4,
            sliderPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            sliderPerGroup: 3,
          },
        }}
      >
        <div id={id} className="row__posters">
          {movie.map(
            (
              movie // id에 따라 map을 배포해야 하기 때문에 id값을 입력해야 한다
            ) => (
              <SwiperSlide>
                <img
                  key={movie.id}
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={`https://image.tmdb.org/t/p/original/${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                  onClick={() => handleClick(movie)}
                />
              </SwiperSlide>
            )
          )}
        </div>
      </Swiper>

      {modalOpen && ( // modal이 true인 경우 MovieModal 컴포넌트를 렌더링 한다
        <MovieModal {...movieSelected} setModalOpen={setmodalOpen} /> // MovieModal 안에 ...movieSelected의 정보를 기입하고, setModalOpen={setmodalOpen}을 넣어 modalOpen을 모달을 열거나 닫는 데 사용할 수 있게 한다 -> x버튼 누르면 닫게 하기 위하여
      )}
    </section>
  );
}

/*
// install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      // spaceBetween={50} 이미지 간격
      // slidesPerView={3}  화면에 이미지 몇 개가 보일지 설정
      // navigation // 화살표 줄지 말지 설정
      // pagination={{ clickable: true }} // 이미지 아래, 이미지 갯수만큼의 동그라미 설정
      // loop={true} // 이미지 다 돌린 후에 다시 처음으로 돌릴지 설정
      // scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)} -> 슬라이더 할 때 함수를 주고 싶을 때 사용
      // onSlideChange={() => console.log('slide change')}
*/

// Swiper 이전에 scrollLeft 사용하였음
