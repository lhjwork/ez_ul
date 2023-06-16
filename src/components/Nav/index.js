import React, { useEffect, useState } from 'react';

import {
  BackBlur,
  NavContainer,
  SidebarContainer,
  ThouchAttendance,
  TitleContainer,
  TitleImg,
  TouchScreenShot,
} from './styles';

const Nav = () => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  // googling 시에서는 class 형 컴포넌트에서는 createRef를 통해 ref를 사용한다고 한다.
  // 공식문서 참조할 필요 반면 함수형 컴포넌트에서는 useRef 사용.
  const hamburgerRef = React.createRef(); // 1. ref 를 만들어주고

  // 해석 필요
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        // ref.current 가 true 이거나 ref.current.contains(envent.target)이 false인경우
        // setSideDrawerOpen state를 false로 지정
        if (ref.current && !ref.current.contains(event.target)) {
          setSideDrawerOpen(false);
        }
      }

      // 여기서 한번 실행하고
      document.addEventListener('mousedown', handleClickOutside);
      //  다시 return 값을 실행?
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }
  // 최초 랜더링시 실행 ref.current.contains(evnet.target)의 값의 확인 이 필요할 듯
  useOutsideAlerter(hamburgerRef);
  return (
    <div>
      <BackBlur sideDrawerOpen={sideDrawerOpen} />
      <NavContainer ref={hamburgerRef}></NavContainer>
    </div>
  );
};

export default Nav;