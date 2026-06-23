'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Code,
  Laptop,
  Database,
  Layers,
  Zap,
  Sparkles,
  Activity,
  Gamepad2,
  Server,
  Brain,
  Cpu,
  Network,
  Plus,
  Edit,
  Trash2,
  RotateCcw,
  Save,
  X,
} from 'lucide-react';
import {
  getSkills,
  saveSkills,
  resetSkills,
  newSkill,
  ICON_OPTIONS,
  COLOR_OPTIONS,
} from '@/lib/skills-store';

const iconMap = {
  Code,
  Laptop,
  Database,
  Layers,
  Zap,
  Sparkles,
  Activity,
  Gamepad2,
  Server,
  Brain,
  Cpu,
  Network,
};

export default function ManageSkillsPage() {
  const [skills, setSkills] = useState([]);
  const [editing, setEditing] = useState(null); // skill being edited or null
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setSkills(getSkills());
  }, []);

  const persist = (next) => {
    setSkills(next);
    saveSkills(next);
  };

  const startAdd = () => {
    setEditing(newSkill());
    setShowForm(true);
  };

  const startEdit = (skill) => {
    setEditing({ ...skill });
    setShowForm(true);
  };

  const cancelForm = () => {
    setEditing(null);
    setShowForm(false);
  };

  const saveForm = (e) => {
    e?.preventDefault?.();
    if (!editing) return;
    if (!editing.name?.trim()) {
      alert('Skill name is required');
      return;
    }
    const exists = skills.some((s) => s.id === editing.id);
    const next = exists
      ? skills.map((s) => (s.id === editing.id ? editing : s))
      : [...skills, editing];
    persist(next);
    cancelForm();
  };

  const remove = (id) => {
    if (!confirm('Delete this skill?')) return;
    persist(skills.filter((s) => s.id !== id));
  };

  const reset = () => {
    if (!confirm('Reset skills to defaults? This will discard your changes.'))
      return;
    resetSkills();
    setSkills(getSkills());
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-800 dark:text-blue-400">
          Manage Skills
        </h1>
        <div className="flex gap-2">
          <Button
            onClick={reset}
            variant="outline"
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Reset to defaults
          </Button>
          <Button onClick={startAdd} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4" /> Add Skill
          </Button>
        </div>
      </div>

      {/* Form */}
      {showForm && editing && (
        <Card className="mb-8 border-2 border-blue-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl">
          <CardContent className="pt-6">
            <form onSubmit={saveForm} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editing.name}
                    onChange={(e) =>
                      setEditing({ ...editing, name: e.target.value })
                    }
                    placeholder="e.g. React"
                    required
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="icon">Icon</Label>
                  <select
                    id="icon"
                    value={editing.icon}
                    onChange={(e) =>
                      setEditing({ ...editing, icon: e.target.value })
                    }
                    className="w-full h-10 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 text-sm"
                  >
                    {ICON_OPTIONS.map((ic) => (
                      <option key={ic} value={ic}>
                        {ic}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <select
                    id="color"
                    value={editing.color}
                    onChange={(e) =>
                      setEditing({ ...editing, color: e.target.value })
                    }
                    className="w-full h-10 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 text-sm"
                  >
                    {COLOR_OPTIONS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preview */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Preview:
                </span>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${editing.color} flex items-center justify-center shadow-lg`}
                >
                  {(() => {
                    const Icon = iconMap[editing.icon] || Code;
                    return <Icon className="w-6 h-6 text-white" />;
                  })()}
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {editing.name || 'Skill name'}
                </span>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={cancelForm}
                  className="gap-2"
                >
                  <X className="w-4 h-4" /> Cancel
                </Button>
                <Button type="submit" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                  <Save className="w-4 h-4" /> Save
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* List */}
      {skills.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4 animate-bounce">✨</div>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            No skills yet. Click <span className="font-semibold">Add Skill</span> to create one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => {
            const Icon = iconMap[skill.icon] || Code;
            return (
              <Card
                key={skill.id}
                className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                          {skill.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {skill.icon}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEdit(skill)}
                        className="bg-blue-600 hover:bg-blue-700 text-white border-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => remove(skill.id)}
                        className="bg-red-600 hover:bg-red-700 border-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <p className="text-xs text-slate-500 dark:text-slate-400 mt-8 text-center">
        Skills are persisted in your browser (localStorage). They will appear on the About page automatically.
      </p>
    </div>
  );
}
