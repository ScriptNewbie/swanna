import React from "react";
import Markdown from "react-markdown";
import Link from "../Link";

function News({ title, date, content }) {
  return (
    <div>
      <h2 className="title_home">{title}</h2>
      <div className="date_home">Opublikowano: {date}</div>
      <div className="post_home">
        <Markdown
          components={{
            a(props) {
              const { href, children } = props;
              return <Link to={href}>{children}</Link>;
            },
          }}
        >
          {content}
        </Markdown>
      </div>
    </div>
  );
}

export default News;
