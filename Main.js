/* Enimga JS
* Creates enigma machine is a replica of the M3 Army and Airforce that the Nazis used in WWIIs
*/

// 
// Creates a new enigma with default settings
var enigma = newEnigma("III", "II", "I", "A", "A", "A", "A", "A", "A", "B");

// Records the encrypted string, spaces between every 4 letters
var tape = ""
var tapeLength = 0;

// Keeps track of which key is pressed, only allows one key at a time
var press = -1;
var ePress = -1;

// Colors
const colorLight = "#fff38c";
const colorWhite = "#ffffff";
const colorBlack = "#000000";
const colorGray = "#646464";

document.addEventListener("keydown", function(event) {
    var key = event.keyCode;

    // Ignore holding key down
    if (press == -1) {
        var entry = (key != 32) ? key - "A".charCodeAt(0) : letter2num("X");

        // Check if character is from alphabet
        if (entry >= 0 && entry < 26) {
            press = key; // Keeps track of key pressed

            // Encrypts the letter and displays it
            ePress = num2letter(enigma.encrypt(entry));
            changeColor(ePress, colorLight);

            // Records the letter to the "tape" with spaces every 4 characters
            if ((tape.length != 0) && (tapeLength % 4 == 0)) {
                tape += " ";
            }
            tapeLength++;
            tape += ePress;
            document.getElementById("tapeText").innerHTML = tape;

            // Update the display values after the enigma was changed
            updateVals();
        }
    }
});

// Changes the color of a lamp with its respective letter
function changeColor(key, color) {
    var name = "key_" + key;
    document.getElementById(name).style.backgroundColor = color;
}

// Creates new enigma with given settings
function newEnigma(r1, r2, r3, s1, s2, s3, p1, p2, p3, refLetter) {
    // Create Plugboard 
    const plug = new PlugBoard();

    // Create rotors
    const rotor1 = new Rotor(r1, letter2num(s1), letter2num(p1));
    const rotor2 = new Rotor(r2, letter2num(s2), letter2num(p2));
    const rotor3 = new Rotor(r3, letter2num(s3), letter2num(p3));

    // Create reflectors
    const ref = new Reflector(refLetter);
    return new Enigma(plug, rotor1, rotor2, rotor3, ref);
}

/**
 * Helper function to take a letter and gives its number (A->0, Z->25)
 * @param {*} letter 
 */
function letter2num(letter) {
    return (letter.charCodeAt(0) - "A".charCodeAt(0))
}

/**
 * Helper function to get letter from number (0->A, 25->Z)
 * @param {*} num 
 */
function num2letter(num) {
    num = (num + 26) % 26; // Simulates overflow
    return String.fromCharCode(num + "A".charCodeAt(0))
}

// 
/**
 * Helper function to take a string of letters into an array of numbers
 * @param {*} str
 */
function str2arr(str) {
    var arr = [];
    for(var i=0; i < str.length; i++) {
        arr.push(letter2num(str[i]));
    }
    return arr;
}

function updateVals() {
    // Update rotor positions
    var pos = enigma.getRotPos();
    for (var i = 0; i < 3; i++) {
        document.getElementById("rotorVal" + (i+1)).innerHTML = num2letter(pos[i]);
    }
}

// Swap element display styles
function flip(type) {
    var eOut = document.getElementById(type + "Out");
    var eIn = document.getElementById(type + "In");
    const temp = eOut.style.display;
    eOut.style.display = eIn.style.display;
    eIn.style.display = temp;
}

// Show inside of enigma
function flipIn(type) {
    flip(type);
}

