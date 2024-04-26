import styled from "styled-components";

export const BookClubPageWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 336px 1fr;
  margin-top: 88px;
  padding-top: 32px;
  padding-bottom: 104px;

  text-align: left;

  background-color: var(--bukarka-white);
`;

export const BookClubAside = styled.aside`
  width: 396px;
  padding-left: 32px;
`;

export const BookClubMain = styled.main`
  padding: 72px 140px 96px 110px;
`;

export const Label = styled.h1`
  position: relative;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: fit-content;
  height: 32px;

  margin-bottom: 40px;
  padding: 4px 16px 4px 21px;

  background-color: var(--bukarka-yellow);

  font-family: var(--semibold);
  font-weight: 600;

  font-size: 20px;
  line-height: 1.2;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 8px;
    background: var(--bukarka-deep-blue);
  }
`;

export const Image = styled.img`
  width: 336px;
  height: 459px;
`;

export const AboutBookClub = styled.div``;

export const Title = styled.h2`
  margin-bottom: 24px;

  font-family: var(--semibold);
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  color: var(--bukarka-deep-blue);
`;

export const SubTitle = styled.h3`
  margin-bottom: 16px;

  font-family: var(--semibold);
  font-size: 16px;
  line-height: 1.5;
  color: var(--bukarka-black);
`;

export const Text = styled.p`
  margin-bottom: 24px;

  font-family: var(--regular);
  font-size: 14px;
  line-height: 1.43;
  color: var(--bukarka-black);
`;

export const Wrapper = styled.div`
  width: 672px;
  grid-column: span 2;
  justify-self: center;
  margin-top: -24px;
`;
