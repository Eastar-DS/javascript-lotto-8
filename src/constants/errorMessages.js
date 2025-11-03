export const ERROR_MESSAGES = {
  LOTTO: {
    INVALID_LENGTH: '[ERROR] 로또 번호는 6개여야 합니다.',
    DUPLICATE_NUMBERS: '[ERROR] 로또 번호에 중복된 숫자가 있습니다.',
    INVALID_RANGE: '[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.',
  },

  GAME: {
    INVALID_LOTTOS_TYPE: '[ERROR] lottos의 모든 원소는 Lotto 모델의 인스턴스여야 합니다.',
    INVALID_WINNING_LOTTO_TYPE: '[ERROR] winningLotto는 Lotto 모델의 인스턴스여야 합니다.',
    INVALID_BONUS_NUMBER_TYPE: '[ERROR] bonusNumber는 정수여야 합니다.',
    INVALID_BONUS_NUMBER_RANGE: '[ERROR] bonusNumber는 1~45 사이의 숫자여야 합니다.',
    DUPLICATE_BONUS_NUMBER: '[ERROR] bonusNumber는 당첨번호와 중복될 수 없습니다.',
  },

  INPUT: {
    INVALID_COST_TYPE: '[ERROR] 유효한 숫자를 입력해 주세요.',
    INVALID_COST_MINIMUM: '[ERROR] 1,000원 이상의 금액을 입력해주세요.',
    INVALID_COST_UNIT: '[ERROR] 금액은 1,000원 단위로 입력해주세요.',
  },
};
