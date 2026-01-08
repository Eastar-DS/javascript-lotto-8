# 로또 프로젝트 구현 계획

## 📋 프로젝트 개요

사용자로부터 구매 금액을 입력받아 로또를 자동으로 발행하고, 당첨 번호와 보너스 번호를 입력받아 자동 발행한 로또와 비교하여 등수와 수익률을 계산하는 프로그램을 MVC 패턴으로 구현합니다.

---

## 🏗️ 폴더 구조 (MVC 패턴 기반)

```
src/
├── models/                  # Model: 비즈니스 로직 및 데이터 처리
│   ├── Lotto.js            # 로또 모델 (6개의 번호 관리)
│   ├── LottoMachine.js     # 로또 발행 머신 (로또 생성)
│   ├── WinningLotto.js     # 당첨 로또 (당첨 번호 + 보너스 번호)
│   ├── LottoRank.js        # 로또 등수 판별 및 상금 관리
│   └── LottoGame.js        # 로또 게임 로직 (전체 게임 진행, 수익률 계산)
├── views/                   # View: 입출력 담당
│   ├── InputView.js        # 사용자 입력
│   └── OutputView.js       # 결과 출력
├── controllers/             # Controller: Model과 View 연결
│   └── LottoController.js  # 게임 흐름 제어
├── validators/              # Validator: 입력 검증
│   └── InputValidator.js   # 입력 유효성 검증
├── constants/               # 상수 관리
│   └── constants.js        # 로또 관련 상수
├── App.js                   # 애플리케이션 메인 컨트롤러
└── index.js                 # 메인 실행 파일

__tests__/
├── models/
│   ├── Lotto.test.js
│   ├── LottoMachine.test.js
│   ├── WinningLotto.test.js
│   ├── LottoRank.test.js
│   └── LottoGame.test.js
├── validators/
│   └── InputValidator.test.js
└── ApplicationTest.js       # 통합 테스트
```

### MVC 역할 분담

- **Model**: 비즈니스 로직, 데이터 처리 (Lotto, LottoMachine, WinningLotto, LottoRank, LottoGame)
- **View**: 사용자 입력 받기, 결과 출력 (Console I/O)
- **Controller**: Model과 View를 조율하여 애플리케이션 흐름 제어
- **Validator**: 입력 검증 로직 분리

---

## ✅ 구현 기능 목록

### 1단계: 상수 정의 (constants)

- [x] 구현: 로또 관련 상수 정의
  - LOTTO_PRICE: 1000 (로또 1장 가격)
  - LOTTO_NUMBER_COUNT: 6 (로또 번호 개수)
  - MIN_LOTTO_NUMBER: 1 (로또 최소 번호)
  - MAX_LOTTO_NUMBER: 45 (로또 최대 번호)
  - ERROR_PREFIX: "[ERROR]"
  - 등수별 상금
    - FIRST_PRIZE: 2000000000 (1등: 6개 일치)
    - SECOND_PRIZE: 30000000 (2등: 5개 일치 + 보너스)
    - THIRD_PRIZE: 1500000 (3등: 5개 일치)
    - FOURTH_PRIZE: 50000 (4등: 4개 일치)
    - FIFTH_PRIZE: 5000 (5등: 3개 일치)

---

### 2단계: 입력 검증 로직 구현 (InputValidator)

- [x] 테스트: 구입 금액이 숫자가 아닐 경우 "[ERROR]"로 시작하는 Error 발생
  - 예: "abc" → Error
- [x] 테스트: 구입 금액이 1,000원 단위가 아닐 경우 Error 발생
  - 예: "1500" → Error
- [x] 테스트: 구입 금액이 0원 이하일 경우 Error 발생
  - 예: "0", "-1000" → Error
- [x] 테스트: 당첨 번호가 6개가 아닐 경우 Error 발생
  - 예: "1,2,3,4,5" → Error
- [x] 테스트: 당첨 번호에 중복된 숫자가 있을 경우 Error 발생
  - 예: "1,2,3,4,5,5" → Error
- [x] 테스트: 당첨 번호에 숫자와 쉼표 이외의 문자가 포함될 경우 Error 발생
  - 예: "1,2,3,4,5,a" → Error
- [x] 테스트: 당첨 번호가 1~45 범위를 벗어날 경우 Error 발생
  - 예: "1,2,3,4,5,46" → Error
- [x] 테스트: 보너스 번호가 숫자가 아닐 경우 Error 발생
  - 예: "abc" → Error
- [x] 테스트: 보너스 번호가 1~45 범위를 벗어날 경우 Error 발생
  - 예: "46" → Error
