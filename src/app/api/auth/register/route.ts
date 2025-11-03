import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password, email, name } = body

    // 입력 검증
    if (!username || !password) {
      return NextResponse.json(
        { error: '아이디와 비밀번호는 필수입니다.' },
        { status: 400 }
      )
    }

    if (username.length < 3 || username.length > 20) {
      return NextResponse.json(
        { error: '아이디는 3자 이상 20자 이하여야 합니다.' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: '비밀번호는 6자 이상이어야 합니다.' },
        { status: 400 }
      )
    }

    // 사용자명 중복 확인
    const { data: existingUser } = await supabase
      .from('users')
      .select('username')
      .eq('username', username)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: '이미 사용 중인 아이디입니다.' },
        { status: 400 }
      )
    }

    // 비밀번호 해시화
    const passwordHash = await bcrypt.hash(password, 10)

    // 사용자 생성
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const { error } = await supabase.from('users').insert({
      id: userId,
      username,
      email: email || null,
      password_hash: passwordHash,
      name: name || username,
      created_at: Date.now(),
      updated_at: Date.now(),
    })

    if (error) {
      console.error('회원가입 오류:', error)
      return NextResponse.json(
        { error: '회원가입 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: '회원가입이 완료되었습니다.', userId },
      { status: 201 }
    )
  } catch (error) {
    console.error('회원가입 처리 오류:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

