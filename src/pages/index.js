// @refresh reset
import * as React from "react";
import { graphql } from "gatsby";

import logo from "../images/web3masons.svg";

import "reseter.css";
import "github-markdown-css/github-markdown.css";
import "../styles.scss";

const IndexPage = ({ data }) => {
  return (
    <div className="markdown-body">
      <main>
        <article
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        />
      </main>
      <footer>
        <hr />
        <div>
          Made with <code>{"<3"}</code> for the original Ethereum vision
        </div>
        <img
          className="logo"
          src={logo}
          title="Brought to you by the Web3 Masons Department of Defense"
        />
      </footer>
    </div>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  {
    markdownRemark(fileAbsolutePath: { regex: "/README.md/" }) {
      html
    }
  }
`;