- [x] 테스트: 보너스 번호가 당첨 번호와 중복될 경우 Error 발생
  - 예: 당첨 번호에 1이 있고 보너스 번호가 "1" → Error
- [x] 구현: InputValidator 클래스
  - validatePurchaseAmount(amount): 구입 금액 검증
  - validateWinningNumbers(numbers): 당첨 번호 검증
  - validateBonusNumber(bonusNumber, winningNumbers): 보너스 번호 검증

---

### 3단계: 로또 모델 구현 (Lotto)

- [x] 테스트: 로또 번호가 6개가 아닐 경우 Error 발생
- [x] 테스트: 로또 번호에 중복된 숫자가 있을 경우 Error 발생
- [x] 테스트: 로또 번호가 1~45 범위를 벗어날 경우 Error 발생
- [x] 테스트: 로또 번호를 오름차순으로 정렬하여 반환
- [x] 테스트: 주어진 숫자와 일치하는 번호 개수를 반환
- [x] 테스트: 특정 보너스 번호를 포함하는지 확인
- [x] 구현: Lotto 클래스
  - constructor(numbers): 6개의 번호로 로또 생성, 검증 및 정렬
  - getNumbers(): 로또 번호 배열 반환 (오름차순)
  - countMatches(winningNumbers): 당첨 번호와 일치하는 개수 반환
  - hasBonus(bonusNumber): 보너스 번호 포함 여부 반환

---

### 4단계: 로또 발행 머신 구현 (LottoMachine)

- [x] 테스트: 구입 금액에 따라 올바른 개수의 로또 생성
  - 예: 3000원 → 3개
- [x] 테스트: 생성된 각 로또가 1~45 범위의 중복되지 않는 6개 숫자를 가짐
- [x] 테스트: 생성된 로또 번호가 오름차순으로 정렬됨
- [x] 구현: LottoMachine 클래스
  - generateLottos(purchaseAmount): 구입 금액만큼 로또 발행
    - Random.pickUniqueNumbersInRange(1, 45, 6) 사용
    - 로또 개수 = purchaseAmount / 1000
  - 각 로또는 Lotto 객체로 생성

---

### 5단계: 로또 등수 구현 (LottoRank)

- [ ] 테스트: 6개 일치 시 1등 (2,000,000,000원)
- [ ] 테스트: 5개 일치 + 보너스 일치 시 2등 (30,000,000원)
- [ ] 테스트: 5개 일치 시 3등 (1,500,000원)
- [ ] 테스트: 4개 일치 시 4등 (50,000원)
- [ ] 테스트: 3개 일치 시 5등 (5,000원)
- [ ] 테스트: 2개 이하 일치 시 null (낙첨)
- [ ] 구현: LottoRank enum/클래스
  - FIRST: { matchCount: 6, bonusMatch: false, prize: 2000000000 }
  - SECOND: { matchCount: 5, bonusMatch: true, prize: 30000000 }
  - THIRD: { matchCount: 5, bonusMatch: false, prize: 1500000 }
  - FOURTH: { matchCount: 4, bonusMatch: false, prize: 50000 }
  - FIFTH: { matchCount: 3, bonusMatch: false, prize: 5000 }
  - getRank(matchCount, bonusMatch): 등수 반환
  - getPrize(): 상금 반환

---

### 6단계: 당첨 로또 구현 (WinningLotto)

- [ ] 테스트: 당첨 번호와 보너스 번호로 WinningLotto 생성
- [ ] 테스트: 보너스 번호가 당첨 번호와 중복될 경우 Error 발생
- [ ] 테스트: 특정 로또의 등수 판별
  - 6개 일치 → FIRST
  - 5개 일치 + 보너스 → SECOND
  - 5개 일치 → THIRD
  - 4개 일치 → FOURTH
  - 3개 일치 → FIFTH
  - 2개 이하 → null
- [ ] 구현: WinningLotto 클래스
  - constructor(winningNumbers, bonusNumber): 당첨 번호와 보너스 번호 저장
  - judgeRank(lotto): 주어진 로또의 등수 판별
    - lotto.countMatches()로 일치 개수 확인
    - lotto.hasBonus()로 보너스 포함 여부 확인
    - LottoRank.getRank()로 등수 반환

---

### 7단계: 로또 게임 로직 구현 (LottoGame)

- [ ] 테스트: 구입한 로또들과 당첨 로또로 등수별 당첨 개수 집계
  - 예: { FIFTH: 1, FOURTH: 0, THIRD: 0, SECOND: 0, FIRST: 0 }
