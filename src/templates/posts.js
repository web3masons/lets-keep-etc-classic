// @refresh reset
import * as React from "react";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";

import "reseter.css";
import "github-markdown-css/github-markdown.css";
import "../styles.scss";

import logo from "../images/web3masons.svg";

const IndexPage = ({ data }) => {
  const isIndex = data.markdownRemark.fields.slug === '/';
  const title = data.markdownRemark.headings[0].value;
  const siteTitle = data.site.siteMetadata.title;
  const pageTitle = title === siteTitle ? title : `${title} | ${siteTitle}`
  return (
    <div className="markdown-body">
      <Helmet 
        title={pageTitle}
      />
      {!isIndex && <Link to="/">◂&nbsp;&nbsp;Back to Main Article</Link>}
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
  query PostBySlug(
    $id: String!
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields { 
        slug 
      }
      headings(depth: h1) {
        value
      }
    }
  }
`
