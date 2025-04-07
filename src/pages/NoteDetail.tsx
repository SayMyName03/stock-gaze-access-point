
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from '@/components/AppSidebar';
import NoteEditor from '@/components/NoteEditor';
import { ArrowLeft } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import FloatingElements from '@/components/FloatingElements';

// This would come from your data store in a real app
const sampleNotes = [
  {
    id: '1',
    title: 'Welcome to NoteMate',
    content: 'This is your AI-powered note-taking app. Create, edit, and organize your notes with AI assistance.\n\nFeatures include:\n- Text summarization\n- Keyword extraction\n- Voice input\n- Organization with tags',
    tags: ['welcome', 'getting-started'],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Meeting Notes Template',
    content: 'Agenda:\n1. Project updates\n2. Timeline review\n3. Budget discussion\n4. Action items\n\nAttendees:\n- John Doe\n- Jane Smith',
    tags: ['meeting', 'template'],
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  }
];

const NoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [note, setNote] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchNote = () => {
      setIsLoading(true);
      setTimeout(() => {
        const foundNote = sampleNotes.find(n => n.id === id);
        if (foundNote) {
          setNote(foundNote);
        }
        setIsLoading(false);
      }, 500);
    };

    fetchNote();
  }, [id]);

  const handleSave = (noteData: { title: string; content: string; tags: string[] }) => {
    // In a real app, this would save to your backend
    setNote({ ...note, ...noteData });
    toast({
      title: "Note updated",
      description: "Your changes have been saved successfully",
    });
    
    // Navigate back to the notes list
    navigate('/');
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-gradient-to-br from-indigo-50 to-gray-100">
          <div className="relative p-4 md:p-6">
            <div className="absolute top-4 left-4">
              <SidebarTrigger />
            </div>
            
            <FloatingElements />
            
            <div className="w-full z-10 relative pt-10">
              <div className="container mx-auto">
                <Button 
                  variant="ghost" 
                  onClick={handleGoBack} 
                  className="mb-4 flex items-center gap-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Notes</span>
                </Button>
                
                {isLoading ? (
                  <Card className="p-8 text-center">
                    <p>Loading note...</p>
                  </Card>
                ) : note ? (
                  <div>
                    <h1 className="text-2xl font-bold text-indigo-700 mb-6">Edit Note</h1>
                    <NoteEditor 
                      initialNote={note}
                      onSave={handleSave}
                    />
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <p>Note not found</p>
                    <Button 
                      onClick={handleGoBack} 
                      className="mt-4"
                    >
                      Go back to Notes
                    </Button>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default NoteDetail;
