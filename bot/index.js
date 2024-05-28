import { createCanvas, loadImage } from "canvas";
import { Client } from "tmi.js";
import "dotenv/config";

const nsfw = [
  "baiser",
  "bander",
  "bigornette",
  "bite",
  "bitte",
  "bloblos",
  "bordel",
  "bourré",
  "bourrée",
  "brackmard",
  "branlage",
  "branler",
  "branlette",
  "branleur",
  "branleuse",
  "brouter le cresson",
  "caca",
  "chatte",
  "chiasse",
  "chier",
  "chiottes",
  "clito",
  "clitoris",
  "con",
  "connard",
  "connasse",
  "conne",
  "couilles",
  "cramouille",
  "cul",
  "déconne",
  "déconner",
  "emmerdant",
  "emmerder",
  "emmerdeur",
  "emmerdeuse",
  "enculé",
  "enculée",
  "enculeur",
  "enculeurs",
  "enfoiré",
  "enfoirée",
  "étron",
  "fille de pute",
  "fils de pute",
  "folle",
  "foutre",
  "gerbe",
  "gerber",
  "gouine",
  "grande folle",
  "grogniasse",
  "gueule",
  "jouir",
  "la putain de ta mère",
  "MALPT",
  "ménage à trois",
  "merde",
  "merdeuse",
  "merdeux",
  "meuf",
  "nègre",
  "negro",
  "nique ta mère",
  "nique ta race",
  "palucher",
  "pédale",
  "pédé",
  "péter",
  "pipi",
  "pisser",
  "pouffiasse",
  "pousse-crotte",
  "putain",
  "pute",
  "ramoner",
  "sac à foutre",
  "sac à merde",
  "salaud",
  "salope",
  "suce",
  "tapette",
  "tanche",
  "teuch",
  "tringler",
  "trique",
  "troncher",
  "trou du cul",
  "turlute",
  "zigounette",
  "zizi",
  "2g1c",
  "2 girls 1 cup",
  "acrotomophilia",
  "alabama hot pocket",
  "alaskan pipeline",
  "anal",
  "anilingus",
  "anus",
  "apeshit",
  "arsehole",
  "ass",
  "asshole",
  "assmunch",
  "auto erotic",
  "autoerotic",
  "babeland",
  "baby batter",
  "baby juice",
  "ball gag",
  "ball gravy",
  "ball kicking",
  "ball licking",
  "ball sack",
  "ball sucking",
  "bangbros",
  "bangbus",
  "bareback",
  "barely legal",
  "barenaked",
  "bastard",
  "bastardo",
  "bastinado",
  "bbw",
  "bdsm",
  "beaner",
  "beaners",
  "beaver cleaver",
  "beaver lips",
  "beastiality",
  "bestiality",
  "big black",
  "big breasts",
  "big knockers",
  "big tits",
  "bimbos",
  "birdlock",
  "bitch",
  "bitches",
  "black cock",
  "blonde action",
  "blonde on blonde action",
  "blowjob",
  "blow job",
  "blow your load",
  "blue waffle",
  "blumpkin",
  "bollocks",
  "bondage",
  "boner",
  "boob",
  "boobs",
  "booty call",
  "brown showers",
  "brunette action",
  "bukkake",
  "bulldyke",
  "bullet vibe",
  "bullshit",
  "bung hole",
  "bunghole",
  "busty",
  "butt",
  "buttcheeks",
  "butthole",
  "camel toe",
  "camgirl",
  "camslut",
  "camwhore",
  "carpet muncher",
  "carpetmuncher",
  "chocolate rosebuds",
  "cialis",
  "circlejerk",
  "cleveland steamer",
  "clit",
  "clitoris",
  "clover clamps",
  "clusterfuck",
  "cock",
  "cocks",
  "coprolagnia",
  "coprophilia",
  "cornhole",
  "coon",
  "coons",
  "creampie",
  "cum",
  "cumming",
  "cumshot",
  "cumshots",
  "cunnilingus",
  "cunt",
  "darkie",
  "date rape",
  "daterape",
  "deep throat",
  "deepthroat",
  "dendrophilia",
  "dick",
  "dildo",
  "dingleberry",
  "dingleberries",
  "dirty pillows",
  "dirty sanchez",
  "doggie style",
  "doggiestyle",
  "doggy style",
  "doggystyle",
  "dog style",
  "dolcett",
  "domination",
  "dominatrix",
  "dommes",
  "donkey punch",
  "double dong",
  "double penetration",
  "dp action",
  "dry hump",
  "dvda",
  "eat my ass",
  "ecchi",
  "ejaculation",
  "erotic",
  "erotism",
  "escort",
  "eunuch",
  "fag",
  "faggot",
  "fecal",
  "felch",
  "fellatio",
  "feltch",
  "female squirting",
  "femdom",
  "figging",
  "fingerbang",
  "fingering",
  "fisting",
  "foot fetish",
  "footjob",
  "frotting",
  "fuck",
  "fuck buttons",
  "fuckin",
  "fucking",
  "fucktards",
  "fudge packer",
  "fudgepacker",
  "futanari",
  "gangbang",
  "gang bang",
  "gay sex",
  "genitals",
  "giant cock",
  "girl on",
  "girl on top",
  "girls gone wild",
  "goatcx",
  "goatse",
  "god damn",
  "gokkun",
  "golden shower",
  "goodpoop",
  "goo girl",
  "goregasm",
  "grope",
  "group sex",
  "g-spot",
  "guro",
  "hand job",
  "handjob",
  "hard core",
  "hardcore",
  "hentai",
  "homoerotic",
  "honkey",
  "hooker",
  "horny",
  "hot carl",
  "hot chick",
  "how to kill",
  "how to murder",
  "huge fat",
  "humping",
  "incest",
  "intercourse",
  "jack off",
  "jail bait",
  "jailbait",
  "jelly donut",
  "jerk off",
  "jigaboo",
  "jiggaboo",
  "jiggerboo",
  "jizz",
  "juggs",
  "kike",
  "kinbaku",
  "kinkster",
  "kinky",
  "knobbing",
  "leather restraint",
  "leather straight jacket",
  "lemon party",
  "livesex",
  "lolita",
  "lovemaking",
  "make me come",
  "male squirting",
  "masturbate",
  "masturbating",
  "masturbation",
  "menage a trois",
  "milf",
  "missionary position",
  "mong",
  "motherfucker",
  "mound of venus",
  "mr hands",
  "muff diver",
  "muffdiving",
  "nambla",
  "nawashi",
  "negro",
  "neonazi",
  "nigga",
  "nigger",
  "nig nog",
  "nimphomania",
  "nipple",
  "nipples",
  "nsfw",
  "nsfw images",
  "nude",
  "nudity",
  "nutten",
  "nympho",
  "nymphomania",
  "octopussy",
  "omorashi",
  "one cup two girls",
  "one guy one jar",
  "orgasm",
  "orgy",
  "paedophile",
  "paki",
  "panties",
  "panty",
  "pedobear",
  "pedophile",
  "pegging",
  "penis",
  "phone sex",
  "piece of shit",
  "pikey",
  "pissing",
  "piss pig",
  "pisspig",
  "playboy",
  "pleasure chest",
  "pole smoker",
  "ponyplay",
  "poof",
  "poon",
  "poontang",
  "punany",
  "poop chute",
  "poopchute",
  "porn",
  "porno",
  "pornography",
  "prince albert piercing",
  "pthc",
  "pubes",
  "pussy",
  "queaf",
  "queef",
  "quim",
  "raghead",
  "raging boner",
  "rape",
  "raping",
  "rapist",
  "rectum",
  "reverse cowgirl",
  "rimjob",
  "rimming",
  "rosy palm",
  "rosy palm and her 5 sisters",
  "rusty trombone",
  "sadism",
  "santorum",
  "scat",
  "schlong",
  "scissoring",
  "semen",
  "sex",
  "sexcam",
  "sexo",
  "sexy",
  "sexual",
  "sexually",
  "sexuality",
  "shaved beaver",
  "shaved pussy",
  "shemale",
  "shibari",
  "shit",
  "shitblimp",
  "shitty",
  "shota",
  "shrimping",
  "skeet",
  "slanteye",
  "slut",
  "s&m",
  "smut",
  "snatch",
  "snowballing",
  "sodomize",
  "sodomy",
  "spastic",
  "spic",
  "splooge",
  "splooge moose",
  "spooge",
  "spread legs",
  "spunk",
  "strap on",
  "strapon",
  "strappado",
  "strip club",
  "style doggy",
  "suck",
  "sucks",
  "suicide girls",
  "sultry women",
  "swastika",
  "swinger",
  "tainted love",
  "taste my",
  "tea bagging",
  "threesome",
  "throating",
  "thumbzilla",
  "tied up",
  "tight white",
  "tit",
  "tits",
  "titties",
  "titty",
  "tongue in a",
  "topless",
  "tosser",
  "towelhead",
  "tranny",
  "tribadism",
  "tub girl",
  "tubgirl",
  "tushy",
  "twat",
  "twink",
  "twinkie",
  "two girls one cup",
  "undressing",
  "upskirt",
  "urethra play",
  "urophilia",
  "vagina",
  "venus mound",
  "viagra",
  "vibrator",
  "violet wand",
  "vorarephilia",
  "voyeur",
  "voyeurweb",
  "voyuer",
  "vulva",
  "wank",
  "wetback",
  "wet dream",
  "white power",
  "whore",
  "worldsex",
  "wrapping men",
  "wrinkled starfish",
  "xx",
  "xxx",
  "yaoi",
  "yellow showers",
  "yiffy",
  "zoophilia",
  "🖕",
  "seins",
];

