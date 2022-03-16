//copypasted from my api lol
const upperCase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'u', 'W', 'X', 'Y', 'Z']
const lowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'w', 'x', 'y', 'z']
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const special = ['@', '!', '#', '$', '%', '^', '&', '*', '(', ')']
function listsGetRandomItem(list, remove) {
    var x = Math.floor(Math.random() * list.length);
    if (remove) {
        return list.splice(x, 1)[0];
    } else {
        return list[x];
    }
}
module.exports = {
    name: 'password-generator',
    description: 'generate a random password',
    async loopPassword(outcome) {
        for(let i = 0; i < 5; i++) {
            var random = listsGetRandomItem(upperCase, false);
            var randomLower = listsGetRandomItem(lowerCase, false);
            var randomNumber = listsGetRandomItem(numbers, false);
            var randomSpecial = listsGetRandomItem(special, false);
            outcome.push(random)
            outcome.push(randomLower)
            outcome.push(randomNumber)
            outcome.push(randomSpecial)
        }
    },
    async loopRecover(recoverCode) {
        for(let i = 0; i < 5; i++) {
            var randomNumber = listsGetRandomItem(numbers, false);
            recoverCode.push(randomNumber)
        }
    }
}