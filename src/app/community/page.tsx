'use client'

import { useState } from 'react'
import { CommunityPost } from "@/components/community-post"
import { CreatePostForm } from "@/components/create-post-form"

interface Post {
  id: string
  author: string
  content: string
  timestamp: string
  likes: number
  comments: {
    id: string
    author: string
    content: string
    timestamp: string
  }[]
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Chidi Okonkwo',
      content: 'Just completed a great web development project! Anyone else working on exciting tech projects?',
      timestamp: '2023-06-28T10:00:00Z',
      likes: 15,
      comments: [
        {
          id: '1',
          author: 'Amina Bello',
          content: "Congratulations! I'm working on a mobile app for local businesses.",
          timestamp: '2023-06-28T10:30:00Z',
        },
      ],
    },
    {
      id: '2',
      author: 'Oluwaseun Adebayo',
      content: 'Looking for tips on effective time management for freelancers. Any suggestions?',
      timestamp: '2023-06-28T09:00:00Z',
      likes: 8,
      comments: [],
    },
  ])

  const handlePostCreated = (newPost: { content: string }) => {
    const post: Post = {
      id: Date.now().toString(),
      author: 'Current User', // This should be replaced with the actual logged-in user
      content: newPost.content,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
    }
    setPosts([post, ...posts])
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Community</h1>
      <CreatePostForm onPostCreated={handlePostCreated} />
      <div className="space-y-6">
        {posts.map((post) => (
          <CommunityPost key={post.id} {...post} />
        ))}
      </div>
    </div>
  )
}

