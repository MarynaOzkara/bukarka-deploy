import styled from "styled-components";

export const AboutPageWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 336px 1fr;
  margin-top: 88px;
  padding-top: 32px;
  padding-bottom: 104px;

  text-align: left;

  background-color: var(--bukarka-white);
`;

export const AboutAside = styled.aside`
  width: 396px;
  padding-left: 32px;
`;

export const AboutMain = styled.main`
  padding: 40px 120px 96px 110px;
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

export const Image = styled.img`
  width: 336px;
  height: 459px;
`;

export const AboutStore = styled.div``;

export const Title = styled.h1`
  margin-bottom: 8px;
  font-family: "Montserrat-Alternates-Semibold";
  font-weight: 600;
  font-size: 40px;
  text-align: left;
  line-height: 0.8;

  color: var(--bukarka-deep-blue);
`;

export const SubTitle = styled.p`
  margin-bottom: 32px;

  font-family: "Montserrat-Alternates-Regular";
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: var(--bukarka-black);
`;

export const Description = styled.div`
  font-size: 14px;
  line-height: 1.43;
  color: var(--bukarka-black);

  & p {
    margin-bottom: 20px;
  }

  & p:last-child {
    margin-bottom: 32px;
  }
`;

export const Socials = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;

  font-family: var(--semibold);
  font-weight: 600;
  font-size: 14px;
  line-height: 1.43;
  color: #000;

  & span {
    vertical-align: middle;
  }
`;

export const Wrapper = styled.div`
  width: 672px;
  grid-column: span 2;
  justify-self: center;
`;
