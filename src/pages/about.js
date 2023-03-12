import React from "react"
import { graphql } from 'gatsby'
import Hello from "../components/hello"

// page query を投げる
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        author
      }
    }
  }
`
const AboutPage = ({ data }) => {  // data に返ってくる
  return (<div>
      <Hello/> 
    <ul>
        <li key="title">{data.site.siteMetadata.title}</li>
        <li key="author">{data.site.siteMetadata.author}</li>
    </ul></div>)
}
export default AboutPage
