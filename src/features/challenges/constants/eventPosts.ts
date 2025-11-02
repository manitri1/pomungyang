export type EventPost = {
  id: string
  eventId: string
  author: string
  title: string
  content: string
  imageUrl: string
  snsLink?: string
  createdAt: number
  likes?: number
}

// 로컬 스토리지 기반 데이터 관리
const STORAGE_KEY = 'event_posts'

export const eventPostStorage = {
  getAll: (eventId?: string): EventPost[] => {
    if (typeof window === 'undefined') return []
    
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      if (!data) return []
      
      const posts: EventPost[] = JSON.parse(data)
      return eventId
        ? posts.filter((post) => post.eventId === eventId)
        : posts
    } catch {
      return []
    }
  },

  getById: (id: string): EventPost | null => {
    const posts = eventPostStorage.getAll()
    return posts.find((post) => post.id === id) || null
  },

  save: (post: EventPost): void => {
    if (typeof window === 'undefined') return
    
    try {
      const posts = eventPostStorage.getAll()
      const existingIndex = posts.findIndex((p) => p.id === post.id)
      
      if (existingIndex >= 0) {
        posts[existingIndex] = post
      } else {
        posts.push(post)
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
    } catch (error) {
      console.error('인증 포스트 저장 실패:', error)
    }
  },

  delete: (id: string): boolean => {
    if (typeof window === 'undefined') return false
    
    try {
      const posts = eventPostStorage.getAll()
      const filtered = posts.filter((p) => p.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
      return true
    } catch {
      return false
    }
  },

  toggleLike: (id: string): void => {
    const post = eventPostStorage.getById(id)
    if (post) {
      post.likes = (post.likes || 0) + 1
      eventPostStorage.save(post)
    }
  },
}

