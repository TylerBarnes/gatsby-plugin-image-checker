# Gatsby plugin image checker

Do not use this plugin in production! It slows things down a lot. Whenever a file node is created that gatsby-transformer-sharp supports the type of, this plugin runs a reproduction of some of the internal logic of gatsby-transformer-sharp to determine if that image will cause errors. All failing image nodes are collected and the id and absolute path of the file are logged to your terminal. If there are any failing images Gatsby will exit.
