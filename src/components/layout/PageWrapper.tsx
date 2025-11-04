'use client'

import { PageTransition } from '@/components/ui/page-transition'
import { ReactNode } from 'react'

interface PageWrapperProps {
  children: ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  return <PageTransition>{children}</PageTransition>
}

