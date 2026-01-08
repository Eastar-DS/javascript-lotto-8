import {
  FIRST_PRIZE,
  SECOND_PRIZE,
  THIRD_PRIZE,
  FOURTH_PRIZE,
  FIFTH_PRIZE,
} from '../constants/constants.js';

const LottoRank = {
  FIRST: { matchCount: 6, bonusMatch: false, prize: FIRST_PRIZE },
  SECOND: { matchCount: 5, bonusMatch: true, prize: SECOND_PRIZE },
  THIRD: { matchCount: 5, bonusMatch: false, prize: THIRD_PRIZE },
  FOURTH: { matchCount: 4, bonusMatch: false, prize: FOURTH_PRIZE },
  FIFTH: { matchCount: 3, bonusMatch: false, prize: FIFTH_PRIZE },

  getRank(matchCount, bonusMatch) {
    if (matchCount === 6) {
      return this.FIRST;
    }
    if (matchCount === 5 && bonusMatch) {
      return this.SECOND;
    }
    if (matchCount === 5) {
      return this.THIRD;
    }
    if (matchCount === 4) {
      return this.FOURTH;
    }
    if (matchCount === 3) {
      return this.FIFTH;
    }
    return null;
  },
};

export default LottoRank;
