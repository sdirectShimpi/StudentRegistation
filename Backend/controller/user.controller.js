const { Op } = require("sequelize")
const userRecords = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const randomstring = require('randomstring');
exports.createUser = async (req, res) => {
    const { firstName, lastName, address, mobileNumber, email, password, confirmPassword } = req.body;
  
    try {
      const find = await userRecords.findOne({ where: { Email: email } });
  
      if (!find) {
        if (password === confirmPassword) {
          const salt = bcrypt.genSaltSync(10);
          const hashPassword = bcrypt.hashSync(password, salt);
          await userRecords.create({
            firstName: firstName,
            lastName: lastName,
            mobileNumber: mobileNumber,
            address: address,
            email: email,
            password: hashPassword,
          });
  
          res.status(201).json({ Message: "User created successfully" });
        } else {
          res.status(400).json({ Message: "Passwords do not match!" });
        }
      } else {
        res.status(409).json({ Message: "Email already exists" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ Message: "An error occurred" });
    }
  };




  






  
exports.loginUser = async (req, res) => {
    try {
        console.log("this is req.body", req.body);

        const userLogin = await userRecords.findOne({
            where: {

                [Op.or]: [
                    { email: req.body?.userName },
                    { mobileNumber: req.body?.userName }
                ]
            }

        });
        if (!userLogin) {
            return res.status(400).json({ message: "incorrect email" })
        }

        const passwordMatch = await bcrypt.compare(req.body.password, userLogin.password);
        if (!passwordMatch) {
            return res.status(500).send({ message: "incorrect password" });
        }

        if (passwordMatch) {
            const token = jwt.sign({ user: userLogin }, "key");
            return res.status(200).json({ passwordMatch: true, token });

            // console.log(token);
        }
        return res.status(401).send({ message: "Unauthorized user" });

    } catch (error) {
        console.error("An error occurred during login:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
};


exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userRecords.findOne({ where: { email } });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const newPassword = randomstring.generate(8);

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "shimpiraj84094@gmail.com",
                pass: "qmzygsiadpfgfzhb",
            }
        });

        const mailOptions = {
            from: "shimpiraj84094@gmail.com",
            to: 'shimpik928@gmail.com',
            subject: 'Password Reset',
            text: `Your new password is: ${newPassword}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).send({ message: "Failed to send email" });
            }
            console.log("Email sent:", info.response);
            return res.status(200).json({ message: "Password reset successful. Check your email for the new password." });
        });
    } catch (error) {
        console.error("An error occurred during password reset:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
};
exports.changePassword = async (req, res) => {
    const { email, password, newPassword, confirmPassword } = req.body;
    const user1 = await userRecords.findOne({ where: { email: email } });
    console.log("user" + user1);

    if (user1) {
        if (newPassword === confirmPassword) {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(newPassword, salt);
            user1.password = hashPassword;
            await user1.save();

            console.log("save password" + user1.save());
            const token = jwt.sign({ user: user1 }, "secretkey");
            return res.status(200).json({ success: true, msg: "Password changed successfully!", token });
        } else {
            return res.status(400).json({ success: false, msg: "New password and confirmation password do not match." });
        }
    } else {
        return res.status(401).json({ success: false, msg: "Invalid Email or Password" });
    }
};

