const path = require("path")
const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)$/,
})

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "mdx", "md"],
  webpack: (config, { dev, isServer }) => {
    config.resolve.alias["@"] = path.resolve("./")

    return config
  },
})
