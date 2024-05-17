export default async (req, env, path) => {
  const url = new URL(req.url);
  if (url.pathname === "/public") {
    const text = await Bun.file(
      `${path}/plugins/minitel/back/index.html`
    ).text();
    return new Response(text.replace("__MINITEL__", env.MINITEL_IP), {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }
  return null;
};
