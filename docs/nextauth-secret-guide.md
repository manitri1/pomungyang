# NEXTAUTH_SECRET 설정 가이드

## NEXTAUTH_SECRET이란?

`NEXTAUTH_SECRET`은 NextAuth.js에서 JWT 토큰을 암호화하고 서명하는 데 사용하는 비밀 키입니다.

### 용도:
- 🔐 JWT 토큰 암호화 및 서명
- 🍪 세션 쿠키 암호화
- 🔒 CSRF 토큰 생성
- 🛡️ 보안을 위한 암호화 키

## 생성 방법

### 방법 1: 온라인 도구 사용 (권장)
1. [NextAuth Secret Generator](https://generate-secret.vercel.app/32) 사이트 접속
2. "Generate" 버튼 클릭
3. 생성된 32자 이상의 랜덤 문자열 복사

### 방법 2: OpenSSL 명령어 사용 (터미널)
```bash
openssl rand -base64 32
```

### 방법 3: Node.js 명령어 사용
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 방법 4: 온라인 랜덤 문자열 생성기
- https://randomkeygen.com/ 에서 "Fort Knox Passwords" 섹션의 값 사용
- 최소 32자 이상의 랜덤 문자열

## 설정 방법

`.env.local` 파일에 추가:

```env
NEXTAUTH_SECRET=여기에_생성된_랜덤_문자열_붙여넣기
NEXTAUTH_URL=http://localhost:3000
```

**예시:**
```env
NEXTAUTH_SECRET=AbCdEfGhIjKlMnOpQrStUvWxYz1234567890AbCdEfGhIj
NEXTAUTH_URL=http://localhost:3000
```

## 주의사항

1. **프로덕션 환경:**
   - 프로덕션 URL로 변경: `NEXTAUTH_URL=https://your-domain.com`
   - Vercel에도 동일한 환경 변수 설정 필요

2. **보안:**
   - 절대 Git에 커밋하지 마세요 (`.gitignore`에 포함됨)
   - 각 환경(개발/프로덕션)마다 다른 값 사용 권장
   - 누구와도 공유하지 마세요

3. **값 변경:**
   - `NEXTAUTH_SECRET`을 변경하면 모든 기존 세션이 무효화됩니다
   - 사용자는 다시 로그인해야 합니다

## 현재 프로젝트에서의 사용

프로젝트에서 NextAuth는 다음 용도로 사용됩니다:
- 사용자 인증 (ID/PW 로그인)
- 세션 관리
- 보호된 페이지/API 라우트 접근 제어

## NEXTAUTH_URL과의 차이

- **NEXTAUTH_SECRET**: JWT 암호화 키 (비밀 키)
- **NEXTAUTH_URL**: 애플리케이션의 기본 URL (공개 정보)

둘 다 필요하며 함께 설정해야 합니다.

