
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, File } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PdfUploaderProps {
  onPdfUpload: (content: string, fileName: string) => void;
}

const PdfUploader: React.FC<PdfUploaderProps> = ({ onPdfUpload }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Read the file as text (in a real app, you'd use a PDF parsing library)
      const fileContent = await readFileAsText(file);
      
      // Pass the content and file name back to the parent component
      onPdfUpload(fileContent, file.name);
      
      toast({
        title: "PDF uploaded successfully",
        description: `${file.name} is ready for analysis`,
      });
    } catch (error) {
      console.error("Error processing PDF:", error);
      toast({
        title: "Error processing PDF",
        description: "There was a problem reading your file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to read file as text (simplified approach)
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  return (
    <div className="flex flex-col items-center p-6 border-2 border-dashed border-indigo-200 rounded-lg bg-indigo-50">
      <File className="h-12 w-12 text-indigo-400 mb-4" />
      <h3 className="text-lg font-medium mb-2">Upload your PDF document</h3>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Drag and drop your file here or click the button below
      </p>
      
      <label htmlFor="pdf-upload">
        <input
          id="pdf-upload"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
          disabled={isLoading}
        />
        <Button
          className="bg-indigo-600 hover:bg-indigo-700"
          disabled={isLoading}
          onClick={() => document.getElementById('pdf-upload')?.click()}
        >
          <Upload className="mr-2 h-4 w-4" />
          {isLoading ? "Processing..." : "Select PDF"}
        </Button>
      </label>
    </div>
  );
};

export default PdfUploader;
