/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const {
  supportedExtensions,
} = require(`gatsby-transformer-sharp/supported-extensions`)

const probe = require(`probe-image-size`)
const fs = require(`fs-extra`)

function toArray(buf) {
  var arr = new Array(buf.length)

  for (var i = 0; i < buf.length; i++) {
    arr[i] = buf[i]
  }

  return arr
}

const brokenImageNodes = []

exports.onCreateNode = ({ node }) => {
  if (node.internal.type !== `File` || !supportedExtensions[node.extension]) {
    return
  }

  const dimensions = probe.sync(toArray(fs.readFileSync(node.absolutePath)))

  if (!dimensions) {
    brokenImageNodes.push(node)
  }
}

exports.resolvableExtensions = ({ reporter }) => {
  if (brokenImageNodes && brokenImageNodes.length) {
    reporter.panic(
      `gatsby-plugin-image-checker found some corrupt images:\n\n${brokenImageNodes
        .map(
          (node) =>
            `Node id: ${node.id},\nAbsolute path: ${node.absolutePath}\n`
        )
        .join(`\n`)}`
    )
  }
}
