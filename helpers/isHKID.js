export default function IsHKID(str) {
  var strValidChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (str !== undefined) {
    if (str.length < 8) {
      return false;
    }
    str = str.toUpperCase();
    var hkidPat = /^([A-Z]{1,2})([0-9]{6})([A0-9])$/;
    var matchArray = str.match(hkidPat);
    if (matchArray == null) {
      return false;
    }
    var charPart = matchArray[1];
    var numPart = matchArray[2];
    var checkDigit = matchArray[3];
    var checkSum = 0;
    if (charPart.length == 2) {
      checkSum += 9 * (10 + strValidChars.indexOf(charPart.charAt(0)));
      checkSum += 8 * (10 + strValidChars.indexOf(charPart.charAt(1)));
    } else {
      checkSum += 9 * 36;
      checkSum += 8 * (10 + strValidChars.indexOf(charPart));
    }

    for (var i = 0, j = 7; i < numPart.length; i++, j--) {
      checkSum += j * numPart.charAt(i);
    }
    var remaining = checkSum % 11;
    var verify = remaining == 0 ? 0 : 11 - remaining;
    return verify == checkDigit || (verify == 10 && checkDigit == "A");
  }
  return true;
}

export function generateFakeHKID() {
  const strValidChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charPartLength = Math.random() < 0.5 ? 1 : 2;
  let charPart = "";
  let checkSum = 0;

  if (charPartLength === 2) {
    charPart = strValidChars.charAt(Math.floor(Math.random() * 26)) +
               strValidChars.charAt(Math.floor(Math.random() * 26));
    checkSum += 9 * (10 + strValidChars.indexOf(charPart.charAt(0)));
    checkSum += 8 * (10 + strValidChars.indexOf(charPart.charAt(1)));
  } else {
    charPart = strValidChars.charAt(Math.floor(Math.random() * 26));
    checkSum += 9 * 36;
    checkSum += 8 * (10 + strValidChars.indexOf(charPart));
  }

  let numPart = "";
  for (let i = 0; i < 6; i++) {
    const digit = Math.floor(Math.random() * 10);
    numPart += digit.toString();
    checkSum += (7 - i) * digit;
  }

  const remaining = checkSum % 11;
  const verify = remaining === 0 ? 0 : 11 - remaining;
  const checkDigit = verify === 10 ? "A" : verify.toString();

  return charPart + numPart + checkDigit;
}
export function generateFakeWesternerName() {
  const firstNames = [
    "John", "Emma", "Michael", "Olivia", "William", "Ava", "James", "Sophia",
    "Benjamin", "Isabella", "Ethan", "Mia", "Alexander", "Charlotte", "Daniel",
    "Amelia", "Matthew", "Harper", "David", "Evelyn", "Joseph", "Abigail"
  ];

  const lastNames = [
    "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller",
    "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White",
    "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark"
  ];

  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${randomFirstName} ${randomLastName}`;
}
