
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag, Trash, Edit, FileText } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
}

interface NotesListProps {
  notes: Note[];
  onEditNote: (noteId: string) => void;
  onDeleteNote: (noteId: string) => void;
}

const NotesList: React.FC<NotesListProps> = ({ notes, onEditNote, onDeleteNote }) => {
  // Function to truncate content for preview
  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  // If there are no notes, show a message
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <FileText className="h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-600">No notes yet</h3>
        <p className="text-gray-500 mt-2">Create your first note to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <Card key={note.id} className="flex flex-col hover:shadow-md transition-shadow duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-indigo-700 line-clamp-1">{note.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow pb-2">
            <p className="text-gray-600 text-sm line-clamp-4">
              {truncateContent(note.content)}
            </p>
            <div className="flex flex-wrap gap-1 mt-3">
              {note.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs bg-indigo-50 text-indigo-600">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2 border-t text-xs text-gray-500">
            <span>{new Date(note.createdAt).toLocaleDateString()}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => onEditNote(note.id)} className="h-7 w-7">
                <Edit className="h-3 w-3" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="outline" size="icon" onClick={() => onDeleteNote(note.id)} className="h-7 w-7 text-red-500 hover:text-red-600">
                <Trash className="h-3 w-3" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default NotesList;
