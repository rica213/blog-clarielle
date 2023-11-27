const posthtml = require("posthtml");
const posthtmlExpressions = require("posthtml-expressions");
const tailwind = require("tailwindcss");

async function processHTMLWithPostHTML(htmlContent) {
  const { html } = await posthtml()
    .use(posthtmlExpressions({ classes: tailwind }))
    .process(htmlContent);
  return html;
}

module.exports = processHTMLWithPostHTML;
