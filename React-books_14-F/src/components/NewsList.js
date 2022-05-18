import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../../node_modules/axios/index";
import { API_KEY } from "../api";
import usePromise from "../lib/usePromise";
import NewsItem from "./NewsItem";

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const sampleArticle = {
  title: "제목",
  description: "내용",
  url: "https://google.com",
  urlToImage: "https://via.placeholder.com/160",
};

export default function NewsList({ category }) {
  const [loading, response, error] = usePromise(() => {
    const query = category === "all" ? "" : `&category=${category}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=${API_KEY}`
    );
  }, [category]);

  if (loading) {
    return <NewsListBlock>로딩 중...</NewsListBlock>;
  }

  if (error) {
    return <NewsListBlock> 에러 발생 ! </NewsListBlock>;
  }

  if (!response) {
    return null;
  }

  const { articles } = response.data;

  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
}
