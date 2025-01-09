/** @format */
const jwt_decode = require("jwt-decode");
const useragent = require("express-useragent");
const buildAuditObj = async (req) => {
  try {
    // const bearerHeader = req.headers['authorization'];
    // const bearer = bearerHeader.split(' ');
    // const bearerToken = bearer[1];
    // const jtoken = jwt_decode(bearerToken);
    const ip_adderss = ("ip2", req.headers["x-forwarded-for"] || "").split(",")[0] || req.connection.remoteAddress;
    const source = req.headers["user-agent"];
    const agentbrowser = useragent.parse(source);
    const user_agent = req.header("User-Agent");
    const user_obj = { id: "123", user_name: "test" };
    const user_browser = agentbrowser.browser + "(" + agentbrowser.version + ")";
    return { ip_adderss, user_agent, user_obj, user_browser };
  } catch (error) {
    console.log("buildAuditObj error", error);
  }
};
module.exports = { buildAuditObj };
