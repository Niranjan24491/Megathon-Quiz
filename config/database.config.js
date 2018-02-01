const ENV = process.env.ENV || "development";

const url =
  ENV === "production"
    ? "mongodb://root:root@0.0.0.0:27017/megathon-quiz?authSource=admin"
    : "mongodb://root:root@139.59.23.83:27017/megathon-quiz?authSource=admin";

module.exports = {
  url
};
