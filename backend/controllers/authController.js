const db = require("../config/firebase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const usersRef = db.collection("users");

    const snapshot = await usersRef.where("email", "==", email).get();

    if (!snapshot.empty) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    await usersRef.add({
      name,
      email,
      password:hashedPassword,
      role,
      createdAt: new Date(),
    });

    res.json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usersRef = db.collection("users");

    const snapshot = await usersRef.where("email", "==", email).get();

    if (snapshot.empty) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const userDoc = snapshot.docs[0];

    const user = userDoc.data();

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

   const token = jwt.sign(
      {
        id: userDoc.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login Successful",
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};
module.exports = {
  registerUser,
  loginUser
};