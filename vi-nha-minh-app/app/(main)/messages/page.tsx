"use client";

import MainLayout from '@/components/shared/MainLayout';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// Giữ ResizablePanelGroup cho Desktop nhưng loại bỏ logic ẩn/hiện phức tạp trên Mobile
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'; 
import { Plus, Search, Settings, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

// Giả định MOCK_MESSAGES
const MOCK_MESSAGES = [
    { 
        id: 1, 
        sender: 'Bình Trần (Nhóm)', 
        subject: 'Về khoản nợ tháng 12', 
        snippet: 'Đã hoàn tất 50% số nợ gốc...', 
        time: '5:15 PM', 
        unread: 3, 
        avatar: 'BT',
        messages: [
            { id: 101, content: "Đã chuyển tiền trả nợ tháng này rồi nhé.", time: "4:00 PM", fromMe: true },
            { id: 102, content: "Ok. Tôi đã ghi nhận 500k. Còn 500k nữa.", time: "4:05 PM", fromMe: false },
            { id: 103, content: "Tôi sẽ chuyển nốt vào cuối tuần này. Cảm ơn.", time: "5:15 PM", fromMe: true },
        ]
    },
    { 
        id: 2, 
        sender: 'Hệ thống FinTrack', 
        subject: 'Cảnh báo Ngân sách', 
        snippet: 'Bạn đã đạt 90% ngân sách chi tiêu tháng 12...', 
        time: 'Hôm nay', 
        unread: 1,
        avatar: 'FT',
        messages: [{ id: 201, content: "Bạn đã đạt 90% ngân sách chi tiêu tháng 12, nên cân nhắc các giao dịch tiếp theo.", time: "10:30 AM", fromMe: false }]
    },
    { 
        id: 3, 
        sender: 'Ngân hàng ABC', 
        subject: 'Biến động số dư', 
        snippet: 'Ghi nhận giao dịch -5,000,000 VND...', 
        time: '12/12', 
        unread: 0,
        avatar: 'NA',
        messages: [{ id: 301, content: "Ghi nhận giao dịch -5,000,000 VND vào tài khoản...", time: "9:00 AM", fromMe: false }]
    },
];

type MessageThread = typeof MOCK_MESSAGES[0];
type Message = typeof MOCK_MESSAGES[0]['messages'][0];

// Component Danh sách Tin nhắn (Giữ nguyên logic)
const MessageList = ({ threads, selectedThread, onSelectThread }: { threads: MessageThread[], selectedThread: number | null, onSelectThread: (id: number) => void }) => (
    <ScrollArea className="h-full">
        <div className="flex items-center space-x-2 p-4 border-b">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input 
                placeholder="Tìm kiếm tin nhắn..." 
                className="flex-1 bg-transparent focus:outline-none text-sm"
            />
        </div>
        <nav className="flex flex-col p-2 space-y-1">
            {threads.map((thread) => (
                <div
                    key={thread.id}
                    // Sự kiện click đã hoạt động đúng
                    onClick={() => onSelectThread(thread.id)}
                    className={`flex items-start p-3 rounded-xl cursor-pointer transition-colors 
                                ${selectedThread === thread.id 
                                    ? 'bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800' 
                                    : 'hover:bg-muted/70'
                                }`}
                >
                    <Avatar className="h-10 w-10 mt-1">
                        <AvatarFallback className={`${thread.unread > 0 ? 'bg-indigo-500 text-white' : 'bg-muted-foreground/30'}`}>
                            {thread.avatar}
                        </AvatarFallback>
                    </Avatar>
                    
                    <div className="ml-3 flex-1 overflow-hidden">
                        <div className="flex justify-between items-center">
                            <p className={`font-semibold text-sm truncate ${thread.unread > 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {thread.sender}
                            </p>
                            <span className={`text-xs ${thread.unread > 0 ? 'text-indigo-600 dark:text-indigo-400 font-medium' : 'text-muted-foreground'}`}>
                                {thread.time}
                            </span>
                        </div>
                        <p className="text-sm truncate mt-0.5" title={thread.subject}>
                            {thread.subject}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{thread.snippet}</p>
                    </div>

                    {thread.unread > 0 && (
                        <div className="ml-2 mt-1 flex-shrink-0">
                            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        </div>
                    )}
                </div>
            ))}
        </nav>
    </ScrollArea>
);

// Component Khung Nội dung Tin nhắn
const ConversationPanel = ({ thread, handleBack }: { thread: MessageThread, handleBack: () => void }) => {
    
    // Nút Gửi
    const SendButton = () => (
        <Button 
            size="icon" 
            className="bg-indigo-500 hover:bg-indigo-600 text-white shadow-md rounded-full"
            aria-label="Gửi tin nhắn"
            // Thêm onClick handler giả
            onClick={() => console.log('Tin nhắn đã gửi!')} 
        >
            <ArrowLeft className="w-4 h-4 rotate-180" />
        </Button>
    );

    return (
        <div className="flex flex-col h-full">
            {/* Header Cuộc trò chuyện */}
            <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
                {/* Mobile Back Button - Đã tích hợp vào header */}
                <div className="flex items-center">
                    <Button 
                        variant="ghost" 
                        onClick={handleBack} 
                        size="sm" 
                        className="sm:hidden mr-2" // Chỉ hiển thị trên mobile
                        aria-label="Quay lại hộp thư"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400">
                        {thread.subject}
                    </h2>
                </div>
                
                <Button variant="ghost" size="icon" aria-label="Cài đặt tin nhắn" onClick={() => console.log('Mở cài đặt tin nhắn')}>
                    <Settings className="w-5 h-5" />
                </Button>
            </div>
            
            {/* Khu vực Tin nhắn Cuộn */}
            <ScrollArea className="flex-1 p-6 space-y-4">
                {thread.messages.map((msg: Message) => (
                    <div 
                        key={msg.id} 
                        className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-xs sm:max-w-md p-3 rounded-xl 
                                          ${msg.fromMe 
                                              ? 'bg-indigo-500 text-white rounded-br-none shadow-md' 
                                              : 'bg-muted rounded-tl-none text-foreground shadow-sm'
                                          }`}
                        >
                            <p className="text-sm">{msg.content}</p>
                            <span className={`block text-xs mt-1 ${msg.fromMe ? 'text-indigo-200' : 'text-muted-foreground/80'} text-right`}>
                                {msg.time}
                            </span>
                        </div>
                    </div>
                ))}
            </ScrollArea>

            {/* Khung Soạn thảo */}
            <div className="p-4 border-t bg-muted/30">
                <div className="flex items-end space-x-2">
                    <textarea 
                        rows={1} 
                        placeholder="Nhập tin nhắn..." 
                        className="flex-1 p-3 border rounded-xl resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow dark:bg-background/50"
                    />
                    <SendButton />
                </div>
            </div>
        </div>
    );
};

