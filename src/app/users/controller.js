const Response = require("../../utils/response");

const me = async (req, res) => {
  return new Response(req.user).success(res);
};

module.exports = {
  me,
};
