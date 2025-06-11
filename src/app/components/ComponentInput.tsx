import React, { useState } from 'react';
import { TextBIcon, TextItalicIcon, SmileyIcon, AtIcon } from '@phosphor-icons/react';

interface CommentInputProps {
  onPost: (comment: string) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ onPost }) => {
  const [comment, setComment] = useState('');

  const handlePost = () => {
    if (comment.trim()) {
      onPost(comment);
      setComment('');
    }
  };

  return (
    <div className="bg-[var(--breu)] p-4 shadow-md border border-[var(--calcario)] rounded-[5px] w-full">
      <textarea
        className="w-full text-[var(--calcario)] placeholder-neutral-400 p-3 rounded-md resize-y min-h-[100px] focus:outline-none "
        placeholder="Deixe seu comentário (se tiver coragem)..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="flex items-center justify-between mt-3">
        <div className="flex space-x-4 text-neutral-400">
          <button className="hover:text-white transition-colors duration-200" title="Negrito">
            <TextBIcon size={24} />
          </button>
          <button className="hover:text-white transition-colors duration-200" title="Itálico">
            <TextItalicIcon size={24} />
          </button>
          <button className="hover:text-white transition-colors duration-200" title="Adicionar Emoji">
            <SmileyIcon size={24} />
          </button>
          <button className="hover:text-white transition-colors duration-200" title="Mencionar">
            <AtIcon size={24} />
          </button>
        </div>
        <button
          className="bg-[var(--breu)] hover:bg-[var(--absinto)] text-[var(--calcario)] hover:text-[var(--breu)] border border-[var(--calcario)] hover:border-transparent text-sm py-1 px-6 rounded-[3px] hover:shadow-[var(--glow)] transition-colors duration-200"
          onClick={handlePost}
          disabled={!comment.trim()}
        >
          Postar
        </button>
      </div>
    </div>
  );
};

export default CommentInput;