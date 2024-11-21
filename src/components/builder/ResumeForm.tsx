import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2, Save, Wand2 } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';
import type { Resume } from '../../types/resume';
import toast from 'react-hot-toast';
import { generateATSDescription } from '../../lib/openai';
import { useState } from 'react';

export default function ResumeForm() {
  const { resume, updateResume } = useResumeStore();
  const { register, control, handleSubmit, setValue, watch } = useForm<Resume>({
    defaultValues: resume,
  });
  const [optimizing, setOptimizing] = useState(false);

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: 'education',
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: 'experience',
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: 'skills',
  });

  const onSubmit = (data: Resume) => {
    updateResume(data);
    toast.success('Resume updated successfully!');
  };

  const handleOptimizeDescription = async (index: number) => {
    const description = watch(`experience.${index}.description`);
    if (!description) return;

    setOptimizing(true);
    try {
      const optimizedDescription = await generateATSDescription(description);
      setValue(`experience.${index}.description`, optimizedDescription);
      toast.success('Description optimized for ATS!');
    } catch (error) {
      toast.error('Failed to optimize description');
    } finally {
      setOptimizing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            {...register('personalInfo.fullName')}
            placeholder="Full Name"
            className="input"
          />
          <input
            {...register('personalInfo.email')}
            type="email"
            placeholder="Email"
            className="input"
          />
          <input
            {...register('personalInfo.phone')}
            placeholder="Phone"
            className="input"
          />
          <input
            {...register('personalInfo.location')}
            placeholder="Location"
            className="input"
          />
          <input
            {...register('personalInfo.title')}
            placeholder="Professional Title"
            className="input md:col-span-2"
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Professional Summary</h2>
        <textarea
          {...register('summary')}
          placeholder="Write a brief summary of your professional background..."
          className="input h-32"
        />
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Experience</h2>
          <button
            type="button"
            onClick={() =>
              appendExperience({
                company: '',
                position: '',
                location: '',
                startDate: '',
                endDate: '',
                description: '',
              })
            }
            className="btn btn-secondary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </button>
        </div>
        <div className="space-y-4">
          {experienceFields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between">
                <h3 className="font-medium">Experience #{index + 1}</h3>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleOptimizeDescription(index)}
                    className="text-purple-600 hover:text-purple-700"
                    disabled={optimizing}
                  >
                    <Wand2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  {...register(`experience.${index}.company`)}
                  placeholder="Company"
                  className="input"
                />
                <input
                  {...register(`experience.${index}.position`)}
                  placeholder="Position"
                  className="input"
                />
                <input
                  {...register(`experience.${index}.location`)}
                  placeholder="Location"
                  className="input"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    {...register(`experience.${index}.startDate`)}
                    placeholder="Start Date"
                    type="month"
                    className="input"
                  />
                  <input
                    {...register(`experience.${index}.endDate`)}
                    placeholder="End Date"
                    type="month"
                    className="input"
                  />
                </div>
                <textarea
                  {...register(`experience.${index}.description`)}
                  placeholder="Description (Use bullet points for better ATS optimization)"
                  className="input h-32 md:col-span-2"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Education</h2>
          <button
            type="button"
            onClick={() =>
              appendEducation({
                school: '',
                degree: '',
                field: '',
                startDate: '',
                endDate: '',
              })
            }
            className="btn btn-secondary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </button>
        </div>
        <div className="space-y-4">
          {educationFields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between">
                <h3 className="font-medium">Education #{index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  {...register(`education.${index}.school`)}
                  placeholder="School"
                  className="input"
                />
                <input
                  {...register(`education.${index}.degree`)}
                  placeholder="Degree"
                  className="input"
                />
                <input
                  {...register(`education.${index}.field`)}
                  placeholder="Field of Study"
                  className="input"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    {...register(`education.${index}.startDate`)}
                    placeholder="Start Date"
                    type="month"
                    className="input"
                  />
                  <input
                    {...register(`education.${index}.endDate`)}
                    placeholder="End Date"
                    type="month"
                    className="input"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Skills</h2>
          <button
            type="button"
            onClick={() => appendSkill('')}
            className="btn btn-secondary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skillFields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center bg-gray-100 rounded-full pl-3 pr-2 py-1"
            >
              <input
                {...register(`skills.${index}`)}
                placeholder="Enter skill"
                className="bg-transparent border-none focus:ring-0 p-0 text-sm w-24"
              />
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="ml-2 text-gray-500 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>
    </form>
  );
}