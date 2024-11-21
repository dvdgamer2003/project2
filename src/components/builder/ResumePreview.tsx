import { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import MinimalTemplate from '../templates/MinimalTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';

const templates = [
  { id: 'minimal', name: 'Minimal', component: MinimalTemplate },
  { id: 'modern', name: 'Modern', component: ModernTemplate },
  { id: 'creative', name: 'Creative', component: CreativeTemplate },
];

export default function ResumePreview() {
  const { resume } = useResumeStore();
  const [selectedTemplate, setSelectedTemplate] = useState('minimal');

  const TemplateComponent = templates.find(t => t.id === selectedTemplate)?.component || MinimalTemplate;

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-center space-x-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTemplate === template.id
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {template.name}
          </button>
        ))}
      </div>
      <TemplateComponent resume={resume} />
    </div>
  );
}