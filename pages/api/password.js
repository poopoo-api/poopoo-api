const generatePassword = require('/codesave/passwordgenerate.js')
export default (req, res) => {
  var outcome = []
    generatePassword.loopPassword(outcome)
    var password = outcome.join('')
    var recoverCode = []
    generatePassword.loopRecover(recoverCode)
    res.setHeader("Content-Type", 'application/json');
    res.send(JSON.stringify({
        password: String(password),
        recoverCode: String(recoverCode.join(''))
    }, null, 4))
}