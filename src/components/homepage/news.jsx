import React from "react";
import ReactHtmlParser from "react-html-parser";

function News({ post }) {
  return (
    <div>
      <h2 className="title_home">{ReactHtmlParser(post.nazwa)}</h2>
      <div className="date_home">
        Opublikowano: {ReactHtmlParser(post.data)}
      </div>
      <div className="post_home">{ReactHtmlParser(post.tresc)}</div>
    </div>
  );
}

export default News;
