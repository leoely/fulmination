class IntegerParser {
  constructor() {
    this.integer = 0;
  }

  resetInteger() {
    this.integer = 0;
  }

  getInteger() {
    return this.integer;
  }

  scan(text) {
    for (let i = 0; i < text.length; i += 1) {
      const char = text.charAt(i);
      this.dealChar(char);
    }
  }

  dealChar(char) {
    const code = char.charCodeAt(0);
    if (code >= 48 && code <= 57) {
      this.integer *= 10;
      this.integer += (code - 48);
    } else {
      throw new Error('[Error] Input parameter should be a decimal.');
    }
  }
}

export default IntegerParser;
