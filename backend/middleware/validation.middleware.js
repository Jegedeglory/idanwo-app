// const validationMiddleware = {
//     // Validate quiz submission
//     validateQuizSubmission: (req, res, next) => {
//         const { username, answers } = req.body;
        
//         if (!username) {
//             return res.status(400).json({ error: 'Username is required' });
//         }

//         if (!answers || !Array.isArray(answers)) {
//             return res.status(400).json({ error: 'Answers must be an array' });
//         }

//         if (answers.length !== 10) {
//             return res.status(400).json({ error: 'Quiz must have exactly 10 questions' });
//         }

//         next();
//     },

//     // Validate quiz creation
//     validateQuizCreation: (req, res, next) => {
//         const { title, description, createdBy } = req.body;

//         if (!title || typeof title !== 'string') {
//             return res.status(400).json({ error: 'Valid title is required' });
//         }

//         if (!description || typeof description !== 'string') {
//             return res.status(400).json({ error: 'Valid description is required' });
//         }

//         if (!createdBy || typeof createdBy !== 'string') {
//             return res.status(400).json({ error: 'Valid createdBy is required' });
//         }

//         next();
//     },

//     // Validate score update
//     validateScoreUpdate: (req, res, next) => {
//         const { score } = req.body;

//         if (score === undefined || typeof score !== 'number') {
//             return res.status(400).json({ error: 'Valid score is required' });
//         }

//         if (score < 0) {
//             return res.status(400).json({ error: 'Score cannot be negative' });
//         }

//         next();
//     }
// };

// module.exports = validationMiddleware; 

const validateScoreUpdate = (req, res, next) => {
  const { score } = req.body;
  if (typeof score !== "number" || score < 0) {
    return res.status(400).json({ error: "Invalid score value" });
  }
  next();
};

module.exports = { validateScoreUpdate };