function CanvasManager(canvas) {
  this.context = canvas.getContext("2d");
  this.width = canvas.width;
  this.height = canvas.height;
}
CanvasManager.prototype.clear = function () {
  this.context.clearRect(0, 0, this.width, this.height);
  this.context.fillStyle = "black";
  this.context.fillRect(0, 0, this.width, this.height);
};
CanvasManager.prototype.redim = function (img) {
  let newWidth = img.width;
  let newHeight = img.height;
  newHeight *= this.width / newWidth;
  newWidth = this.width;
  if (newHeight > this.height) {
    newWidth *= this.height / newHeight;
    newHeight = this.height;
  }
  this.context.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    (this.width - newWidth) / 2,
    (this.height - newHeight) / 2,
    newWidth,
    newHeight
  );
};
CanvasManager.prototype.getPixels = function (img) {
  this.clear();
  this.redim(img);
  return this.context.getImageData(0, 0, this.width, this.height).data;
};

function ConvertVideotex() {}
ConvertVideotex.prototype.convert = function (pixels) {
  let x = 0;
  let y = 0;
  const pixelsArray = [];
  for (let i = 0; i < pixels.length; i += 4) {
    pixelsArray.push([pixels[i], pixels[i + 1], pixels[i + 2]]);
  }

  const colorLum = [0, 4, 1, 5, 2, 6, 3, 7];
  const str = [];
  let index = 0;

  for (y = 0; y < 24; y++) {
    for (x = 0; x < 40; x++) {
      const colors = this.calcColors(x, y, pixelsArray);
      str[index++] = 0x1b; // ESC char
      str[index++] = colorLum[Math.floor(colors[0] / 32)] + 0x40; // 0x40 = Black (front)
      str[index++] = 0x1b; // ESC char
      str[index++] = colorLum[Math.floor(colors[1] / 32)] + 0x50; // 0x50 = Black (background)
      str[index++] = this.calcChar(x, y, colors, pixelsArray);
    }
  }

  const result = [0x0c, 0x0e]; // clear screen & semi graphic mode
  for (let i = 0; i < index; i++) result.push(str[i]);

  return result;
};
ConvertVideotex.prototype.brightness = function (rgb) {
  return Math.round(
    (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) /
      1000
  );
};
ConvertVideotex.prototype.calcColors = function (x, y, pixels) {
  const xPix = x * 2;
  const yPix = y * 3;
  let lum = this.brightness(pixels[xPix + yPix * 80]);
  let color = [lum, lum];
  for (let b = yPix; b <= yPix + 2; b++) {
    for (let a = xPix; a <= xPix + 1; a++) {
      lum = this.brightness(pixels[a + b * 80]);
      if (lum < color[0]) color[0] = lum;
      if (lum > color[1]) color[1] = lum;
    }
  }
  return color;
};
ConvertVideotex.prototype.calcChar = function (x, y, colors, pixels) {
  const xPix = x * 2;
  const yPix = y * 3;
  let car = 0;
  car += Math.pow(2, 0) * this.state(xPix + 0, yPix + 0, colors, pixels);
  car += Math.pow(2, 1) * this.state(xPix + 1, yPix + 0, colors, pixels);
  car += Math.pow(2, 2) * this.state(xPix + 0, yPix + 1, colors, pixels);
  car += Math.pow(2, 3) * this.state(xPix + 1, yPix + 1, colors, pixels);
  car += Math.pow(2, 4) * this.state(xPix + 0, yPix + 2, colors, pixels);
  car += Math.pow(2, 5) * 1;
  car += Math.pow(2, 6) * this.state(xPix + 1, yPix + 2, colors, pixels);
  return car;
};
ConvertVideotex.prototype.state = function (x, y, colors, pixels) {
  const color = this.brightness(pixels[x + y * 80]);
  return Math.abs(colors[0] - color) > Math.abs(colors[1] - color) ? 0 : 1;
};

