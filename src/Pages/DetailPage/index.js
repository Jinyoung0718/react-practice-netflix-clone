import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailPage() {
  // navigate 함수를 사용하여 URL을 변경하고, 변경된 URL에서 useParams를 사용하여 해당 URL에 대한 동적인 정보(movieId)를 가져온 것임 즉 URL의 동적인 부분인 movieId를 가져옴
  const { movieId } = useParams();
  console.log("movieId", movieId);
  const [movie, setmovie] = useState({});

  /*
  useEffect 훅을 사용하여, movieId가 변경될 때마다 
  새로운 영화 데이터를 가져오기 위한 비동기 함수 fetchData를 호출합니다.
  */

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `/movie/${movieId}` // api폴더 안에 axis 인스턴스 내 base URL이 있기에 길게 치지 않아도 된다.
      );
      console.log("request", request);
      setmovie(request.data);
    }
    fetchData(); // 함수 실행
  }, [movieId]);

  if (!movie) return <div>...loading</div>;

  return (
    <section>
      <img
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="poster"
      />
    </section>
  );
}
