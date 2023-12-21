import React from "react";
import ReactHtmlParser from "react-html-parser";

function News({ title, date, content }) {
  return (
    <div>
      <h2 className="title_home">{ReactHtmlParser(title)}</h2>
      <div className="date_home">Opublikowano: {ReactHtmlParser(date)}</div>
      <div className="post_home">
        {typeof content === "string" ? ReactHtmlParser(content) : content}
      </div>
    </div>
  );
}

export default News;
