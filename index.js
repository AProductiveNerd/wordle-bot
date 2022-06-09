const fs = require("fs");
const wordListPath = require("word-list");
const wordArray = fs.readFileSync(wordListPath, "utf8").split("\n");

const length_det = (l) => wordArray.filter((word) => word.length === l);

const length_use = length_det(5);

const blocked_string = "";
const included_string = "";
const pot_string = "00000";
const cant_strings = ["", "", "", "", ""];
const max_count = {};

const blocked_char = blocked_string.split("");
const included_char = included_string.split("");
const pot_word = pot_string.split("").map((c) => (c === "0" ? null : c));
cant_strings.map((string, i) => (cant_strings[i] = string.split("")));

let blocked_arr = length_use;
blocked_char.map((char) => {
  blocked_arr = blocked_arr.filter((word) => !word.includes(char));
});

let included_arr = blocked_arr;
included_char.map((char) => {
  included_arr = included_arr.filter((word) => word.includes(char));
});

let index_specified = included_arr;
pot_word.map((char, i) => {
  if (char) {
    index_specified = index_specified.filter((word) => word.charAt(i) === char);
  }
});

let index_blocked = index_specified;
cant_strings.map((cant_arr, i) => {
  cant_arr.map((cant_char) => {
    index_blocked = index_blocked.filter(
      (word) => word.charAt(i) !== cant_char
    );
  });
});

let max_specified = index_blocked;
Object.keys(max_count).map((char) => {
  max_specified = max_specified.filter((word) => {
    const regex = new RegExp(char, "g");
    const occurrences = (word.match(regex) || []).length;
    return occurrences <= max_count[char];
  });
});

console.log(max_specified);
