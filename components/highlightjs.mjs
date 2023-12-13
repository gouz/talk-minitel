/**
 * replace
 * ```js
 * console.log("my script")
 * ```
 *
 * into a
 * <pre>
 *  <code class="language-js">
 *    console.log("my script")
 *  </code>
 * </pre>
 */

export default (data) => {
  let newData = data;
  [...newData.matchAll(/```(\w*)\n([^`]+)```/gm)].forEach((match) => {
    newData = newData.replace(
      match[0],
      `<pre><code class="language-${match[1]}">${match[2]
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;")}</code></pre>`
    );
  });
  return newData;
};
