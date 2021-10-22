const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions

    // Define a template for post
    const postTemplate = path.resolve(`./src/templates/posts.js`)

    // Get all markdown posts sorted by date
    const result = await graphql(
        `
      {
        allMarkdownRemark {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
    )

    //   console.log(result)

    if (result.errors) {
        reporter.panicOnBuild(
            `There was an error loading your blog posts`,
            result.errors
        )
        return
    }

    const posts = result.data.allMarkdownRemark.nodes
    console.log(posts)
    // Create pages
    // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
    // `context` is available in the template as a prop and as a variable in GraphQL

    if (posts.length > 0) {
        posts.forEach((post, index) => {            
            createPage({
                path: post.fields.slug,
                component: postTemplate,
                context: {
                    id: post.id,
                },
            })
        })
    }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
        const filePath = createFilePath({ node, getNode });
        const value = filePath === '/README/' ? '/' : filePath;

        createNodeField({
            name: `slug`,
            node,
            value,
        })
    }
}