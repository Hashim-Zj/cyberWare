const whiteList = [
  'https://www.cyberware.com',
  'http://127.0.0.1:4000',
  'http://localhost:4000',
  // http://localhost/http://localhost:4000/
];
const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    console.log(whiteList.indexOf(origin));
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS for ${origin}`));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