- [ ] 테스트: 총 수익률 계산 (소수점 둘째자리에서 반올림)
  - 수익률 = (총 상금 / 구입 금액) × 100
  - 예: 구입 금액 8000원, 총 상금 5000원 → 62.5%
- [ ] 구현: LottoGame 클래스
  - constructor(lottos, winningLotto, purchaseAmount): 게임 초기화
  - calculateRankCounts(): 등수별 당첨 개수 집계
    - 모든 로또에 대해 winningLotto.judgeRank() 호출
    - 등수별로 카운트
  - calculateProfitRate(): 수익률 계산
    - 총 상금 = 각 등수의 (당첨 개수 × 상금) 합계
    - 수익률 = (총 상금 / 구입 금액) × 100
    - 소수점 둘째자리에서 반올림

---

### 8단계: 입력 뷰 구현 (InputView)

- [ ] 구현: InputView 클래스
  - static async readPurchaseAmount(): "구입금액을 입력해 주세요." 출력 후 입력 받기
  - static async readWinningNumbers(): "당첨 번호를 입력해 주세요." 출력 후 입력 받기
  - static async readBonusNumber(): "보너스 번호를 입력해 주세요." 출력 후 입력 받기
  - MissionUtils.Console.readLineAsync 사용

---

### 9단계: 출력 뷰 구현 (OutputView)

- [ ] 테스트: 로또 구매 개수 출력
  - 예: "8개를 구매했습니다."
- [ ] 테스트: 발행된 로또 번호들 출력
  - 예: "[8, 21, 23, 41, 42, 43]"
  - 오름차순 정렬된 상태
- [ ] 테스트: 당첨 통계 출력
  - "당첨 통계"
  - "---"
  - "3개 일치 (5,000원) - 1개"
  - "4개 일치 (50,000원) - 0개"
  - "5개 일치 (1,500,000원) - 0개"
  - "5개 일치, 보너스 볼 일치 (30,000,000원) - 0개"
  - "6개 일치 (2,000,000,000원) - 0개"
- [ ] 테스트: 총 수익률 출력
  - 예: "총 수익률은 62.5%입니다."
- [ ] 구현: OutputView 클래스
  - static printPurchasedCount(count): 구매 개수 출력
  - static printLottos(lottos): 발행된 로또 번호들 출력
  - static printStatistics(rankCounts, profitRate): 당첨 통계 및 수익률 출력
  - MissionUtils.Console.print 사용

---

### 10단계: 컨트롤러 구현 (LottoController)

- [ ] 구현: LottoController 클래스
  - async start(): 게임 시작
    1. InputView.readPurchaseAmount() - 구입 금액 입력
    2. InputValidator.validatePurchaseAmount() - 입력 검증
    3. LottoMachine.generateLottos() - 로또 발행
    4. OutputView.printPurchasedCount() - 구매 개수 출력
    5. OutputView.printLottos() - 발행된 로또 출력
    6. InputView.readWinningNumbers() - 당첨 번호 입력
    7. 쉼표로 분리하여 숫자 배열 생성
    8. InputValidator.validateWinningNumbers() - 입력 검증
    9. InputView.readBonusNumber() - 보너스 번호 입력
    10. InputValidator.validateBonusNumber() - 입력 검증
    11. WinningLotto 인스턴스 생성
    12. LottoGame 인스턴스 생성
    13. rankCounts = LottoGame.calculateRankCounts()
    14. profitRate = LottoGame.calculateProfitRate()
    15. OutputView.printStatistics(rankCounts, profitRate)

---

### 11단계: 애플리케이션 진입점 구현 (App)

- [ ] 구현: App 클래스
  - async run(): LottoController 생성 및 start() 호출
  - Error 발생 시 throw하여 애플리케이션 종료

---

### 12단계: 통합 테스트

- [ ] 테스트: ApplicationTest.js의 기능 테스트 통과
  - 구입 금액, 당첨 번호, 보너스 번호 입력
  - 로또 발행 및 당첨 결과 출력 확인
- [ ] 테스트: ApplicationTest.js의 예외 테스트 통과
  - 잘못된 입력에 대한 "[ERROR]" 메시지 확인

---

### 13단계: 리팩토링

- [ ] 구조적 개선: 중복 코드 제거
- [ ] 구조적 개선: 함수/메서드 분리 (단일 책임 원칙)
- [ ] 구조적 개선: 변수명/함수명 명확화
- [ ] 구조적 개선: 매직 넘버/문자열 상수화 검토
- [ ] 구조적 개선: 에러 메시지 일관성 확인

---

