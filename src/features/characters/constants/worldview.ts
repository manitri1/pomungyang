export type MediaType = 'image' | 'video' | 'text'

export type Media = {
  id: string
  type: MediaType
  url: string
  thumbnail?: string
  alt?: string
}

export type WorldviewPost = {
  id: string
  characterId: string
  title: string
  content: string
  media: Media[]
  author?: string
  createdAt: number
  updatedAt: number
  views?: number
  likes?: number
}

// 로컬 스토리지 기반 데이터 관리
const STORAGE_KEY = 'worldview_posts'

export const worldviewStorage = {
  getAll: (characterId?: string): WorldviewPost[] => {
    if (typeof window === 'undefined') return []
    
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      if (!data) return []
      
      const posts: WorldviewPost[] = JSON.parse(data)
      return characterId
        ? posts.filter((post) => post.characterId === characterId)
        : posts
    } catch {
      return []
    }
  },

  getById: (id: string): WorldviewPost | null => {
    const posts = worldviewStorage.getAll()
    return posts.find((post) => post.id === id) || null
  },

  save: (post: WorldviewPost): void => {
    if (typeof window === 'undefined') return
    
    try {
      const posts = worldviewStorage.getAll()
      const existingIndex = posts.findIndex((p) => p.id === post.id)
      
      if (existingIndex >= 0) {
        posts[existingIndex] = post
      } else {
        posts.push(post)
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
    } catch (error) {
      console.error('게시글 저장 실패:', error)
    }
  },

  delete: (id: string): boolean => {
    if (typeof window === 'undefined') return false
    
    try {
      const posts = worldviewStorage.getAll()
      const filtered = posts.filter((p) => p.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
      return true
    } catch {
      return false
    }
  },

  incrementViews: (id: string): void => {
    const post = worldviewStorage.getById(id)
    if (post) {
      post.views = (post.views || 0) + 1
      worldviewStorage.save(post)
    }
  },
}

