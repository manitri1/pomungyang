import { supabase } from '@/lib/supabase'
import type { EventPost } from '../constants/eventPosts'

// Supabase 데이터베이스 타입
type EventPostRow = {
  id: string
  event_id: string
  author: string
  title: string
  content: string
  image_url: string
  sns_link?: string | null
  created_at: number
  likes?: number | null
}

// Row를 EventPost로 변환
const rowToPost = (row: EventPostRow): EventPost => ({
  id: row.id,
  eventId: row.event_id,
  author: row.author,
  title: row.title,
  content: row.content,
  imageUrl: row.image_url,
  snsLink: row.sns_link || undefined,
  createdAt: row.created_at,
  likes: row.likes || 0,
})

// EventPost를 Row로 변환
const postToRow = (post: EventPost): Omit<EventPostRow, 'id'> => ({
  event_id: post.eventId,
  author: post.author,
  title: post.title,
  content: post.content,
  image_url: post.imageUrl,
  sns_link: post.snsLink || null,
  created_at: post.createdAt,
  likes: post.likes || 0,
})

export const eventPostSupabaseStorage = {
  getAll: async (eventId?: string): Promise<EventPost[]> => {
    try {
      let query = supabase.from('event_posts').select('*').order('created_at', { ascending: false })

      if (eventId) {
        query = query.eq('event_id', eventId)
      }

      const { data, error } = await query

      if (error) {
        console.error('인증 포스트 조회 실패:', error)
        return []
      }

      return (data || []).map(rowToPost)
    } catch (error) {
      console.error('인증 포스트 조회 오류:', error)
      return []
    }
  },

  getById: async (id: string): Promise<EventPost | null> => {
    try {
      const { data, error } = await supabase.from('event_posts').select('*').eq('id', id).single()

      if (error) {
        console.error('인증 포스트 조회 실패:', error)
        return null
      }

      return data ? rowToPost(data) : null
    } catch (error) {
      console.error('인증 포스트 조회 오류:', error)
      return null
    }
  },

  save: async (post: EventPost): Promise<boolean> => {
    try {
      const row = postToRow(post)
      const { error } = await supabase
        .from('event_posts')
        .upsert({ id: post.id, ...row }, { onConflict: 'id' })

      if (error) {
        console.error('인증 포스트 저장 실패:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('인증 포스트 저장 오류:', error)
      return false
    }
  },

  delete: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase.from('event_posts').delete().eq('id', id)

      if (error) {
        console.error('인증 포스트 삭제 실패:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('인증 포스트 삭제 오류:', error)
      return false
    }
  },

  toggleLike: async (id: string): Promise<void> => {
    try {
      const post = await eventPostSupabaseStorage.getById(id)
      if (post) {
        post.likes = (post.likes || 0) + 1
        await eventPostSupabaseStorage.save(post)
      }
    } catch (error) {
      console.error('좋아요 오류:', error)
    }
  },
}

