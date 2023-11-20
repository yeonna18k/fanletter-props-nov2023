import React from "react";
import styled from "styled-components";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";
import { useState } from "react";
import uuid from "react-uuid";
import fakeData from "../fakeData";
import { useEffect } from "react";

function Main() {
  const [btnActive, setBtnActive] = useState("");
  const [letter, setLetter] = useState(fakeData);
  const [memLetter, setMemLetter] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [member, setMember] = useState("Irene");

  const memberList = ["Irene", "Seulgi", "Wendy", "Joy", "Yeri"];

  const navi = useNavigate();

  const date = new Date();
  let today = date.toLocaleString();

  const onBtnClickHandler = (e) => {
    setBtnActive(e.target.value);
    const clicked = letter.filter((item) => {
      return item.writedTo == e.target.textContent;
    });
    setMemLetter(clicked);
  };

  useEffect(() => {
    setMemLetter([...memLetter]);
  }, [letter]);
  useEffect(() => {
    const main = letter.filter((item) => {
      return item.writedTo == "Irene";
    });
    setMemLetter(main);
  }, []);
  return (
    <StHTML>
      <Wrapper>
        <StHeader>
          <MainImg src={process.env.PUBLIC_URL + "/img/title.png"}></MainImg>
        </StHeader>

        <StMain>
          <MemberBtnBox>
            {memberList.map((item, index) => {
              return (
                <MemberBtn
                  key={index}
                  value={index}
                  className={index == btnActive ? "active" : ""}
                  onClick={onBtnClickHandler}
                  color="#A68B92"
                >
                  {item}
                </MemberBtn>
              );
            })}
          </MemberBtnBox>
          <BoxForm
            onSubmit={(e) => {
              e.preventDefault();
              const newLetter = {
                createdAt: today,
                nickname: name,
                avatar: "",
                content: comment,
                writedTo: member,
                id: uuid(),
              };
              if (name.length < 1 || comment.length < 1) {
                alert("Please enter both your name and comment");
                return false;
              }
              //   console.log(newLetter);
              setLetter([...letter, newLetter]);

              setName("");
              setComment("");
              // console.log(memLetter);
            }}
          >
            <BoxInputWrapper>
              Name :{" "}
              <BoxInputName
                type="text"
                placeholder="Up to 20 characters"
                value={name}
                onChange={(event) => {
                  if (name.length > 20) {
                    setName(event.target.value.replace(/.$/, ""));
                    alert("Up to 20 characters");

                    return false;
                  }
                  setName(event.target.value);
                }}
              ></BoxInputName>
            </BoxInputWrapper>
            <BoxInputWrapper>
              Comment :{" "}
              <BoxInputComment
                type="text"
                value={comment}
                placeholder="Up to 100 characters"
                onChange={(event) => {
                  setComment(event.target.value);
                }}
              ></BoxInputComment>
            </BoxInputWrapper>
            Artist
            <BoxSelect
              onChange={(event) => {
                setMember(event.target.value);
              }}
            >
              {memberList.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </BoxSelect>
            <BoxBtn>Submit</BoxBtn>
          </BoxForm>
          <ListDiv>
            {memLetter.map((item, index) => {
              return (
                <ListCard
                  key={index}
                  onClick={() => {
                    navi(item.id, { state: { id: item.id, letter } });
                  }}
                >
                  <ListCardImg
                    src={process.env.PUBLIC_URL + "/img/icon.svg"}
                  ></ListCardImg>
                  <ListCardText>
                    <ListCardName>{item.nickname}</ListCardName>
                    <ListCardDate>{item.createdAt}</ListCardDate>
                    <ListCardContent>{item.content}</ListCardContent>
                  </ListCardText>
                </ListCard>
              );
            })}
          </ListDiv>
        </StMain>
        <StFooter>Footer</StFooter>
      </Wrapper>
    </StHTML>
  );
}

const StHTML = styled.div`
  font-size: 62.5%;
  box-sizing: border-box;
  font-size: 1.6rem;
`;
const Wrapper = styled.div`
  max-width: 80rem;
  min-width: 40rem;
  margin: 0 auto;
`;
const StHeader = styled.header`
  display: flex;
  justify-content: center;
`;
const StMain = styled.body``;
const StFooter = styled.footer``;
const MainImg = styled.img`
  width: 40rem;
`;
const MemberBtnBox = styled.div`
  width: 35rem;
  margin: 0 auto;
`;
const MemberBtn = styled.button`
  width: 5rem;
  height: 3rem;
  background-color: transparent;
  color: #8d8c8c;
  border: none;
  margin: 1rem;
  &.active {
    /* background-color: ${(props) => props.color}; */
    text-shadow: 0px 0px 1rem white;
    color: white;
  }
  &:hover {
    cursor: pointer;
    text-shadow: 0px 0px 0.5rem white;
    color: white;
    transition: 0.3s ease-in-out;
  }
`;

const BoxForm = styled.form`
  color: #928287;
  width: 30rem;
  height: 17rem;
  margin: 0 auto;
  padding: 2rem;
  border: solid 0.2rem #221a1d;
  line-height: 2.5rem;
`;
const BoxInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const BoxInputName = styled.input`
  width: 15rem;
  height: 2rem;
  border: 0.2rem solid #221a1d;
  background-color: transparent;
  color: #928287;
  &:hover {
    cursor: pointer;
    border: solid 0.2rem #fdb69f;
    color: white;
    transition: 0.2s ease-in-out;
  }
`;
const BoxInputComment = styled.textarea`
  width: 15rem;
  height: 6rem;
  border: 0.2rem solid #221a1d;
  background-color: transparent;
  color: #928287;
  &:hover {
    cursor: pointer;
    border: solid 0.2rem #fdb69f;
    color: white;
    transition: 0.2s ease-in-out;
  }
`;
const BoxSelect = styled.select`
  margin-left: 1rem;
  margin-top: 2rem;
  padding: 0.5rem;
  border: solid 0.2rem #221a1d;
  background-color: transparent;
  color: #928287;
  &:hover {
    cursor: pointer;
    border: solid 0.2rem #fdb69f;
    color: white;
    transition: 0.2s ease-in-out;
  }
`;
const BoxBtn = styled.button`
  float: right;
  padding: 0.5rem 1.5rem;
  margin-top: 2rem;
  background-color: transparent;
  border: solid 0.2rem #221a1d;
  color: #928287;
  &:hover {
    cursor: pointer;
    border: solid 0.2rem #fdb69f;
    color: white;
    transition: 0.2s ease-in-out;
  }
`;
const ListDiv = styled.div`
  color: #928287;
  width: 30rem;
  margin: 2rem auto;
  padding: 0.5rem;
  font-size: 1.2rem;
`;
const ListCard = styled.div`
  width: 28rem;
  margin: 1rem auto;
  padding: 1rem;
  border: solid 0.2rem #221a1d;
  display: flex;
  &:hover {
    cursor: pointer;
    border: solid 0.2rem #fdb69f;
    color: white;
    transition: 0.2s ease-in-out;
  }
`;
const ListCardImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin-right: 1rem;
`;
const ListCardText = styled.div`
  line-height: 2rem;
`;
const ListCardName = styled.div``;
const ListCardDate = styled.div`
  font-size: 1rem;
`;
const ListCardContent = styled.div`
  background-color: #221a1d;

  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 21rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export default Main;
