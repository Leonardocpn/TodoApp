import styled from "styled-components";
import { Paper, Typography } from "@material-ui/core";

export const LoginContainer = styled.div`
  background-color: #f3f3ff;
  margin: 0 auto;
  outline: 0;
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginText = styled(Typography)`
  text-align: center;
`;

export const LoginError = styled(Typography)`
  text-align: center;
  color: red;
`;

export const Sectiontyled = styled(Paper)`
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const FormStyled = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 350px;
`;
