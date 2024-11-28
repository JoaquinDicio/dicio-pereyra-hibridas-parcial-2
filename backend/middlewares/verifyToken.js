import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // si en el encabezado no eixste token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "No se envio un token o formato incorrecto" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // agrega la info decoficada
    next();
  } catch (e) {
    res.status(401).json({ error: "Token invalido" });
  }
}