const canvas = createCanvas(80, 72);
const CM = new CanvasManager(canvas);
const CV = new ConvertVideotex();

const sliceIntoChunks = (arr, chunkSize) => {
  const res = [];
  res.push([arr.shift(), arr.shift()]);
  for (let i = 0; i < arr.length; i += chunkSize * 5) {
    const chunk = arr.slice(i, i + chunkSize * 5);
    res.push(chunk);
  }
  return res;
};

const prepareImage = (img) => {
  const chunks = sliceIntoChunks(CV.convert(CM.getPixels(img)), 20);
  const arr = ["/new"];
  for (let i = 0; i < chunks.length; i++)
    arr.push(
      `/put?${new URLSearchParams({
        trame: chunks[i].join(","),
      }).toString()}`
    );
  arr.push("/end");
  return arr;
};

let isCalling = false;
let minitel_array = [];

const call = async () => {
  isCalling = true;
  if (minitel_array.length) {
    const endpoint = minitel_array.shift();
    const promises = [];
    promises.push(
      new Promise((resolve) =>
        fetch(`http://${process.env.TWITCHBOT_MINITEL}${endpoint}`).then(() =>
          resolve()
        )
      )
    );

    await Promise.all(promises);
    if (minitel_array.length) await call();
    else isCalling = false;
  } else isCalling = false;
};

