/**
* @module Middleware
* @file Auth middleware. Middleware function to authenticate requests.
* @exports auth
*/
import jwt from "jsonwebtoken";
import AuthError from "../errors/authError.js";

/**
 * Middleware function to authenticate requests.
 *
 * @return {void}
 */
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new AuthError("Auth is needed"));
    return;
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(
      token,
      process.env.NODE_ENV === "production" ? process.env.JWT_SECRET : "dev-secret"
    );
  } catch (e) {
    next(new AuthError("Invalid token"));
    return;
  }
  req.user = payload;
  next();
};

export default auth;