export default function MessagingPage() {
    const [selectedThreadId, setSelectedThreadId] = useState<number>(MOCK_MESSAGES[0].id);
    const selectedThread = MOCK_MESSAGES.find(t => t.id === selectedThreadId);
    
    // Khởi tạo isConversationVisible là FALSE trên mobile, TRUE trên desktop (sm: true)
    // Để làm điều này một cách sạch sẽ, ta có thể dùng useEffect và window.innerWidth, 
    // nhưng để đơn giản, ta chỉ cần dựa vào logic khi click
    const [isConversationVisible, setIsConversationVisible] = useState(false);

    const handleSelectThread = (id: number) => {
        setSelectedThreadId(id);
        setIsConversationVisible(true); // Kích hoạt hiển thị nội dung tin nhắn trên mobile
    };
    
    const handleBackToInbox = () => {
        setIsConversationVisible(false); // Quay lại danh sách trên mobile
    };

    return (
        <MainLayout>
            <div className="space-y-6">
                <h1 className="text-4xl font-extrabold tracking-tight text-indigo-700 dark:text-indigo-400">
                    <span className='mr-3'>✉️</span> Hộp Thư (Inbox)
                </h1>

                {/* Container Chính */}
                <div className="h-[calc(100vh-200px)] border rounded-xl shadow-2xl overflow-hidden bg-card relative"> 
                    
                    {/* 1. Sidebar Danh sách Tin nhắn - Luôn hiện trên Desktop (sm:block), ẩn nếu Content đang mở trên Mobile */}
                    <div 
                        className={`absolute inset-0 sm:static sm:h-full transition-transform duration-300 ease-in-out
                                    ${isConversationVisible ? 'hidden sm:block' : 'block'}`}
                    >
                        <ResizablePanelGroup direction="horizontal">
                            <ResizablePanel defaultSize={30} minSize={25} maxSize={40} className="sm:block h-full">
                                <MessageList 
                                    threads={MOCK_MESSAGES} 
                                    selectedThread={selectedThreadId} 
                                    onSelectThread={handleSelectThread}
                                />
                            </ResizablePanel>
                            
                            <ResizableHandle className="hidden md:flex" withHandle />
                            
                            {/* 2. Khung Nội dung Tin nhắn - VỊ TRÍ MOBILE NẰM Ở RESIZEABLE PANEL THỨ HAI */}
                            {/* Để ResizablePanelGroup hoạt động, cần 2 panel */}
                            <ResizablePanel defaultSize={70} minSize={60} className="hidden sm:block h-full">
                                {selectedThread ? (
                                    <ConversationPanel thread={selectedThread} handleBack={handleBackToInbox} />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-muted-foreground">
                                        Chọn một tin nhắn để xem nội dung
                                    </div>
                                )}
                            </ResizablePanel>

                        </ResizablePanelGroup>
                    </div>


                    {/* 3. Khung Nội dung Tin nhắn (Mobile Full Screen Overlay) */}
                    {/* Hiển thị tuyệt đối trên Mobile khi isConversationVisible là TRUE */}
                    <div className={`absolute inset-0 bg-card z-10 transition-transform duration-300 ease-in-out
                                      ${isConversationVisible ? 'translate-x-0' : 'translate-x-full'} 
                                      sm:hidden h-full`}
                    >
                        {selectedThread && isConversationVisible ? (
                            <ConversationPanel thread={selectedThread} handleBack={handleBackToInbox} />
                        ) : (
                            <div className="flex h-full items-center justify-center text-muted-foreground">
                                Chọn một tin nhắn để xem nội dung
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Nút Thêm cố định (Giữ nguyên) */}
            <div className="fixed bottom-[100px] right-4 z-[90] md:bottom-4 md:right-6">
                <Button
                    size="lg"
                    className="text-white font-bold rounded-full shadow-2xl shadow-indigo-600/70 dark:shadow-indigo-900/50 h-14 w-14 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition-all duration-300"
                    aria-label="Tạo tin nhắn mới"
                >
                    <Plus className="w-6 h-6" />
                </Button>
            </div>
        </MainLayout>
    );
}