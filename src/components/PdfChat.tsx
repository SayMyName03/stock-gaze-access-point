
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Send, FileText } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PdfChatProps {
  pdfContent: string;
  fileName: string | null;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const PdfChat: React.FC<PdfChatProps> = ({ pdfContent, fileName }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `I've analyzed your PDF "${fileName}". What would you like to know about it?`
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      role: 'user',
      content: userInput,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call the Gemini API with the PDF content
      const response = await mockGeminiResponse(userInput, pdfContent);
      
      // Add assistant response to chat
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response,
      }]);
    } catch (error) {
      console.error('Error communicating with Gemini API:', error);
      toast({
        title: 'Error processing your request',
        description: 'There was a problem getting a response from our AI service.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // This is a mock function to simulate the Gemini API response
  // In a real implementation, you would call the actual Gemini API
  const mockGeminiResponse = async (question: string, pdfContent: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple mock response - in a real app, this would be the Gemini API response
        resolve(`This is a simulated response to your question about the PDF. In a real implementation, the Gemini API would analyze the content and provide a relevant answer based on the document contents.`);
      }, 1500);
    });
  };

  return (
    <div className="flex flex-col h-[60vh]">
      <div className="flex items-center gap-2 p-3 bg-indigo-50 rounded-t-md">
        <FileText className="h-5 w-5 text-indigo-600" />
        <span className="font-medium text-indigo-800 truncate">{fileName || 'Uploaded PDF'}</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white border border-indigo-100 rounded-b-md">
        {messages.map((message, index) => (
          <Card key={index} className={`${
            message.role === 'user' 
              ? 'bg-indigo-100 ml-8' 
              : 'bg-gray-100 mr-8'
          }`}>
            <CardContent className="p-3">
              <p className="text-sm">{message.content}</p>
            </CardContent>
          </Card>
        ))}
        
        {isLoading && (
          <div className="flex justify-center">
            <span className="text-sm text-gray-500">AI is analyzing your question...</span>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <Textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask a question about your PDF..."
          className="flex-1 resize-none"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !userInput.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default PdfChat;
