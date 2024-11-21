import type { Resume } from '../../types/resume';

interface CreativeTemplateProps {
  resume: Resume;
}

export default function CreativeTemplate({ resume }: CreativeTemplateProps) {
  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-indigo-50 to-purple-50 p-8 shadow-lg">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          {resume.personalInfo.fullName}
        </h1>
        <p className="text-xl text-gray-700 mt-2">{resume.personalInfo.title}</p>
        <div className="mt-4 space-y-1 text-gray-600">
          <p>{resume.personalInfo.email}</p>
          <p>{resume.personalInfo.phone}</p>
          <p>{resume.personalInfo.location}</p>
        </div>
      </header>

      {resume.summary && (
        <section className="mb-12">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-br from-indigo-50 to-purple-50 px-3 text-lg font-medium text-gray-900">
                About Me
              </span>
            </div>
          </div>
          <p className="mt-6 text-gray-700 leading-relaxed text-center max-w-2xl mx-auto">
            {resume.summary}
          </p>
        </section>
      )}

      {resume.experience.length > 0 && (
        <section className="mb-12">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-br from-indigo-50 to-purple-50 px-3 text-lg font-medium text-gray-900">
                Experience
              </span>
            </div>
          </div>
          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-8 bg-white bg-opacity-50 rounded-lg p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h3 className="text-xl font-bold text-indigo-600">{exp.position}</h3>
                <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="text-purple-600 mb-3">{exp.company} • {exp.location}</p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {resume.education.length > 0 && (
        <section className="mb-12">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-br from-indigo-50 to-purple-50 px-3 text-lg font-medium text-gray-900">
                Education
              </span>
            </div>
          </div>
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-6 bg-white bg-opacity-50 rounded-lg p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h3 className="text-xl font-bold text-indigo-600">{edu.school}</h3>
                  <p className="text-purple-600">{edu.degree} in {edu.field}</p>
                </div>
                <span className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {resume.skills.length > 0 && (
        <section>
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-br from-indigo-50 to-purple-50 px-3 text-lg font-medium text-gray-900">
                Skills
              </span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {resume.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}