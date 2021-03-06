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
        // check type
        if (typeof word != 'string') {
            console.log("Type of word is not equal string")
            process.exit()
        }

        // check length
        if (word.length == 0) {
            console.log('Empty word')
            process.exit()
        }
    }

    _checkExceptLetters(exceptLetters) {
        // check type
        if (typeof exceptLetters != 'string') {
            console.log("Type of except-letters is not equal string")
            process.exit()
        }
    }

    _isArrayEquals (array1, array2) {
        // if the other array is a falsy value, return
        if (!array2)
            return false;
    
        // compare lengths - can save a lot of time 
        if (array1.length != array2.length)
            return false;
    
        for (var i = 0, l = array1.length; i < l; i++) {
            // Check if we have nested arrays
            if (array1[i] instanceof Array && array2[i] instanceof Array) {
                // recurse into the nested arrays
                if (!array1[i].equals(array2[i]))
                    return false;       
            }           
            else if (array1[i] != array2[i]) { 
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;   
            }           
        }       

        return true;
    }

    // @param word string
    // @param exceptLetters string
    search(word = '', exceptLetters = '') {
        this._checkWord(word)
        this._checkExceptLetters(exceptLetters)

        let wordChars = word.split('')
        let exceptLettersArray = exceptLetters.split('')

        for (const templateWord of this.words) {

            // compare lengths - can save a lot of time 
            if (word.length == templateWord.length) {

                let tempWordArray = []
                let templateWordChars = templateWord.split('')

                for (let i = 0; i < wordChars.length; i++) {
                    const wordChar = wordChars[i];

                    // if there is a char that we do not need, we destroy the array (by adding '-' char)
                    if (exceptLettersArray.includes(templateWordChars[i])) {
                        tempWordArray.push('-')
                    }
                    
                    if (wordChar != '_') {
                        tempWordArray.push(templateWordChars[i])
                    } else {
                        tempWordArray.push('_')
                    }
                }

                // if words is identity
                if (this._isArrayEquals(wordChars, tempWordArray)) {
                    this.possibleVariants.push(templateWord)
                }

            }
        }

        return this.possibleVariants   
    }
}

let argWord = process.argv[2] ?? '??_????_????_??'  // example
let argExceptChars = process.argv[3] ?? '' // example

const wordsInstance = new Words()
const result = wordsInstance.search(argWord, argExceptChars)

console.log(result)