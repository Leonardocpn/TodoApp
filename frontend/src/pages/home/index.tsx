import React from "react";
import styled from "styled-components";
import leftLogo from "../../assets/leftLogo.svg";
import rightLogo from "../../assets/rightLogo.svg";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import avatar from "../../assets/download.jpeg";
import Badge from "@material-ui/core/Badge";
import AddAPhoto from "@material-ui/icons/AddAPhoto";
import Add from "@material-ui/icons/Add";
import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from "@material-ui/core/Avatar";
import { IconButton } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

export const Header = styled.div`
  display: flex;
  position: absolute;
  width: 100vw;
  top: 0;
  justify-content: space-between;
  background-color: #e2dffd;
`;

export const Wrapper = styled.div`
  background-color: #f3f3ff;
  height: 100vh;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 10px;
  width: 960px;
  margin: 0 auto;
`;

export const TodoContainer = styled.div`
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
`;

export const Todo = styled(Card)`
  /* height: 250px;
  width: 250px; */
  margin: 10px;
  height: 100%;
`;

export const UserInfo = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
`;

export const StyledAvatar = styled(Avatar)`
  border: 2px solid white;
`;

export const SmallAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const CardContentCenter = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

function Home() {
  return (
    <Wrapper>
      <Header>
        <img src={leftLogo} width="400" alt="Ecoleta" />
        <img src={rightLogo} width="400" alt="Ecoleta" />
      </Header>
      <Main>
        <UserInfo>
          <IconButton>
            <StyledAvatar style={{ width: 200, height: 200 }} src={avatar}>
              L
            </StyledAvatar>
          </IconButton>
        </UserInfo>

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
            <CardActions>
              <Button size="small" color="primary">
                Edit
              </Button>
              <Button size="small" color="primary">
                Done
              </Button>
            </CardActions>
          </Todo>
          <Todo>
            <CardContent>
              <Typography>Word of the Day</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Edit
              </Button>
              <Button size="small" color="primary">
                Done
              </Button>
            </CardActions>
          </Todo>
          <Todo>
            <CardContent>
              <Typography>Word of the Day</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Edit
              </Button>
              <Button size="small" color="primary">
                Done
              </Button>
            </CardActions>
          </Todo>
          <Todo>
            <CardContent>
              <Typography>Word of the Day</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Edit
              </Button>
              <Button size="small" color="primary">
                Done
              </Button>
            </CardActions>
          </Todo>
          <Todo>
            <CardContent>
              <Typography>Word of the Day</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Edit
              </Button>
              <Button size="small" color="primary">
                Done
              </Button>
            </CardActions>
          </Todo>
        </TodoContainer>
      </Main>
    </Wrapper>
  );
}

export default Home;
