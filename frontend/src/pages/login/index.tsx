import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {
  LoginContainer,
  Sectiontyled,
  FormStyled,
  LoginText,
  LoginError,
} from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import api from "../../service/api";

export default function Login() {
  const [errorLogin, setErrorLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const goToSignup = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    history.push("/signup");
  };
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const userData = { email, password };
    try {
      const response = await api.post("/login", userData);
      localStorage.setItem("AuthToken", `Bearer ${response.data.token}`);
      setLoading(false);
      history.push("/");
    } catch (err) {
      setLoading(false);
      setErrorLogin(err.response.data.error);
      setEmail("");
      setPassword("");
    }
  }
  return (
    <LoginContainer>
      <Sectiontyled>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <FormStyled onSubmit={handleLogin}>
          <LoginText variant="h4">Login</LoginText>
          <TextField
            label="Email Address"
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            size="small"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="password"
          />
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            disabled={loading || !email || !password}
          >
            Sign In
            {loading && (
              <CircularProgress size={30} style={{ position: "absolute" }} />
            )}
          </Button>
          {errorLogin && (
            <LoginError variant="overline">{errorLogin}</LoginError>
          )}
          <Button size="small" color="primary" onClick={goToSignup}>
            Don't have an account? Sign Up
          </Button>
        </FormStyled>
      </Sectiontyled>
    </LoginContainer>
  );
}
