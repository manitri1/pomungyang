# NextAuth JWT 복호화 오류 해결 가이드

## 오류 메시지
```
[next-auth][error][JWT_SESSION_ERROR] 
decryption operation failed
```

## 원인

이 오류는 다음 중 하나의 이유로 발생합니다:

1. **`NEXTAUTH_SECRET`이 설정되지 않음**
   - `.env.local` 파일에 `NEXTAUTH_SECRET`이 없거나 잘못 설정됨

2. **브라우저에 이전 시크릿으로 암호화된 쿠키가 남아있음**
   - `NEXTAUTH_SECRET`을 변경했지만 브라우저 쿠키는 이전 값으로 암호화됨
   - 서버와 브라우저의 시크릿이 일치하지 않음

3. **`.env.local` 파일이 실제로 사용되지 않음**
   - 파일명이 잘못되었거나 (`env copy.local` 등) 프로젝트 루트에 없음

## 해결 방법

### 1단계: `.env.local` 파일 확인 및 생성

1. 프로젝트 루트(`pomung/`)에 `.env.local` 파일이 있는지 확인
2. 없다면 `.env copy.local` 파일을 `.env.local`로 복사 또는 이름 변경
3. 파일 내용 확인:

```env
NEXTAUTH_SECRET=6JkPPAvRKe6iVs/NGxtDtcgPJg8tuFTCH5Bu5ywDeqY=
NEXTAUTH_URL=http://localhost:3000
```

**중요:**
- 파일명이 정확히 `.env.local`이어야 합니다
- `.env copy.local`은 사용되지 않습니다

### 2단계: 브라우저 쿠키 삭제

다음 중 하나를 선택하세요:

#### 방법 A: 브라우저 개발자 도구 사용
1. 브라우저에서 `F12` 누르기
2. **Application** 탭 (Chrome) 또는 **Storage** 탭 (Firefox) 클릭
3. 왼쪽 메뉴에서 **Cookies** > `http://localhost:3000` 클릭
4. 다음 쿠키들을 찾아 삭제:
   - `next-auth.session-token`
   - `next-auth.csrf-token`
   - `next-auth.callback-url`
5. 페이지 새로고침 (`F5`)

#### 방법 B: 브라우저 캐시 전체 삭제
1. `Ctrl + Shift + Delete` 누르기
2. **쿠키 및 기타 사이트 데이터** 선택
3. **삭제** 클릭

#### 방법 C: 시크릿 모드 사용
1. 새 시크릿/프라이빗 창 열기
2. `http://localhost:3000` 접속

### 3단계: 개발 서버 재시작

1. 터미널에서 `Ctrl + C`로 서버 중지
2. 서버 재시작:
   ```bash
   npm run dev
   ```

### 4단계: 확인

브라우저를 새로고침하고 오류가 사라졌는지 확인하세요.

## 추가 문제 해결

### `NEXTAUTH_SECRET` 재생성 (필요시)

만약 위 방법이 작동하지 않는다면, 새로운 `NEXTAUTH_SECRET`을 생성하세요:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

생성된 값을 `.env.local`의 `NEXTAUTH_SECRET`에 넣고:
1. 서버 재시작
2. 브라우저 쿠키 삭제
3. 페이지 새로고침

### 프로덕션 환경 (Vercel)

Vercel에 배포할 때는:
1. Vercel 대시보드에서 환경 변수 설정
2. `NEXTAUTH_SECRET`과 `NEXTAUTH_URL` 모두 설정
3. 재배포

## 예방 방법

- `.env.local` 파일명을 정확히 유지
- `NEXTAUTH_SECRET`을 변경할 때마다 사용자에게 재로그인 필요성 안내
- 개발/프로덕션 환경별로 다른 시크릿 사용

