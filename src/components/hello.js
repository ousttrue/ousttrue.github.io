import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const Hello = ( ) => {
    const data = useStaticQuery(graphql`
    {
        site {
            siteMetadata {
                author
            }
        }
    }        
    `)
    return (
        <big>HELLO {data.site.siteMetadata.author}!!!</big>
    )
}

export default Hello
