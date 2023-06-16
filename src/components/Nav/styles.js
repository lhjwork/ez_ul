import styled from 'styled-components';

import theme from '../../theme';
import { SidebarContainerType } from '../../type/styledTypes/styledTypes';

export const NavContainer = styled.div<{
  ref: any;
}>``;
export const Hamburger = styled.img``;
export const TouchScreenShot = styled.img`
  width: 33px;
  object-fit: contain;
  cursor: pointer;
`;

// 분석 및 해석 필요
export const TitleContainer = styled.div<{ isShow: boolean }>`
  position: fixed;
  height: ${({ theme }) => theme.componentSize.NAVHEIGHT};
  top: 0;
  background: #fff;
  width: 100%;
  z-index: 400;
  display: ${(props) => (props.isShow ? 'flex' : 'none')};
  align-items: center;
  justify-content: space-between;
  padding: 0px 46px 0px 32px;
  @media ${({ theme }) => theme.device.tablet} {
    padding: 0px 10px;
  }
  .hamburder {
    display: none;
    font-size: 25px;
    margin-left: 5px;
    cursor: pointer;
    color: ${({ theme }) => theme.colorTheme.Blue};
    @media ${({ theme }) => theme.device.tablet} {
      display: inline-block;
      margin-right: 5px;
      &:hover {
        transition: 0.1s;
        transform: scale(1.2);
      }
    }
  }
`;

export const TitleImg = styled.img`
  cursor: pointer;
  width: 208px;
  //height: ${({ theme }) => theme.componentSize.NAVHEIGHT};
  object-fit: contain;
  @media ${({ theme }) => theme.device.table} {
    width: 100px;
  }
`;

export const ThouchAttendance = styled.div`
  font-size: 14px;
  line-height: 14px;
  font-weight: bold;
  margin-right: 10px;
  margin-left: 0px;
`;

export const SidebarContainer = styled.div<SidebarContainerType>`
  display: none;
  position: fixed;
  min-height: 100vh;
  height: 100%;
  background-color: ${({ theme }) => theme.colorTheme.MAIN};
  transition: 0.5s;
  overflow-x: hidden;
  z-index: 1000;

  @media ${({ theme }) => theme.device.tablet} {
    display: ${(props) => (props.sideDrawerOpen ? 'block' : 'none')};
    margin-top: ${({ theme }) => `calc(${theme.componentSize.NAVHEIGHT} * -1)`};
  }
`;

export const BackBlur = styled.div<SidebarContainerType>`
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  z-index: 400;
  /* calc and *-1 인경우가 언제인지 알 필요가 있음 */
  margin-top: ${({ theme }) => `calc(${theme.componentSize.NAVHEIGHT}) * -1`};
  display: none;
  @media ${({ theme }) => theme.device.tablet} {
    display: ${(props) => (props.sideDrawerOpen ? 'block' : 'none')};
  }
`;
