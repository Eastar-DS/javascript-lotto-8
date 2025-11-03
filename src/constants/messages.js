export const MESSAGES = {
  INPUT_PROMPT: {
    COST: '구입금액을 입력해 주세요.\n',
    WINNING_NUMBERS: '당첨 번호를 입력해 주세요.\n',
    BONUS_NUMBER: '보너스 번호를 입력해 주세요.\n',
  },

  OUTPUT: {
    PURCHASE_COUNT: (count) => `${count}개를 구매했습니다.`,
    LOTTO_NUMBERS: (numbers) => `[${numbers.join(', ')}]`,
    STATISTICS_TITLE: '당첨 통계',
    STATISTICS_DIVIDER: '---',
    WINNING_RESULT_FIFTH: (count) => `3개 일치 (5,000원) - ${count}개`,
    WINNING_RESULT_FOURTH: (count) => `4개 일치 (50,000원) - ${count}개`,
    WINNING_RESULT_THIRD: (count) => `5개 일치 (1,500,000원) - ${count}개`,
    WINNING_RESULT_SECOND: (count) => `5개 일치, 보너스 볼 일치 (30,000,000원) - ${count}개`,
    WINNING_RESULT_FIRST: (count) => `6개 일치 (2,000,000,000원) - ${count}개`,
    PROFIT_RATIO: (ratio) => `총 수익률은 ${ratio}%입니다.`,
  },
};
