import {useState} from "react";

export default function ProjectsOverview(
    {
        onAddProjectClicked,
        projects,
        onSelectProject
    }) {
    const btnClasses = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";
    const selectedBtnClasses = "w-full text-left px-2 py-1 rounded-sm my-1 text-stone-200 bg-stone-800";

    return (
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2
                className="mb-8 font-bold uppercase md:text-xl text-stone-200">
                Your projects
            </h2>
            <button
                onClick={onAddProjectClicked}
                className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100">
                + Add Project
            </button>
            <ul className="mt-8">
                {projects.map((project, index) => (
                    <li key={index} className="flex justify-between my-4">
                        <button
                            onClick={() => onSelectProject(project)}
                            className={project.selected ? selectedBtnClasses : btnClasses}
                        >
                            {project.title}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}