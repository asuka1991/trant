import express from "express";
import { sign, verify } from 'jsonwebtoken';
import { parseCookies } from 'nookies'
import { User } from "../schema";
import { KEY_VERIFY, ROOMS } from "../constant";
const router = express.Router();

router.get("/auth", function (req: any, res: any) {
  const cookies = parseCookies(req.headers.get("Cookie"));
  const token = cookies["X-Token"];
  if (token) {
    const decoded = verify(token, KEY_VERIFY);

    return res
      .status(200)
      .json({ user: { animalname: decoded.animalname, username: decoded.username, rooms: ROOMS } });
  }

  res.json({ message: "Failed Auth" });
});

router.post("/login", async function (req: any, res: any) {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });

  if (user) {
    const checkPassword = await Bun.password.verify(password, user.password);
    if (checkPassword) {
      const token = sign({ username: username, password: password }, KEY_VERIFY);
      return res
        .status(200)
        .json({ token, user: { username: user.username, animalname: user.animalname } });
    }
    return res.status(403).json({ message: "Login Failed" });
  }
  res.json({ message: "Login Failed" });
});

router.post("/register", async function (req: any, res: any) {
  const { username, animalname, password } = req.body;
  if (!username || !animalname || !password)
    return res.status(500).json({ msg: "Please fill all!" });
  let user = await User.findOne({ username });
  if (user) {
    return res.status(500).json({ msg: "Account exists" });
  }

  user = new User({ username, animalname, password });
  user.password = await Bun.password.hash(password, {algorithm: "bcrypt"});
  await user.save();
  res.status(200).json({ message: "User registered successfully." });
});

export default router;
