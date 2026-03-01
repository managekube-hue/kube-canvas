import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
}

interface MentionInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (mentions: string[]) => void;
  placeholder?: string;
}

export function MentionInput({ value, onChange, onSubmit, placeholder }: MentionInputProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mentionSearch, setMentionSearch] = useState("");
  const [cursorPos, setCursorPos] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data } = await supabase.from("crm_users").select("id, first_name, last_name, email").eq("is_active", true);
    if (data) setUsers(data as User[]);
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newValue = e.target.value;
    const pos = e.target.selectionStart;
    onChange(newValue);
    setCursorPos(pos);

    const textBeforeCursor = newValue.slice(0, pos);
    const lastAtIndex = textBeforeCursor.lastIndexOf("@");
    
    if (lastAtIndex !== -1 && lastAtIndex === pos - 1) {
      setShowSuggestions(true);
      setMentionSearch("");
    } else if (lastAtIndex !== -1) {
      const search = textBeforeCursor.slice(lastAtIndex + 1);
      if (!/\s/.test(search)) {
        setShowSuggestions(true);
        setMentionSearch(search);
      } else {
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
    }
  }

  function insertMention(user: User) {
    const textBeforeCursor = value.slice(0, cursorPos);
    const textAfterCursor = value.slice(cursorPos);
    const lastAtIndex = textBeforeCursor.lastIndexOf("@");
    
    const mention = `@${user.first_name} ${user.last_name}`;
    const newValue = textBeforeCursor.slice(0, lastAtIndex) + mention + " " + textAfterCursor;
    
    onChange(newValue);
    setShowSuggestions(false);
  }

  function extractMentions(): string[] {
    const mentionRegex = /@(\w+\s\w+)/g;
    const matches = value.match(mentionRegex);
    return matches ? matches.map(m => m.slice(1)) : [];
  }

  function handleSubmit() {
    const mentions = extractMentions();
    onSubmit(mentions);
  }

  const filteredUsers = users.filter(u => {
    const name = `${u.first_name} ${u.last_name}`.toLowerCase();
    return name.includes(mentionSearch.toLowerCase());
  });

  return (
    <div className="relative">
      <Textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder || "Type @ to mention someone..."}
        rows={3}
      />
      
      {showSuggestions && filteredUsers.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-card border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
          {filteredUsers.slice(0, 5).map(user => (
            <button
              key={user.id}
              onClick={() => insertMention(user)}
              className="w-full text-left px-3 py-2 hover:bg-muted transition-colors"
            >
              <p className="text-sm font-medium text-foreground">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </button>
          ))}
        </div>
      )}
      
      <Button onClick={handleSubmit} size="sm" className="mt-2">
        <Send className="h-3.5 w-3.5 mr-1" /> Send
      </Button>
    </div>
  );
}
