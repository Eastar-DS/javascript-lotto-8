class Lotto {
  #numbers;

  constructor(numbers) {
    Lotto.#validate(numbers);
    this.#numbers = numbers;
  }

  static #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
    if (new Set(numbers).size !== numbers.length) {
      throw new Error('[ERROR] 로또 번호에 중복된 숫자가 있습니다.');
    }
    if (numbers.some((number) => number < 1 || number > 45)) {
      throw new Error('[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.');
    }
  }

  getRank(winningNumbers, bonusNumber) {
    const matchCount = this.#numbers.filter((number) => winningNumbers.includes(number)).length;
    switch (matchCount) {
      case 6:
        return 1;
      case 5:
        return this.#getRankTwoOrThree(bonusNumber);
      case 4:
        return 4;
      case 3:
        return 5;
      default:
        return 6;
    }
  }

  #getRankTwoOrThree(bonusNumber) {
    if (this.#numbers.includes(bonusNumber)) {
      return 2;
    }
    return 3;
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
