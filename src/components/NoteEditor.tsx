
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tag, X, FileText, Zap, Mic, Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { summarizeText, extractKeywords, transcribeAudio } from '@/services/geminiService';

interface NoteEditorProps {
  initialNote?: {
    id?: string;
    title: string;
    content: string;
    tags: string[];
  };
  onSave: (note: { title: string; content: string; tags: string[] }) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ initialNote, onSave }) => {
  const [title, setTitle] = useState(initialNote?.title || '');
  const [content, setContent] = useState(initialNote?.content || '');
  const [tags, setTags] = useState<string[]>(initialNote?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please add a title for your note",
        variant: "destructive",
      });
      return;
    }

    onSave({ title, content, tags });
    toast({
      title: "Note saved",
      description: "Your note has been saved successfully",
    });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSummarize = async () => {
    if (content.length < 50) {
      toast({
        title: "Text too short",
        description: "Please add more content to summarize",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    toast({
      title: "Summarizing",
      description: "AI is analyzing your note...",
    });

    try {
      const summary = await summarizeText(content);
      setContent(content + '\n\n## Summary\n' + summary);
      toast({
        title: "Summarization complete",
        description: "AI summary has been added to your note",
      });
    } catch (error) {
      toast({
        title: "Summarization failed",
        description: "There was an error generating a summary",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExtractKeywords = async () => {
    if (content.length < 30) {
      toast({
        title: "Text too short",
        description: "Please add more content to extract keywords",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    toast({
      title: "Extracting keywords",
      description: "AI is analyzing your note...",
    });

    try {
      const keywords = await extractKeywords(content);
      setTags([...new Set([...tags, ...keywords])]);
      toast({
        title: "Keywords extracted",
        description: "AI has suggested tags based on your content",
      });
    } catch (error) {
      toast({
        title: "Keyword extraction failed",
        description: "There was an error extracting keywords",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleRecording = async () => {
    if (!isRecording) {
      // Check if browser supports speech recognition
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        toast({
          title: "Speech recognition not supported",
          description: "Your browser doesn't support voice input",
          variant: "destructive",
        });
        return;
      }

      setIsRecording(true);
      toast({
        title: "Voice recording started",
        description: "Start speaking to add content to your note",
      });

      // In a real implementation, we would use the Web Speech API
      // For demonstration, we'll simulate with a timeout and then use the Gemini API
      setTimeout(async () => {
        setIsRecording(false);
        setIsProcessing(true);
        
        try {
          // Simulate transcribed speech
          const simulatedSpeech = "This is simulated voice input text that will be processed by the AI.";
          const processedText = await transcribeAudio(simulatedSpeech);
          
          setContent(content + (content ? '\n\n' : '') + processedText);
          toast({
            title: "Voice recording completed",
            description: "Your speech has been transcribed to text",
          });
        } catch (error) {
          toast({
            title: "Transcription failed",
            description: "There was an error processing your speech",
            variant: "destructive",
          });
        } finally {
          setIsProcessing(false);
        }
      }, 3000);
    } else {
      setIsRecording(false);
      toast({
        title: "Voice recording stopped",
        description: "Recording has been stopped",
      });
    }
  };

  return (
    <div className="space-y-4 w-full max-w-3xl mx-auto">
      <Input
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-lg font-medium"
      />
      
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <div key={tag} className="flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md text-sm">
            <Tag className="h-3 w-3" />
            <span>{tag}</span>
            <button
              onClick={() => removeTag(tag)}
              className="text-indigo-500 hover:text-indigo-700"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        <div className="flex items-center gap-1">
          <Input
            placeholder="Add tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleKeyDown}
            className="text-sm h-8 w-32"
          />
          <Button size="sm" variant="outline" onClick={handleAddTag}>
            Add
          </Button>
        </div>
      </div>
      
      <Textarea
        placeholder="Start writing your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[300px] resize-y"
      />
      
      <div className="flex flex-wrap justify-between gap-2">
        <div className="flex gap-2">
          <Button 
            onClick={handleSummarize} 
            variant="outline" 
            className="flex items-center gap-1"
            disabled={isProcessing || isRecording}
          >
            <FileText className="h-4 w-4" />
            <span>{isProcessing ? "Processing..." : "Summarize"}</span>
          </Button>
          <Button 
            onClick={handleExtractKeywords} 
            variant="outline" 
            className="flex items-center gap-1"
            disabled={isProcessing || isRecording}
          >
            <Zap className="h-4 w-4" />
            <span>{isProcessing ? "Processing..." : "Extract Keywords"}</span>
          </Button>
          <Button 
            onClick={toggleRecording} 
            variant={isRecording ? "destructive" : "outline"} 
            className="flex items-center gap-1"
            disabled={isProcessing && !isRecording}
          >
            <Mic className="h-4 w-4" />
            <span>{isRecording ? "Stop Recording" : isProcessing ? "Processing..." : "Voice Input"}</span>
          </Button>
        </div>
        <Button 
          onClick={handleSave} 
          className="flex items-center gap-1"
          disabled={isProcessing || isRecording}
        >
          <Save className="h-4 w-4" />
          <span>Save Note</span>
        </Button>
      </div>
    </div>
  );
};

export default NoteEditor;
