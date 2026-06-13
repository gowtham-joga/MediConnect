const { GoogleGenerativeAI } = require("@google/generative-ai");

const db = require("../config/firebase");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const suggestDoctor = async (req, res) => {
  try {
    const { symptoms } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
    A patient has these symptoms:
    ${symptoms}

    Suggest only the most relevant medical specialist.
    Example:
    Cardiologist
    Dermatologist
    Neurologist

    Only return specialist name.
    `;
    console.log("Calling Gemini...");
    const result = await model.generateContent(prompt);
    console.log("Response received");
    const response = result.response.text().trim();

    const snapshot = await db
      .collection("doctors")
      .where("specialization", "==", response)
      .get();

    const doctors = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({
      recommendedSpecialist: response,
      doctors,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};
module.exports = {
  suggestDoctor,
};