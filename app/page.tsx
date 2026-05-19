'use client';

import { useState, useRef, useEffect } from 'react';
import { useOrchestrator, AppMessage, AgentLog } from '@/hooks/use-orchestrator';
import { Provider } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, MapPin, Star, Clock, Briefcase, Activity, CheckCircle2, ChevronDown, ChevronRight, Loader2, Wrench, Zap, Info, X, Menu, MessageSquare, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MockMap } from '@/components/mock-map';
import Markdown from 'react-markdown';
import { cn } from "@/lib/utils"
import { Textarea } from '@/components/ui/textarea';

export default function Home() {
  const {
    messages, sendMessage, confirmBooking, isProcessing, autoBooking, setAutoBooking, isConfirmed, confirmedMessageId,
    chatHistory, currentChatId, isSidebarOpen, setIsSidebarOpen, startNewChat, loadChat, deleteChat
  } = useOrchestrator();
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isProcessing) {
      sendMessage(inputText);
      setInputText('');
    }
  };

  useEffect(() => {
    // Auto scroll
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[100dvh] bg-background max-w-2xl mx-auto w-full shadow-2xl relative overflow-hidden font-sans">

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            key={isSidebarOpen ? "shown" : "hidden"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-40 backdrop-blur-[2px]"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Drawer */}
      <div
        className={cn(
          "absolute inset-y-0 left-0 z-50 w-[80%] max-w-[300px] bg-secondary/95 backdrop-blur-md shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col border-r border-border",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 border-b border-border/50 shrink-0 flex items-center justify-between">
          <h2 className="font-bold text-foreground tracking-tight text-lg">Chats</h2>
          <Button variant="ghost" size="icon" aria-label="Close sidebar" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-black/5" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 shrink-0">
          <Button
            onClick={() => { startNewChat(); }}
            className="w-full bg-primary text-primary-foreground rounded-xl shadow-md h-12 flex items-center gap-2 justify-center font-bold hover:bg-primary/90 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5" /> New Chat
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-2 mb-2">
          <div className="space-y-1.5">
            {chatHistory.length === 0 ? (
              <div className="text-center p-4 text-xs text-muted-foreground/60 italic">No previous chats</div>
            ) : (
              chatHistory.map(chat => (
                <div
                  key={chat.id}
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-xl cursor-pointer group transition-all",
                    currentChatId === chat.id
                      ? "bg-primary/10 text-primary font-medium border border-primary/20"
                      : "hover:bg-accent/80 text-foreground/80 border border-transparent"
                  )}
                  onClick={() => loadChat(chat.id)}
                >
                  <MessageSquare className={cn("w-4 h-4 shrink-0 opacity-70", currentChatId === chat.id ? "text-primary" : "")} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{chat.title || 'New Chat'}</p>
                    <p className="text-[10px] opacity-60 truncate mt-0.5">
                      {new Date(chat.updatedAt).toLocaleDateString()} &middot; {new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Delete chat"
                    className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive shrink-0 transition-opacity"
                    onClick={(e) => { e.stopPropagation(); deleteChat(chat.id); }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Header */}
      <header className="bg-primary text-white p-4 flex items-center shadow-md z-10 sticky top-0 shrink-0">
        <button
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open sidebar"
          className="mr-3 p-1.5 -ml-1.5 rounded-full hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Avatar className="h-11 w-11 mr-3 after:border-0 border-2 border-white/30 hidden sm:block">
          <AvatarImage src="/logo.png" />
          <AvatarFallback className="bg-background text-primary font-bold text-xl">K</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="font-bold text-lg leading-tight uppercase tracking-wider font-outfit -mb-0.5">Karkun AI</h1>
          <p className="text-xs opacity-90">Worker Intelligence Engine</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2 bg-black/10 px-2.5 py-1.75 rounded-4xl">
            <span className="text-[9px] uppercase font-bold tracking-wider">
              Auto-booking
            </span>
            <button
              onClick={() => setAutoBooking(!autoBooking)}
              aria-label={autoBooking ? "Disable auto-booking" : "Enable auto-booking"}
              className={`w-7 h-4 rounded-full relative cursor-pointer transition-colors ${autoBooking ? 'bg-white' : 'bg-muted/70'}`}
            >
              <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all ${autoBooking ? 'right-0.75 bg-primary' : 'left-0.75 bg-black/25'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <ScrollArea className="flex-1 min-h-0 p-1 bg-muted relative" ref={scrollRef}>
        {/* Subtle Dots Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: 'radial-gradient(currentColor 0.5px, transparent 0)', backgroundSize: '20px 20px' }} />

        <div className="space-y-6 px-3 pt-2 pb-20 max-w-full">
          {messages.length === 0 && (
            <div className="text-center mt-10 space-y-4">
              <Badge className="bg-background text-muted-foreground shadow-sm px-4 py-2 text-sm font-normal">
                Try asking: &quot;Kal subah G-13 mein AC technician chahiye&quot;
              </Badge>
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  key={autoBooking ? 'shown' : 'hidden'}
                >
                  {autoBooking && (
                    <div className="flex items-start justify-center bg-accent text-accent-foreground/70 border border-primary/20 p-4 rounded-xl text-xs max-w-[80%] mx-auto">
                      <Zap className="w-4 h-4 text-primary mb-1" />
                      Auto-booking is enabled. The system will start a countdown as soon as the best professional is found!
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Agent Action Logs */}
                {msg.role === 'agent' && msg.logs && msg.logs.length > 0 && (
                  <div className="w-[85%] mb-2 space-y-2">
                    {msg.logs.map((log) => (
                      <AgentLogCard key={log.id} log={log} />
                    ))}
                  </div>
                )}

                {/* Main Message Bubble */}
                {msg.content && (
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl shadow-sm text-sm border ${msg.role === 'user'
                      ? 'bg-accent text-accent-foreground/80 border-primary/10 rounded-tr-none'
                      : 'bg-primary-foreground text-accent-foreground/70 rounded-tl-none border-accent/30'
                      }`}
                  >
                    <div className="markdown-body">
                      <Markdown>{msg.content}</Markdown>
                    </div>
                  </div>
                )}

                {/* Provider Presentation (Ranking + Main + Alternatives + Map) */}
                {msg.providerCard && (
                  <div className="w-[85%] space-y-3 mt-3">
                    {/* Main Provider */}
                    <ProviderCard
                      provider={msg.providerCard}
                      onConfirm={() => confirmBooking(msg.providerCard!, msg.id)}
                      isProcessing={isProcessing}
                      autoBooking={autoBooking && msg.id === messages[messages.length - 1].id} // Only show timer on last msg
                      isConfirmed={confirmedMessageId === msg.id}
                    />

                    {/* Mock Map */}
                    <MockMap className="h-28 shadow-sm" isConfirmed={confirmedMessageId === msg.id} />

                    {/* Alternatives Collapsible */}
                    {msg.alternatives && msg.alternatives.length > 0 && (
                      <AlternativesCollapse
                        alternatives={msg.alternatives}
                        onConfirm={(p) => confirmBooking(p, msg.id)}
                        isProcessing={isProcessing}
                        isConfirmed={confirmedMessageId === msg.id}
                      />
                    )}
                  </div>
                )}

                {/* Booking Receipt */}
                {msg.isSimulatedBookingReceipt && (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-2 w-full flex flex-col items-start gap-2"
                  >
                    <Badge className="bg-primary text-white px-3 py-1 text-sm border-none shadow-md z-10 -mb-4 ms-1">
                      <CheckCircle2 className="w-4 h-4 mr-2" /> Booking Confirmed
                    </Badge>
                    <Card className="bg-accent border-primary/20 p-3 rounded-xl w-[85%] shadow-inner">
                      <p className="text-[11px] text-accent-foreground font-medium">The karkun is now notified. Please wait for a call from our dispatch team to coordinate the exact timing.</p>
                    </Card>
                  </motion.div>
                )}

                {msg.role === 'agent' && isProcessing && msg.id === messages[messages.length - 1].id && !msg.content && (
                  <div className="mt-2 text-xs text-accent-foreground/60 font-mono flex items-center flex-row">
                    <Loader2 className="w-3 h-3 mr-2 animate-spin" /> Orchestrating Multi-Agent flow...
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="bg-secondary p-3 w-full shrink-0 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-20 sticky bottom-0">
        <form onSubmit={handleSend} className="flex items-end gap-2 relative max-w-full">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
              if (e.key === 'Enter' && !isMobile) {
                if (!e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }
            }}
            disabled={isProcessing}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 min-h-12 max-h-32 rounded-2xl text-foreground scrollbar-hide shadow-sm px-4 py-3 resize-none text-sm overflow-y-auto"
          />
          <Button
            type="submit"
            aria-label="Send message"
            disabled={!inputText.trim() || isProcessing}
            className="rounded-full w-12 h-12 bg-primary hover:bg-primary/80 shadow-sm flex items-center justify-center shrink-0 p-0"
          >
            <Send className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}


// --- Subcomponents ---

function AgentLogCard({ log }: { log: AgentLog }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className={cn(
      "py-1 ring-accent-foreground/5 bg-background backdrop-blur-sm gap-0 shadow-sm w-full overflow-hidden transition-all text-left group",
      expanded && log.details && "pb-0"
    )}>
      <div
        className="px-3 py-2 flex items-center justify-between cursor-pointer hover:bg-muted"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2 overflow-hidden flex-1">
          {log.status === 'executing' ? (
            <Activity className="w-3.5 h-3.5 text-blue-500 animate-pulse shrink-0" />
          ) : (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          )}
          <span className="text-[11px] font-semibold text-accent-foreground/80 truncate">{log.agentName}</span>
          <span className="-ms-0.5 text-[11px] text-accent-foreground/60 truncate">– {log.message}</span>
        </div>

        {log.details && (
          <div className="shrink-0 p-1">
            {expanded ? <ChevronDown className="w-3 h-3 text-accent-foreground/40" /> : <ChevronRight className="w-3 h-3 text-accent-foreground/40" />}
          </div>
        )}
      </div>

      {/* Expanded details (JSON trace etc) */}
      <AnimatePresence>
        {expanded && log.details && (
          <motion.div
            key={log.id}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-1 border-t border-border bg-accent-foreground/10 text-accent-foreground/50 font-mono text-[9px] whitespace-pre-wrap rounded-b-lg">
              {log.details}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function ProviderCard({ provider, onConfirm, isProcessing, autoBooking, isConfirmed }: { provider: Provider, onConfirm: () => void, isProcessing: boolean, autoBooking?: boolean, isConfirmed?: boolean }) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [cancelled, setCancelled] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoBooking && !isProcessing && !cancelled && !isConfirmed) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            onConfirm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [autoBooking, isProcessing, cancelled, onConfirm, isConfirmed]);

  const handleCancel = () => {
    setCancelled(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const progress = (timeLeft / 60) * 100;
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <Card className={cn("w-full pb-0 border border-primary/60 shadow-md bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden text-left relative overflow-hidden transition-all duration-500", isConfirmed && "ring-2 ring-primary", (timeLeft === 0 && autoBooking && !cancelled) && "opacity-50 pointer-events-none")}>
      <div className={cn("absolute inset-0 z-0 w-full h-full rounded-[inherit] bg-primary/5", isConfirmed && "bg-primary/25")} />
      <CardContent className="p-4 z-1">
        <div className="flex items-start gap-4">
          <Avatar className="w-14 h-14 border-2 border-primary/10 bg-accent/40">
            <AvatarImage src={provider?.image} />
            <AvatarFallback className="bg-accent/0"><Wrench className="w-6 h-6 text-accent-foreground/40" /></AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-foreground text-base leading-tight truncate">{provider?.name}</h3>
              {isConfirmed && <CheckCircle2 className="w-4 h-4 text-primary" />}
            </div>
            <p className="text-primary text-xs font-semibold mt-0.5">{provider?.service}</p>
            <div className="flex items-center gap-1 mt-1.5 text-muted-foreground text-xs">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span className="font-medium text-foreground">{provider?.rating}</span>
              <span>({provider?.reviews} reviews)</span>
            </div>
          </div>

          {autoBooking && !cancelled && timeLeft > 0 && !isConfirmed && (
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="20" cy="20" r={radius} stroke="currentColor" strokeWidth="3" fill="transparent" className="text-muted/30" />
                <circle
                  cx="20" cy="20" r={radius} stroke="currentColor" strokeWidth="3" fill="transparent"
                  className="text-primary transition-all duration-1000 ease-linear"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
              </svg>
              <span className="absolute text-[10px] font-bold text-primary">{timeLeft}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
          <div className="flex items-center gap-1.5 text-accent-foreground/60">
            <MapPin className="w-3.5 h-3.5 text-accent-foreground/40 shrink-0" />
            <span className="truncate">{provider?.distance} km away</span>
          </div>
          <div className="flex items-center gap-1.5 text-accent-foreground/60">
            <Briefcase className="w-3.5 h-3.5 text-accent-foreground/40 shrink-0" />
            <span className="truncate">~PKR {provider?.baseRate.toLocaleString()}</span>
          </div>
        </div>

        {isConfirmed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Button
              disabled
              className="w-full mt-4 bg-primary text-primary-foreground rounded-xl shadow-md h-12 flex flex-col items-center gap-0 pointer-events-none disabled:opacity-100"
            >
              <span className="font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Booking Successful
              </span>
              <span className="text-[10px] opacity-70 font-normal">Provider Successfully Assigned</span>
            </Button>
          </motion.div>
        ) : (
          <>
            {autoBooking && !cancelled && timeLeft > 0 ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col gap-2 mt-4"
              >
                <div className="text-[10px] text-center font-semibold text-primary uppercase tracking-widest animate-pulse">
                  System Orchestrating Booking...
                </div>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="w-full h-auto py-2 border-rose-400 bg-rose-100 active:scale-95 transition-transform flex flex-col items-center gap-0 group"
                >
                  <span className="text-rose-600 font-bold text-sm group-hover:scale-105 transition-transform">Cancel Auto-Booking</span>
                  <span className="text-[9px] text-rose-400 font-normal italic tracking-tight">Main khud karu ga</span>
                </Button>
              </motion.div>
            ) : (
              <Button
                onClick={onConfirm}
                disabled={isProcessing}
                className="w-full mt-4 bg-primary hover:bg-primary/80 active:scale-95 transition-transform text-white rounded-xl shadow-md h-13 flex flex-col items-center gap-0"
              >
                <span className="font-bold">Book this Karkun</span>
                <span className="text-[10px] opacity-70 font-normal">Notify {provider?.name}</span>
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

function AlternativesCollapse({ alternatives, onConfirm, isProcessing, isConfirmed }: { alternatives: Provider[], onConfirm: (p: Provider) => void, isProcessing: boolean, isConfirmed?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  if (isConfirmed) return null;

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 pl-1 text-accent-foreground/40 hover:text-accent-foreground/60 transition-colors"
      >
        <p className="text-[10px] font-bold uppercase tracking-widest">Alternative Options</p>
        {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
          >
            {alternatives.map(alt => (
              <Card key={alt.id} className="min-w-[180px] shrink-0 p-3 rounded-xl shadow-sm border-accent-foreground/30 bg-background/80">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="w-8 h-8 opacity-80">
                    <AvatarImage src={alt.image} />
                    <AvatarFallback>{alt.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate text-accent-foreground/70">{alt.name}</p>
                    <p className="text-[10px] text-accent-foreground/50 truncate">{alt.service}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onConfirm(alt)}
                  disabled={isProcessing}
                  className="w-full text-[10px] h-7 rounded-lg border-accent-foreground/40 text-accent-foreground/60"
                >
                  Switch to this Professional
                </Button>
              </Card>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
