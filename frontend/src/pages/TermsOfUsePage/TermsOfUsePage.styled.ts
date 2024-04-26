import styled from "styled-components";

export const TermsOfUsePageWrapper = styled.div`
  margin-top: 88px;
  padding-top: 32px;
  padding-left: 32px;
  padding-bottom: 104px;

  background-color: var(--bukarka-white);
`;

export const TermsOfUseInfoWrapper = styled.div`
  padding-right: 240px;
  text-align: left;
  margin-left: 208px;
  margin-top: 40px;
`;

export const Label = styled.p`
  position: relative;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: fit-content;
  height: 32px;

  margin-bottom: 40px;
  padding: 4px 16px;

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

export const TextAccent = styled.p`
  margin-bottom: 48px;

  font-family: var(--regular);
  font-size: 14px;
  line-height: 1.43;
  color: var(--bukarka-deep-blue);
`;

export const Title = styled.h1`
  margin-bottom: 16px;

  font-family: var(--semibold);
  font-weight: 600;
  font-size: 20px;
  line-height: 1.2;
  text-align: center;
  color: var(--bukarka-black);
`;

export const Terms = styled.ol`
  li {
    list-style-type: decimal;
    list-style-position: inside;

    font-family: var(--semibold);
    font-size: 14px;
    line-height: 1.43;
    color: var(--bukarka-black);
  }

  h2 {
    display: inline-block;

    margin-bottom: 16px;

    font-family: var(--semibold);
    font-size: 14px;
    line-height: 1.43;
    color: var(--bukarka-black);
  }

  p {
    margin-bottom: 16px;

    font-family: var(--regular);
    font-size: 14px;
    line-height: 1.43;
    color: var(--bukarka-black);
  }
`;

export const Wrapper = styled.div`
  width: 672px;
  margin: 96px auto 0;
`;
