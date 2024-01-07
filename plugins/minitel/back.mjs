export default async (req, axios, env) => {
  const url = new URL(req.url);
  if (url.pathname === "/public") {
    const text = await Bun.file(
      `${globalThis.path}/plugins/minitel/back/index.html`
    ).text();
    return new Response(text.replace("__MINITEL__", env.MINITEL_IP), {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } else if (url.pathname === "/new") {
    return new Response(globalThis.minitelWaitingList++);
  }
  return null;
};