const getImgs = (htmlString) => {
  const regex = /<\s*img[^>]+src\s*=\s*["']?([^"']+)/gi;
  let matches;
  const result = [];
  while ((matches = regex.exec(htmlString)) !== null) {
    result.push(matches[1]);
  }
  return result;
};

const treatImage = async (img) => {
  minitel_array.push(...prepareImage(img));
  if (!isCalling) call();
};

const client = new Client({
  options: { debug: false, messagesLogLevel: "info" },
  connection: {
    reconnect: true,
    secure: true,
  },
  channels: [process.env.TWITCHBOT_CHANNEL],
});
client.connect().catch(console.error);
console.log("Connected to twitch");
client.on("message", async (channel, tags, message, self) => {
  if (self) return;
  if (message.startsWith("!3615 ")) {
    let query = message.split(" ").slice(1).join(" ");
    nsfw.forEach((nsfw) => {
      query = query.replace(new RegExp(`\\b${nsfw}\\b`, "gi"), "");
    });
    const response = await fetch(
      `https://www.google.com/search?as_st=y&as_q=${encodeURIComponent(
        query
      )}&as_epq=&as_oq=&as_eq=&imgsz=m&imgar=s&imgc=gray&imgcolor=&imgtype=clipart&cr=&as_sitesearch=&as_filetype=&tbs=&udm=2`
    );
    if (response.status === 200) {
      const html = await response.text();
      const imgs = getImgs(html);
      imgs.shift();
      const img = imgs[Math.floor(Math.random() * (imgs.length - 1))];
      loadImage(img).then(treatImage);
    }
  }
});
