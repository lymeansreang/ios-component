"use client";

// Xcode Default Dark theme colors
const COLORS = {
  keyword: "#FC5FA3",      // pink - keywords
  type: "#5DD8FF",         // cyan - types, classes
  string: "#FC6A5D",       // red - strings
  number: "#D0BF69",       // yellow - numbers
  comment: "#6C7986",      // gray - comments
  property: "#A167E6",     // purple - properties/methods
  func: "#67B7A4",         // teal - function names
  plain: "#DFDFE0",        // white - plain text
  dot: "#DFDFE0",          // white - dots
  preprocessor: "#FD8F3F", // orange - #selector, @objc
};

const SWIFT_KEYWORDS = new Set([
  "import", "class", "struct", "enum", "protocol", "extension",
  "func", "var", "let", "private", "public", "internal", "open",
  "fileprivate", "static", "override", "required", "init",
  "return", "if", "else", "for", "in", "while", "switch", "case",
  "break", "continue", "guard", "self", "super", "true", "false",
  "nil", "throws", "throw", "try", "catch", "do", "defer",
  "typealias", "associatedtype", "where", "is", "as",
  "mutating", "nonmutating", "convenience", "lazy", "weak",
  "unowned", "willSet", "didSet", "get", "set", "inout",
  "some", "any", "async", "await",
]);

const SWIFT_TYPES = new Set([
  "UIView", "UIButton", "UILabel", "UIStackView", "UIImageView",
  "UITextField", "UITextView", "UIScrollView", "UITableView",
  "UICollectionView", "UIViewController", "UIColor", "UIFont",
  "UIImage", "UIScreen", "UIApplication", "UIWindow",
  "NSLayoutConstraint", "NSDirectionalEdgeInsets", "NSCoder",
  "CGRect", "CGPoint", "CGSize", "CGFloat",
  "String", "Int", "Double", "Float", "Bool", "Array", "Dictionary",
  "Set", "Optional", "Any", "AnyObject", "Void",
  "Configuration", "UIButton.Configuration",
]);

interface Token {
  text: string;
  color: string;
}

function tokenizeSwift(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < code.length) {
    // Comments: // ...
    if (code[i] === "/" && code[i + 1] === "/") {
      let end = code.indexOf("\n", i);
      if (end === -1) end = code.length;
      tokens.push({ text: code.slice(i, end), color: COLORS.comment });
      i = end;
      continue;
    }

    // Multi-line comments: /* ... */
    if (code[i] === "/" && code[i + 1] === "*") {
      let end = code.indexOf("*/", i + 2);
      if (end === -1) end = code.length;
      else end += 2;
      tokens.push({ text: code.slice(i, end), color: COLORS.comment });
      i = end;
      continue;
    }

    // Strings: "..."
    if (code[i] === '"') {
      let end = i + 1;
      while (end < code.length && code[end] !== '"') {
        if (code[end] === "\\") end++;
        end++;
      }
      end++;
      tokens.push({ text: code.slice(i, end), color: COLORS.string });
      i = end;
      continue;
    }

    // @objc, @escaping, etc.
    if (code[i] === "@") {
      let end = i + 1;
      while (end < code.length && /[a-zA-Z_]/.test(code[end])) end++;
      tokens.push({ text: code.slice(i, end), color: COLORS.preprocessor });
      i = end;
      continue;
    }

    // #selector, #available, etc.
    if (code[i] === "#" && /[a-zA-Z]/.test(code[i + 1] || "")) {
      let end = i + 1;
      while (end < code.length && /[a-zA-Z_]/.test(code[end])) end++;
      tokens.push({ text: code.slice(i, end), color: COLORS.preprocessor });
      i = end;
      continue;
    }

    // Numbers
    if (/[0-9]/.test(code[i]) && (i === 0 || !/[a-zA-Z_]/.test(code[i - 1]))) {
      let end = i;
      while (end < code.length && /[0-9._]/.test(code[end])) end++;
      tokens.push({ text: code.slice(i, end), color: COLORS.number });
      i = end;
      continue;
    }

    // Dot access: .something
    if (code[i] === ".") {
      tokens.push({ text: ".", color: COLORS.dot });
      i++;
      if (i < code.length && /[a-zA-Z_]/.test(code[i])) {
        let end = i;
        while (end < code.length && /[a-zA-Z0-9_]/.test(code[end])) end++;
        const word = code.slice(i, end);
        if (SWIFT_TYPES.has(word)) {
          tokens.push({ text: word, color: COLORS.type });
        } else {
          tokens.push({ text: word, color: COLORS.property });
        }
        i = end;
      }
      continue;
    }

    // Words: keywords, types, identifiers
    if (/[a-zA-Z_]/.test(code[i])) {
      let end = i;
      while (end < code.length && /[a-zA-Z0-9_]/.test(code[end])) end++;
      const word = code.slice(i, end);

      if (SWIFT_KEYWORDS.has(word)) {
        tokens.push({ text: word, color: COLORS.keyword });
      } else if (SWIFT_TYPES.has(word)) {
        tokens.push({ text: word, color: COLORS.type });
      } else if (
        word[0] === word[0].toUpperCase() &&
        word[0] !== word[0].toLowerCase()
      ) {
        // PascalCase = likely a type
        tokens.push({ text: word, color: COLORS.type });
      } else {
        // Check if it's a function call: word followed by (
        const nextNonSpace = code.slice(end).match(/^(\s*)\(/);
        if (nextNonSpace) {
          tokens.push({ text: word, color: COLORS.func });
        } else {
          tokens.push({ text: word, color: COLORS.plain });
        }
      }
      i = end;
      continue;
    }

    // Whitespace and other characters
    if (/\s/.test(code[i])) {
      let end = i;
      while (end < code.length && /\s/.test(code[end]) && code[end] !== "\n") end++;
      if (code[i] === "\n") {
        tokens.push({ text: "\n", color: COLORS.plain });
        i = i + 1;
      } else {
        tokens.push({ text: code.slice(i, end), color: COLORS.plain });
        i = end;
      }
      continue;
    }

    // Everything else (operators, brackets, etc.)
    tokens.push({ text: code[i], color: COLORS.plain });
    i++;
  }

  return tokens;
}

export default function SwiftHighlighter({ code }: { code: string }) {
  const tokens = tokenizeSwift(code);

  return (
    <>
      {tokens.map((token, i) => (
        <span key={i} style={{ color: token.color }}>
          {token.text}
        </span>
      ))}
    </>
  );
}
