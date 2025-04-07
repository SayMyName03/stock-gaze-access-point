
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from 'lucide-react';
import NotesList from './NotesList';
import NoteEditor from './NoteEditor';
import { useToast } from "@/components/ui/use-toast";

// Sample initial data for demonstration
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

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
}

const NoteDashboard = () => {
  const [notes, setNotes] = useState<Note[]>(sampleNotes);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const { toast } = useToast();

  // Filter notes whenever search query or notes change
  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = notes.filter(note => 
        note.title.toLowerCase().includes(lowercasedQuery) || 
        note.content.toLowerCase().includes(lowercasedQuery) || 
        note.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery))
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes);
    }
  }, [searchQuery, notes]);

  const handleCreateNote = () => {
    setCurrentNote(null);
    setIsEditing(true);
  };

  const handleEditNote = (noteId: string) => {
    const noteToEdit = notes.find(note => note.id === noteId);
    if (noteToEdit) {
      setCurrentNote(noteToEdit);
      setIsEditing(true);
    }
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    toast({
      title: "Note deleted",
      description: "Your note has been deleted successfully",
    });
  };

  const handleSaveNote = (noteData: { title: string; content: string; tags: string[] }) => {
    if (currentNote) {
      // Update existing note
      setNotes(notes.map(note => 
        note.id === currentNote.id 
          ? { ...note, ...noteData, updatedAt: new Date().toISOString() } 
          : note
      ));
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        ...noteData,
        createdAt: new Date().toISOString()
      };
      setNotes([newNote, ...notes]);
    }
    
    // Exit edit mode
    setIsEditing(false);
    setCurrentNote(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentNote(null);
  };

  return (
    <div className="container mx-auto p-4">
      {isEditing ? (
        <div>
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold text-indigo-700">
              {currentNote ? 'Edit Note' : 'Create New Note'}
            </h2>
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
          </div>
          <NoteEditor 
            initialNote={currentNote || undefined}
            onSave={handleSaveNote}
          />
        </div>
      ) : (
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h1 className="text-2xl font-bold text-indigo-700">My Notes</h1>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search notes..." 
                  className="pl-8" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={handleCreateNote} className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>New Note</span>
              </Button>
            </div>
          </div>

          <NotesList 
            notes={filteredNotes}
            onEditNote={handleEditNote}
            onDeleteNote={handleDeleteNote}
          />
        </div>
      )}
    </div>
  );
};

export default NoteDashboard;
