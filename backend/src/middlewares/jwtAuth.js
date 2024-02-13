import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const { jwttoken}  = req.cookies;
  if (!jwttoken) {
    return res.status(401).send("JWT token missing");
  }
  jwt.verify(jwttoken, "codinNinjas", (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send("unauthorized! login to continue!");
    } else {
       console.log("data is", data);
      req._id = data._id;
      req.user = data.user;
      next();
    }
  });
};
