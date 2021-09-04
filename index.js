// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});









class Words {

    words = []
    possibleVariants = []

    constructor() {
        this._init()
    }

    _init() {
        // Read the file and print its contents.
        let fs = require('fs')
        let filename = 'russian.txt'

        let data = fs.readFileSync(filename, 'utf8')
            data = data.split('\n')

        this.words = data
    }

    _checkWord(word) {
        if (typeof word != 'string') {
            console.log("Type of word is not equal string")
            process.exit()
        }

        if (word.length == 0) {
            console.log('Empty word')
            process.exit()
        }
    }

    // @param word string
    search(word) {
        this._checkWord(word)

        let wordChars = word.split('')

        for (const templateWord of this.words) {
            if (word.length == templateWord.length) {

                let tempWordArray = []
                let templateWordChars = templateWord.split('')

                for (let i = 0; i < wordChars.length; i++) {
                    const templateChar = wordChars[i];
                    
                    if (templateChar != '_') {
                        tempWordArray.push(templateWordChars[i])
                    } else {
                        tempWordArray.push('_')
                    }
                }

                if (wordChars.equals(tempWordArray)) {
                    this.possibleVariants.push(templateWord)
                }

            }
        }

        return this.possibleVariants   
    }
}

let argWord = process.argv[2] ?? 'з_жи_ал_а'

const WordsInstance = new Words()
const result = WordsInstance.search(argWord)

console.log(result)