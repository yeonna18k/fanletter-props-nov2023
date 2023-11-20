import React from "react";
import styled from "styled-components";
import fakeData from "../fakeData";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";

function Detail() {
  const { state } = useLocation();
  const { id } = state;
  console.log(id);

  const navi = useNavigate();

  return (
    <div>
      <MainBtn
        onClick={() => {
          navi("/");
        }}
      >
        Main
      </MainBtn>
      <DetailDiv>
        {fakeData
          .filter((e) => {
            return e.id == id;
          })
          .map((item, index) => {
            // console.log(item.id);
            return (
              <DetailCard key={index}>
                <DetailCardImg
                  src={process.env.PUBLIC_URL + "/img/icon.svg"}
                ></DetailCardImg>
                <DetailCardText>
                  <DetailCardName>{item.nickname}</DetailCardName>
                  <DetailCardDate>{item.createdAt}</DetailCardDate>
                  <DetailCardContent>{item.content}</DetailCardContent>
                </DetailCardText>
              </DetailCard>
            );
          })}
      </DetailDiv>
    </div>
  );
}

const MainBtn = styled.button`
  color: #928287;
  font-size: 1.6rem;
  padding: 1rem;
  border: none;
  &:hover {
    color: white;
    cursor: pointer;
    text-shadow: 0px 0px 1rem white;
    transition: 0.3s ease-in-out;
  }
`;
const DetailDiv = styled.div`
  color: white;
  margin: 15rem auto;
  padding: 0.5rem;
  font-size: 1.2rem;
`;
const DetailCard = styled.div`
  max-width: 48rem;
  height: 27rem;
  margin: 1rem auto;
  padding: 2rem;
  border: solid 0.2rem #fdb69f;
  display: flex;
`;
const DetailCardImg = styled.img`
  width: 4rem;
  height: 4rem;
  background-color: black;
  border-radius: 50%;
  margin-right: 1.5rem;
`;
const DetailCardText = styled.div`
  line-height: 2rem;
`;
const DetailCardName = styled.div`
  font-size: 2rem;
`;
const DetailCardDate = styled.div`
  font-size: 1rem;
  margin: 1rem 0;
`;
const DetailCardContent = styled.div`
  background-color: #221a1d;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 38rem;
`;

export default Detail;
