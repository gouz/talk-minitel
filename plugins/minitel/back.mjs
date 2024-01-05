let sendingToMinitel = false;
let sendTimeout = null;

function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

async function sendTrame(trame, axios, env) {
  sendingToMinitel = true;
  const chunks = sliceIntoChunks(trame, 200);
  const url = `http://${env.MINITEL_IP}`;
  await axios.get(`${url}/new`);
  for (let i = 0; i < chunks.length; i++) {
    const body = new FormData();
    body.append("encrypt", new Blob([Uint8ClampedArray.from(chunks[i])]));
    await fetch(`${url}/post`, {
      method: "post",
      body,
    });
  }
  await axios.get(`${url}/end`);
  clearTimeout(sendTimeout);
  sendTimeout = setTimeout(() => {
    sendingToMinitel = false;
    if (globalThis.trames.length) {
      sendTrame(globalThis.trames.shift(), axios, env);
    }
  }, 5000);
}

export default async (req, axios, env) => {
  const url = new URL(req.url);
  if (url.pathname === "/public") {
    return new Response(
      await Bun.file(
        `${globalThis.path}/plugins/minitel/back/index.html`
      ).text(),
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  } else if (url.pathname === "/post") {
    if (typeof globalThis.trames === "undefined") {
      globalThis.trames = [];
    }
    const formdata = await req.formData();
    globalThis.trames.push(formdata.get("trame"));
    if (!sendingToMinitel) sendTrame(globalThis.trames.shift(), axios, env);
    return new Response("");
  }
  return null;
};
