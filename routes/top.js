const express = require("express");
const topw = require("../models/mode");
const mongoose = require("mongoose");
const router = express.Router();
const nodemailer = require("nodemailer");
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)
router.get("/", async (req, res) => {
  const wof = await topw.find({}).sort({ createdAt: -1 });

  res.status(200).json(wof);
});
router.get("/val", async (req, res) => {
  // const wof = await topw.find({}).sort({ createdAt: -1 });
  try {
    const countByBranch = await topw.aggregate([
      { $group: { _id: "$branch", count: { $sum: 1 } } },
    ]);
    res.json(countByBranch);
  } catch (err) {
    console.log(err);
  }
  // res.status(200).json(wof);
});
router.get("/:fname", async (req, res) => {
  const { fname, lname } = req.params;
  try {
    const count = await topw.countDocuments({ fname: fname, lname: lname });
    console.log(count);
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(505).send("err");
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "err" });
  }
  const work = await topw.findById(id);
  if (!work) {
    return res.status(404).json({ err: "err" });
  }
  res.status(200).json({ err: "err" });
});

router.post("/", async (req, res) => {
  const { fname, lname, branch, email, mothname, fathname, phonenum } =
    req.body;
  try {
    const wot = await topw.create({
      fname,
      lname,
      branch,
      email,
      mothname,
      fathname,
      phonenum,
    });
    res.status(200).json(wot);

    let testAccount = await nodemailer.createTestAccount();
    let config = {
      service: "gmail",
      auth: {
        user: "miprorebu@gmail.com",
        pass: "tmuvenfpiuslgrre",
      },
    };
    let transporter = nodemailer.createTransport(config);
    // setup email data with unicode symbols
    let info = await transporter.sendMail({
      from: '"Hackthon" <foo@example.com>', // sender address
      to: "jacksonmintu7@gmail.com, 6pathsnarutosasuke@gmail.com,sankruthyakrishna13@gmail.com", // list of receivers
      subject: "New Student Joined ", // Subject line
      text: `New Student : ${fname} joined the college in ${branch}`, // plain text body
      html: "",
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Message sent: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    res.status(404).json({ err: "err" });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "err" });
  }
  const del = await topw.findByIdAndDelete(id);
  if (!del) {
    return res.status(404).json({ err: "err" });
  }
  res.status(200).json();
});
router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const workout = await topw.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
});
module.exports = router;
