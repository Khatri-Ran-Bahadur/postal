import React from "react";
import NewsListBox from "./NewsListBox";

const HomePageNews = ({ pill, pillText, data, engLang, type }) => {
  return (
    <div>
      {data.map((item, index) => (
        <NewsListBox
          type={type}
          slug={item.node.slug}
          key={item.node.slug}
          image={false}
          engLang={engLang}
          title={index === 0 ? true : false}
          pill={pill}
          pillText={pillText}
          noticetitle={engLang ? item.node.title : item.node.Nepali.nepaliTitle}
          date={item.node.date}
        />
      ))}
    </div>
  );
};

export default HomePageNews;