## 📝 클래스 상세 설계

### Model

#### **Lotto.js**

```javascript
class Lotto {
  #numbers;

  constructor(numbers) {
    // 검증: 6개인지, 중복 없는지, 1~45 범위인지
    // 정렬하여 저장
  }

  getNumbers() {
    // 번호 배열 반환
  }

  countMatches(winningNumbers) {
    // 당첨 번호와 일치하는 개수 반환
  }

  hasBonus(bonusNumber) {
    // 보너스 번호 포함 여부 반환
  }
}
```

#### **LottoMachine.js**

```javascript
import { Random } from '@woowacourse/mission-utils';

class LottoMachine {
  static generateLottos(purchaseAmount) {
    // 로또 개수 계산 (purchaseAmount / 1000)
    // Random.pickUniqueNumbersInRange(1, 45, 6)로 각 로또 생성
    // Lotto 객체 배열 반환
  }
}
```

#### **WinningLotto.js**

```javascript
class WinningLotto {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    // 보너스 번호가 당첨 번호와 중복되는지 검증
    // 저장
  }

  judgeRank(lotto) {
    // lotto.countMatches()로 일치 개수 확인
    // lotto.hasBonus()로 보너스 포함 여부 확인
    // LottoRank.getRank()로 등수 반환
  }
}
```

#### **LottoRank.js**

```javascript
const LottoRank = {
  FIRST: { matchCount: 6, bonusMatch: false, prize: 2000000000 },
  SECOND: { matchCount: 5, bonusMatch: true, prize: 30000000 },
  THIRD: { matchCount: 5, bonusMatch: false, prize: 1500000 },
  FOURTH: { matchCount: 4, bonusMatch: false, prize: 50000 },
  FIFTH: { matchCount: 3, bonusMatch: false, prize: 5000 },

  getRank(matchCount, bonusMatch) {
    // 일치 개수와 보너스 일치 여부로 등수 반환
    // 2개 이하 일치 시 null
  }
};
```

#### **LottoGame.js**

```javascript
class LottoGame {
  #lottos;
  #winningLotto;
  #purchaseAmount;

  constructor(lottos, winningLotto, purchaseAmount) {
    // 초기화
  }

  calculateRankCounts() {
    // 모든 로또의 등수 판별하여 집계
    // { FIFTH: n, FOURTH: n, THIRD: n, SECOND: n, FIRST: n } 반환
  }

  calculateProfitRate() {
    // 총 상금 계산
    // 수익률 = (총 상금 / 구입 금액) × 100
    // 소수점 둘째자리에서 반올림
  }
}
```

### Validator

#### **InputValidator.js**

```javascript
class InputValidator {
  static validatePurchaseAmount(amount) {
    // 1. 숫자인지 확인
    // 2. 1,000원 단위인지 확인
    // 3. 양수인지 확인
    // 검증 실패 시 "[ERROR] ..." throw
  }

  static validateWinningNumbers(numbers) {
    // 1. 6개인지 확인
    // 2. 모두 숫자인지 확인
    // 3. 중복 없는지 확인
    // 4. 1~45 범위인지 확인
    // 검증 실패 시 "[ERROR] ..." throw
  }

  static validateBonusNumber(bonusNumber, winningNumbers) {
    // 1. 숫자인지 확인
    // 2. 1~45 범위인지 확인
    // 3. 당첨 번호와 중복되지 않는지 확인
    // 검증 실패 시 "[ERROR] ..." throw
  }
}
```

### View

#### **InputView.js**

```javascript
import { Console } from '@woowacourse/mission-utils';

class InputView {
  static async readPurchaseAmount() {
    return await Console.readLineAsync('구입금액을 입력해 주세요.\n');
  }

  static async readWinningNumbers() {
    return await Console.readLineAsync('당첨 번호를 입력해 주세요.\n');
  }

  static async readBonusNumber() {
    return await Console.readLineAsync('보너스 번호를 입력해 주세요.\n');
  }
}
```

#### **OutputView.js**

```javascript
import { Console } from '@woowacourse/mission-utils';

class OutputView {
  static printPurchasedCount(count) {
    Console.print(`\n${count}개를 구매했습니다.`);
  }

  static printLottos(lottos) {
    lottos.forEach(lotto => {
      Console.print(`[${lotto.getNumbers().join(', ')}]`);
    });
  }

  static printStatistics(rankCounts, profitRate) {
    Console.print('\n당첨 통계');
    Console.print('---');
    // 각 등수별 당첨 개수 출력
    // 총 수익률 출력
  }
}
```

### Controller

