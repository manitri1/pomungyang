import { supabase } from '@/lib/supabase'
import type { WorldviewPost, Media } from '../constants/worldview'

// Supabase 데이터베이스 타입
type WorldviewPostRow = {
  id: string
  character_id: string
  title: string
  content: string
  media: Media[]
  author?: string | null
  created_at: number
  updated_at: number
  views?: number | null
  likes?: number | null
}

// Row를 WorldviewPost로 변환
const rowToPost = (row: WorldviewPostRow): WorldviewPost => ({
  id: row.id,
  characterId: row.character_id,
  title: row.title,
  content: row.content,
  media: row.media,
  author: row.author || undefined,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  views: row.views || 0,
  likes: row.likes || 0,
})

// WorldviewPost를 Row로 변환
const postToRow = (post: WorldviewPost): Omit<WorldviewPostRow, 'id'> => ({
  character_id: post.characterId,
  title: post.title,
  content: post.content,
  media: post.media,
  author: post.author || null,
  created_at: post.createdAt,
  updated_at: post.updatedAt,
  views: post.views || 0,
  likes: post.likes || 0,
})

export const worldviewSupabaseStorage = {
  getAll: async (characterId?: string): Promise<WorldviewPost[]> => {
    try {
      let query = supabase.from('worldview_posts').select('*').order('created_at', { ascending: false })

      if (characterId) {
        query = query.eq('character_id', characterId)
      }

      const { data, error } = await query

      if (error) {
        console.error('게시글 조회 실패:', error)
        return []
      }

      return (data || []).map(rowToPost)
    } catch (error) {
      console.error('게시글 조회 오류:', error)
      return []
    }
  },

  getById: async (id: string): Promise<WorldviewPost | null> => {
    try {
      const { data, error } = await supabase.from('worldview_posts').select('*').eq('id', id).single()

      if (error) {
        console.error('게시글 조회 실패:', error)
        return null
      }

      return data ? rowToPost(data) : null
    } catch (error) {
      console.error('게시글 조회 오류:', error)
      return null
    }
  },

  save: async (post: WorldviewPost): Promise<boolean> => {
    try {
      const row = postToRow(post)
      const { error } = await supabase
        .from('worldview_posts')
        .upsert({ id: post.id, ...row }, { onConflict: 'id' })

      if (error) {
        console.error('게시글 저장 실패:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('게시글 저장 오류:', error)
      return false
    }
  },

  delete: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase.from('worldview_posts').delete().eq('id', id)

      if (error) {
        console.error('게시글 삭제 실패:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('게시글 삭제 오류:', error)
      return false
    }
  },

  incrementViews: async (id: string): Promise<void> => {
    try {
      const post = await worldviewSupabaseStorage.getById(id)
      if (post) {
        post.views = (post.views || 0) + 1
        await worldviewSupabaseStorage.save(post)
      }
    } catch (error) {
      console.error('조회수 증가 오류:', error)
    }
  },
}

