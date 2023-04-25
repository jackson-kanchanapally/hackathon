const express = require("express");
const topw = require("../models/mode");
const mongoose = require("mongoose");
const router = express.Router();
const nodemailer = require("nodemailer");

router.get("/", async (req, res) => {
  const wof = await topw.find({}).sort({ createdAt: -1 });
  res.status(200).json(wof);
});
router.get('/:fname',async(req,res)=>{
    const {fname,lname}=req.params
    try{
        const count=await topw.countDocuments({fname:fname,lname:lname})
        console.log(count)
        res.json(count)
    }
    catch(err){
        console.log(err)
        res.status(505).send('err')
    }
})
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
  const { fname, lname } = req.body;
  try {
    const wot = await topw.create({ fname, lname });
    res.status(200).json(wot);

    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,

      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    // setup email data with unicode symbols
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "jacksonmintu7@gmail.com, 6pathsnarutosasuke@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: `Hello world? ${fname} is joined college`, // plain text body
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

module.exports = router;
