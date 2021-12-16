const emailRegExp = /\S+@\S+\.\S+/;

// const mongoIdRegExp = /^[0-9a-fA-F]{24}$/;

const phoneNumberRegExp = /^\(?0( *\d\)?){9,10}$/;

const linkedInRegex = /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/;

const gitHubRegEx = /^(http(s)?:\/\/)?([\w]+\.)?github\.com\/[A-Za-z0-9@:%_\+.~#?&//=]*/;

module.exports = { emailRegExp, phoneNumberRegExp, linkedInRegex, gitHubRegEx };
