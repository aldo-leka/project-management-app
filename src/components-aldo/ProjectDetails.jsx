import logo from '../assets/no-projects.png'
import {useState} from "react";

export default function ProjectDetails(
    {
        isNewProject,
        onAddProjectClicked,
        saveProjectCallback,
        cancelProjectCallback,
        addTaskCallback,
        clearTaskCallback,
        clearProjectCallback,
        selectedProject
    }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [hasError, setHasError] = useState(false);
    const [task, setTask] = useState('');

    function onSaveClicked() {
        if (title && description && date) {
            reset();
            saveProjectCallback(title, description, date);
        } else {
            setHasError(true);
        }
    }

    function onCancelClicked() {
        reset();
        cancelProjectCallback();
    }

    function onAddTaskClicked() {
        reset();

        if (task) {
            addTaskCallback(task);
        }
    }

    function reset() {
        setTitle('');
        setDescription('');
        setDate('');
        setTask('');
        setHasError(false);
    }

    return (
        <>
            {isNewProject && (
                <div className="mt-24 text-center w-2/3">
                    <menu className="flex items-center justify-end gap-4 my-4">
                        <button onClick={onCancelClicked}
                                className="text-stone-800 hover:text-stone-950">
                            Cancel
                        </button>
                        <button onClick={onSaveClicked}
                                className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">
                            Save
                        </button>
                    </menu>
                    <>
                        <label className="text-sm font-bold uppercase text-stone-500">
                            Title
                        </label>
                        <input type="text"
                               onChange={(e) => setTitle(e.target.value)}
                               value={title}
                               required
                               className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
                        />
                        <label className="text-sm font-bold uppercase text-stone-500">
                            Description
                        </label>
                        <input type="text"
                               onChange={(e) => setDescription(e.target.value)}
                               value={description}
                               required
                               className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
                        />
                        <label className="text-sm font-bold uppercase text-stone-500">
                            Due date
                        </label>
                        <input type="date"
                               onChange={(e) => setDate(e.target.value)}
                               value={date}
                               required
                               className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
                        />
                        {hasError && (
                            <label className="text-sm font-bold text-stone-500">
                                You must enter all values.
                            </label>
                        )}
                    </>
                </div>
            )}
            {!isNewProject && !selectedProject && (
                <div className="mt-24 text-center w-2/3">
                    <img src={logo} alt="A notepad with pen" className="w-16 h-16 object-contain mx-auto"/>
                    <h2 className="text-xl font-bold text-stone-500 my-4">
                        No Project Selected
                    </h2>
                    <p className="mb-4 text-stone-400">Select a project or get started with a new one</p>
                    <button
                        onClick={onAddProjectClicked}
                        className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100">
                        Create new project
                    </button>
                </div>)}
            {!isNewProject && selectedProject && (
                <div className="mt-24 w-2/3">
                    <h1 className="text-3xl font-bold text-stone-600 mb-2">
                        {selectedProject.title}
                    </h1>
                    <button
                        onClick={clearProjectCallback}
                        className="text-stone-700 hover:text-red-500"
                    >
                        Delete
                    </button>
                    <p className="mb-4 text-stone-400">
                        {selectedProject.date}
                    </p>
                    <p className="text-stone-600 whitespace-pre-wrap">
                        {selectedProject.description}
                    </p>
                    <h2 className="text-xl font-bold text-stone-700 my-4">
                        Tasks
                    </h2>
                    <input
                        type="text"
                        onChange={(e) => setTask(e.target.value)}
                        value={task}
                        required
                        className="w-64 px-2 py-1 rounded-sm bg-stone-200"/>
                    <button
                        onClick={onAddTaskClicked}
                        className="text-stone-700 hover:text-stone-950"
                    >
                        Add Task
                    </button>
                    {!selectedProject.tasks.length && (
                        <p className="text-stone-600 whitespace-pre-wrap">
                            This project does not have any tasks yet.
                        </p>)}
                    {selectedProject.tasks.length > 0 && (
                        <ul className="p-4 mt-8 rounded-md bg-stone-100">
                            {selectedProject.tasks.map((task, index) => (
                                <li key={index} className="flex justify-between my-4">
                                    {task}
                                    <button
                                        onClick={() => clearTaskCallback(task)}
                                        className="text-stone-700 hover:text-red-500"
                                    >
                                        CLEAR
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </>
    );
}