'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Search, Send, MessageSquare } from "lucide-react"

interface Message {
    id: string
    senderId: string
    receiverId: string
    content: string
    timestamp: string
}

interface Conversation {
    id: string
    participantId: string
    participantName: string
    lastMessage: string
    timestamp: string
}

export default function MessagesPage() {
    const [conversations, setConversations] = useState<Conversation[]>([
        { id: '1', participantId: '2', participantName: 'Chidi Okonkwo', lastMessage: 'Thanks for your help!', timestamp: '2023-06-28T10:00:00Z' },
        { id: '2', participantId: '3', participantName: 'Amina Bello', lastMessage: 'When can you start the project?', timestamp: '2023-06-27T15:30:00Z' },
        { id: '3', participantId: '4', participantName: 'Emeka Nwosu', lastMessage: 'The design looks great!', timestamp: '2023-06-26T09:45:00Z' },
    ])

    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState('')

    const handleSelectConversation = (conversation: Conversation) => {
        setSelectedConversation(conversation)
        // In a real app, you would fetch messages for this conversation from an API
        setMessages([
            { id: '1', senderId: '1', receiverId: conversation.participantId, content: 'Hello!', timestamp: '2023-06-28T09:00:00Z' },
            { id: '2', senderId: conversation.participantId, receiverId: '1', content: 'Hi there!', timestamp: '2023-06-28T09:05:00Z' },
            { id: '3', senderId: '1', receiverId: conversation.participantId, content: 'How are you?', timestamp: '2023-06-28T09:10:00Z' },
            { id: '4', senderId: conversation.participantId, receiverId: '1', content: conversation.lastMessage, timestamp: conversation.timestamp },
        ])
    }

    const handleSendMessage = () => {
        if (newMessage.trim() && selectedConversation) {
            const newMsg: Message = {
                id: Date.now().toString(),
                senderId: '1', // Assuming '1' is the current user's ID
                receiverId: selectedConversation.participantId,
                content: newMessage,
                timestamp: new Date().toISOString(),
            }
            setMessages([...messages, newMsg])
            setNewMessage('')

            // Update the conversation list
            const updatedConversations = conversations.map(conv =>
                conv.id === selectedConversation.id
                    ? { ...conv, lastMessage: newMessage, timestamp: newMsg.timestamp }
                    : conv
            )
            setConversations(updatedConversations)
        }
    }

    return (
        <div className="container mx-auto py-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
                <Button variant="outline" size="sm" className="hidden md:flex">
                    <Plus className="h-4 w-4 mr-2" />
                    New Message
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-12rem)]">
                <Card className="md:col-span-1 border-0 shadow-sm">
                    <CardContent className="p-0">
                        <div className="p-4 border-b">
                            <Input 
                                placeholder="Search messages..." 
                                className="bg-gray-50"
                                prefix={<Search className="h-4 w-4 text-gray-400" />}
                            />
                        </div>
                        <ScrollArea className="h-[calc(100vh-16rem)]">
                            {conversations.map((conversation) => (
                                <div
                                    key={conversation.id}
                                    className={`flex items-center space-x-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors
                                        border-l-2 ${selectedConversation?.id === conversation.id 
                                        ? 'border-l-primary bg-gray-50' 
                                        : 'border-l-transparent'}`}
                                    onClick={() => handleSelectConversation(conversation)}
                                >
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src="/placeholder.svg" />
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            {conversation.participantName[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {conversation.participantName}
                                            </p>
                                            <span className="text-xs text-gray-500">
                                                {new Date(conversation.timestamp).toLocaleTimeString([], { 
                                                    hour: '2-digit', 
                                                    minute: '2-digit' 
                                                })}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 truncate">
                                            {conversation.lastMessage}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 border-0 shadow-sm">
                    <CardContent className="p-0">
                        {selectedConversation ? (
                            <div className="h-full flex flex-col">
                                <div className="flex items-center space-x-4 p-4 border-b bg-white">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src="/placeholder.svg" />
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            {selectedConversation.participantName[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h2 className="text-base font-semibold text-gray-900">
                                            {selectedConversation.participantName}
                                        </h2>
                                        <p className="text-sm text-gray-500">Active now</p>
                                    </div>
                                </div>

                                <ScrollArea className="flex-1 p-4 h-[calc(100vh-24rem)]">
                                    <div className="space-y-4">
                                        {messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.senderId === '1' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-[70%] px-4 py-2 rounded-2xl ${message.senderId === '1'
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'bg-gray-100 text-gray-800'}`}
                                                >
                                                    <p className="text-sm">{message.content}</p>
                                                    <p className="text-[10px] mt-1 opacity-70">
                                                        {new Date(message.timestamp).toLocaleTimeString([], { 
                                                            hour: '2-digit', 
                                                            minute: '2-digit' 
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>

                                <div className="p-4 border-t bg-white">
                                    <div className="flex space-x-2">
                                        <Input
                                            placeholder="Type your message..."
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                            className="bg-gray-50"
                                        />
                                        <Button onClick={handleSendMessage}>
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-[calc(100vh-16rem)] flex flex-col items-center justify-center text-gray-500">
                                <MessageSquare className="h-12 w-12 text-gray-300 mb-4" />
                                <p className="text-sm font-medium">Select a conversation to start messaging</p>
                                <p className="text-xs text-gray-400">Your messages will appear here</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

