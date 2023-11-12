import React, { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      console.log("ref", ref.current); // ref.current는 모달 내 컨텐츠를 뜻 함
      if (!ref.current || ref.current.contains(event.target)) {
        // !ref.current는 ref.current가 존재하지 않거나, 비어 있을 때, ef.current.contains(event.target)는 이벤트가 발생한 대상이 모달 참조인 ref에 속해 있는지 확인합니다. event.target은 클릭된 요소를 가리킨다
        return; //  return 문을 만나게 되면, 그 이후의 코드는 실행되지 않습니다
      }
      handler(event);
    };

    /*
    useOnClickOutside(ref, () => {
    setModalOpen(false);
    });

    handler가 뜻하는 것은 뒤의 setModalOpen(false)이다 
    */

    document.addEventListener("mousedown", listener); // 마우스다운이 일어날 때 리스너 호출
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
