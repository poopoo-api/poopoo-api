const func = require("/codesave/functions.js")
export default async (req, res) => {
  const text = req.query.text;
  try {
    const type = req.query.type;
    await func.emoji(text, type, res, fetch);
  } catch (error) {
    const type = undefined;
    await func.emoji(text, type, res, fetch);
  }
}