#### **LottoController.js**

```javascript
class LottoController {
  async start() {
    // 1. 구입 금액 입력 및 검증
    // 2. 로또 발행
    // 3. 발행된 로또 출력
    // 4. 당첨 번호 입력 및 검증
    // 5. 보너스 번호 입력 및 검증
    // 6. 당첨 로또 생성
    // 7. 게임 진행 및 결과 계산
    // 8. 통계 및 수익률 출력
  }
}
```

---

## 🔄 실행 흐름

```
1. App.run() 실행
   ↓
2. LottoController.start() 호출
   ↓
3. InputView.readPurchaseAmount()
   ↓
4. InputValidator.validatePurchaseAmount()
   ↓
5. LottoMachine.generateLottos()
   ↓
6. OutputView.printPurchasedCount()
   ↓
7. OutputView.printLottos()
   ↓
8. InputView.readWinningNumbers()
   ↓
9. 쉼표로 분리하여 숫자 배열 생성
   ↓
10. InputValidator.validateWinningNumbers()
    ↓
11. InputView.readBonusNumber()
    ↓
12. InputValidator.validateBonusNumber()
    ↓
13. WinningLotto 인스턴스 생성
    ↓
14. LottoGame 인스턴스 생성
    ↓
15. LottoGame.calculateRankCounts()
    ↓
16. LottoGame.calculateProfitRate()
    ↓
17. OutputView.printStatistics()
```

---

## 🔍 커밋 전략

- 각 단계의 테스트 작성 후 커밋 (Red)
- 테스트 통과 후 커밋 (Green)
- 리팩토링 후 별도 커밋 (Refactor)
- 커밋 메시지는 기능 단위로 명확하게 작성

예시:

```
test: InputValidator 구입 금액 검증 테스트 추가
feat: InputValidator 구입 금액 검증 로직 구현
test: Lotto 클래스 생성 및 검증 테스트 추가
feat: Lotto 클래스 구현
test: LottoMachine 로또 발행 테스트 추가
feat: LottoMachine 로또 발행 로직 구현
refactor: 상수 분리 및 매직 넘버 제거
```

---

## ⚠️ 주의사항

1. **입력 검증**: 잘못된 입력 시 IllegalArgumentException 발생 후 종료
2. **Error 메시지**: 모든 예외는 "[ERROR]"로 시작
3. **로또 번호**: 1~45 범위, 6개, 중복 불가, 오름차순 정렬
4. **로또 발행**: Random.pickUniqueNumbersInRange(1, 45, 6) 사용
5. **등수 판별**: 일치 개수와 보너스 번호 일치 여부로 판별
6. **수익률**: (총 상금 / 구입 금액) × 100, 소수점 둘째자리에서 반올림
7. **출력 형식**:
   - 로또 번호: [8, 21, 23, 41, 42, 43]
   - 당첨 통계: "3개 일치 (5,000원) - 1개"
   - 수익률: "총 수익률은 62.5%입니다."

---

## 📤 출력 예시

```
구입금액을 입력해 주세요.
8000

8개를 구매했습니다.
[8, 21, 23, 41, 42, 43]
[3, 5, 11, 16, 32, 38]
[7, 11, 16, 35, 36, 44]
[1, 8, 11, 31, 41, 42]
[13, 14, 16, 38, 42, 45]
[7, 11, 30, 40, 42, 43]
[2, 13, 22, 32, 42, 45]
[1, 3, 5, 14, 22, 45]

당첨 번호를 입력해 주세요.
1,2,3,4,5,6

보너스 번호를 입력해 주세요.
7

당첨 통계
---
3개 일치 (5,000원) - 1개
4개 일치 (50,000원) - 0개
5개 일치 (1,500,000원) - 0개
5개 일치, 보너스 볼 일치 (30,000,000원) - 0개
6개 일치 (2,000,000,000원) - 0개
총 수익률은 62.5%입니다.
```

---

## 🎯 완료 조건

- [ ] 모든 단위 테스트 통과
- [ ] ApplicationTest.js 통합 테스트 통과
- [ ] ESLint 오류 0개
- [ ] MVC 패턴 구조 준수
  - [ ] Model: 비즈니스 로직만 담당 (Lotto, LottoMachine, WinningLotto, LottoRank, LottoGame)
  - [ ] View: 입출력만 담당 (InputView, OutputView - 비즈니스 로직 없음)
  - [ ] Controller: Model과 View 조율만 담당 (LottoController)
  - [ ] Validator: 입력 검증만 담당 (InputValidator)
- [ ] 의미 있는 커밋 히스토리
