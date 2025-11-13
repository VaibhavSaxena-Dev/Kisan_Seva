import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { todoApi } from "@/Backend/api/todoApi";
import { SpeechButton } from "@/components/ui/speech-button";
import { Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const TodoList = () => {
  const { t, language } = useLanguage();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: todos = [], isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: todoApi.getAll,
  });

  const addMutation = useMutation({
    mutationFn: ({ title, description }: { title: string; description?: string }) =>
      todoApi.add(title, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast({
        title: t("todoAdded"),
        description: t("todoAddedDesc"),
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: t("error"),
        description: error instanceof Error ? error.message : t("todoAddError"),
      });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: (id: string) => todoApi.toggleComplete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: t("error"),
        description: error instanceof Error ? error.message : t("todoToggleError"),
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => todoApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast({
        title: t("todoDeleted"),
        description: t("todoDeletedDesc"),
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: t("error"),
        description: error instanceof Error ? error.message : t("todoDeleteError"),
      });
    },
  });

  const mapLocale = (lang: string) => {
    switch (lang) {
      case 'hi':
        return 'hi-IN';
      case 'kn':
        return 'kn-IN';
      default:
        return 'en-US';
    }
  };

  const formatDateTime = (date: Date) => {
    try {
      return new Date(date).toLocaleString(mapLocale(language), {
        year: 'numeric', month: 'short', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
      });
    } catch {
      return new Date(date).toLocaleString();
    }
  };

  const handleAdd = () => {
    if (!title.trim()) return;
    addMutation.mutate({ title: title.trim(), description: description.trim() || undefined });
    setTitle("");
    setDescription("");
  };

  const handleVoiceToTitle = (text: string) => {
    setTitle(text);
  };

  const handleVoiceToDescription = (text: string) => {
    setDescription(text);
  };

  const toggleComplete = (id: string) => {
    toggleMutation.mutate(id);
  };

  const removeTodo = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{t('todoList')}</CardTitle>
            <CardDescription>{t('addNewTodo')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder={t('todoTitle')}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                  className="flex-1"
                />
                <SpeechButton onTranscript={handleVoiceToTitle} />
              </div>
              <div className="flex gap-2">
                <Textarea
                  placeholder={t('todoDescription')}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="flex-1"
                  rows={2}
                />
                <SpeechButton onTranscript={handleVoiceToDescription} />
              </div>
              <Button onClick={handleAdd} className="w-full">
                {t('addTodo')}
              </Button>
            </div>

            <div className="space-y-2">
              {todos.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">{t('noTodos')}</p>
              ) : (
                todos.map((todo) => (
                  <Card key={todo.id} className={todo.completed ? "opacity-60" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleComplete(todo.id)}
                          className="mt-1 w-5 h-5 cursor-pointer"
                        />
                        <div className="flex-1">
                          <h3 className={`font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {todo.title}
                          </h3>
                          {todo.description && (
                            <p className={`text-sm text-muted-foreground mt-1 ${todo.completed ? 'line-through' : ''}`}>
                              {todo.description}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2">
                            {formatDateTime(todo.createdAt)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTodo(todo.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TodoList;

