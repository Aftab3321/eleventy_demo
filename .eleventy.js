const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = function(eleventyConfig) {
  // Copy images
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.setLibrary("md", markdownIt().use(markdownItAttrs));

  // Fix: support "now" as a shortcut
  eleventyConfig.addFilter("readableDate", (dateObj, format = "LLLL d, yyyy") => {
    if (dateObj == "now") {
      dateObj = new Date(); // current date
    }
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
  });

  // Posts collection
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md").sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    }
  };
};


module.exports = {
  pathPrefix: "/eleventy_demo/"
};