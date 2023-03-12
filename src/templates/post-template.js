import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"

export default function PostTempalte ( { pageContext }){
    const { node } = pageContext
    return (
        <div>
            <h2>{node.frontmatter.title}</h2>
            <MDXRenderer>
                {node.body}
            </MDXRenderer>
        </div>
    )
}
