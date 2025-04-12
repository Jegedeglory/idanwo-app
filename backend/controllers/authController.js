// const User = require('../models/User');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { GameEntryModel } = require('../nobox/record-structure/auth'); 
const schemas_1 = require("../schemas");
exports.enterGame = async (req, res) => {
  // const validatedFields = schemas_1.JoinWailtlistSchema.safeParse(values);
  const validatedFields = schemas_1.AuthSchema.safeParse(req.body);
  if (!validatedFields.success) {
    return next((0, http_errors_1.default)(400, "Please provide a valid email address to join the waitlist."));
}

  try {
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Name is required to enter the game' });
    }

    const { name } = validatedFields.data;
    const token = jwt.sign({ name }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const gameEntry = new GameEntryModel({ name, token });
    await gameEntry.save();

    res.status(200).json({ message: `Welcome to the game, ${name}!`, token });
  } catch (error) {
    console.error('Error entering the game:', error);
    res.status(500).json({ error: 'Error entering the game' });
  }
};



// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'Error logging in' });
//   }
// };