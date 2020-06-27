import React from "react";
import styled from "styled-components";
import leftLogo from "../../assets/leftLogo.svg";
import rightLogo from "../../assets/rightLogo.svg";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import avatar from "../../assets/download.jpeg";
import Badge from "@material-ui/core/Badge";
import Add from "@material-ui/icons/Add";
import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from "@material-ui/core/Avatar";
import { IconButton } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import account from "../../assets/account.svg";

export const Header = styled.div`
  display: flex;
  position: absolute;
  width: 100vw;
  top: 0;
  justify-content: space-between;
  background-color: #e2dffd;
  min-height: 380px;
`;

export const Wrapper = styled.div`
  background-color: #f3f3ff;
  min-height: 100vh;
  height: 100%;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 10px;
  width: 960px;
  margin: 0 auto;
  @media only screen and (max-width: 960px) {
    width: 100%;
  }
`;

export const TodoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media only screen and (max-width: 600px) {
    flex-wrap: nowrap;
    flex-direction: column;
  }
`;

export const Todo = styled(Card)`
  margin: 10px;
  height: 100%;
`;

export const UserInfo = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 960px) {
    overflow: hidden;
  }
`;

export const StyledAvatar = styled(Avatar)`
  border: 2px solid white;
`;

export const RigthLogo = styled.img`
  width: 400px;
  @media only screen and (max-width: 900px) {
    display: none;
  }
`;
export const Account = styled.img`
  width: 50px;
  background-color: #f3f3ff;
  border-radius: 50%;
`;

export const LeftLogo = styled.img`
  width: 400px;

  @media only screen and (max-width: 400px) {
    display: none;
  }
`;

export const CardContentCenter = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export const StyledCardActions = styled(CardActions)`
  justify-content: flex-end;
`;

export const StyledFormControl = styled(FormControl)`
  width: 98%;
  background-color: white;
  border-radius: 8%;
`;

export const FormControlContainer = styled.div`
  width: 120px;
  display: flex;
  justify-content: center;
  margin-left: 8px;
  @media only screen and (max-width: 600px) {
    width: 95%;
    margin: auto;
  }
`;

function Home() {
  return (
    <Wrapper>
      <Header>
        <LeftLogo src={leftLogo} />
        <RigthLogo src={rightLogo} />
      </Header>
      <Main>
        <UserInfo>
          <IconButton>
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={<Account src={account} />}
            >
              <StyledAvatar style={{ width: 200, height: 200 }} src={avatar}>
                L
              </StyledAvatar>
            </Badge>
          </IconButton>
        </UserInfo>
        <FormControlContainer>
          <StyledFormControl>
            <FormControl variant="outlined">
              <InputLabel>Filter by</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="">Completed</MenuItem>
                <MenuItem value="">Recent</MenuItem>
                <MenuItem value="">Older</MenuItem>
              </Select>
            </FormControl>
          </StyledFormControl>
        </FormControlContainer>
        <TodoContainer>
          <Todo onClick={() => console.log("clicou")}>
            <CardActionArea>
              <CardContentCenter>
                <Typography variant="h6">Hello Username</Typography>
                <Typography>Add a Todo Here</Typography>
                <Add fontSize="large" />
              </CardContentCenter>
            </CardActionArea>
          </Todo>

          <Todo>
            <CardContent>
              <Typography>Word of the Day</Typography>
            </CardContent>
            <StyledCardActions>
              <Button size="small" color="primary">
                Edit
              </Button>
              <Button size="small" color="primary">
                Done
              </Button>
            </StyledCardActions>
          </Todo>
          <Todo>
            <CardContent>
              <Typography>Word of the Day</Typography>
            </CardContent>
            <StyledCardActions>
              <Button size="small" color="primary">
                Edit
              </Button>
              <Button size="small" color="primary">
                Done
              </Button>
            </StyledCardActions>
          </Todo>
          <Todo>
            <CardContent>
              <Typography>Word of the Day</Typography>
            </CardContent>
            <StyledCardActions>
              <Button size="small" color="primary">
                Edit
              </Button>
              <Button size="small" color="primary">
                Done
              </Button>
            </StyledCardActions>
          </Todo>
          <Todo>
            <CardContent>
              <Typography>Word of the Day</Typography>
            </CardContent>
            <StyledCardActions>
              <Button size="small" color="primary">
                Edit
              </Button>
              <Button size="small" color="primary">
                Done
              </Button>
            </StyledCardActions>
          </Todo>
          <Todo>
            <CardContent>
              <Typography>Word of the Day</Typography>
            </CardContent>
            <StyledCardActions>
              <Button size="small" color="primary">
                Edit
              </Button>
              <Button size="small" color="primary">
                Done
              </Button>
            </StyledCardActions>
          </Todo>
          <Todo>
            <CardContent>
              <Typography>Word of the Day</Typography>
            </CardContent>
            <StyledCardActions>
              <Button size="small" color="primary">
                Edit
              </Button>
              <Button size="small" color="primary">
                Done
              </Button>
            </StyledCardActions>
          </Todo>
          <Todo>
            <CardContent>
              <Typography>Word of the Day</Typography>
            </CardContent>
            <StyledCardActions>
              <Button size="small" color="primary">
                Edit
              </Button>
              <Button size="small" color="primary">
                Done
              </Button>
            </StyledCardActions>
          </Todo>
        </TodoContainer>
      </Main>
    </Wrapper>
  );
}

export default Home;
