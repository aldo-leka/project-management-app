import ProjectsOverview from "./components-aldo/ProjectsOverview.jsx";
import ProjectDetails from "./components-aldo/ProjectDetails.jsx";
import {useState} from "react";

function AppAldo() {
    const [isNewProject, setIsNewProject] = useState(false);
    const [projects, setProjects] = useState([]);

    function addProjectBtnClicked() {
        // clear selection
        setProjects(prevProjects =>
            prevProjects.map(project =>
                project.selected ? {...project, selected: false} : project));

        setIsNewProject(true);
    }

    function addProject(title, description, date) {
        setProjects(prevProjects =>
            [...prevProjects, {title, description, date, tasks: [], selected: false}]);

        setIsNewProject(false);
    }

    function addTaskToSelectedProject(task) {
        setProjects(prevProjects =>
            prevProjects.map(project =>
                project.selected
                    ? {...project, tasks: [...project.tasks, task]}
                    : project
            )
        );
    }

    function clearTaskFromSelectedProject(taskName) {
        setProjects(prevProjects =>
            prevProjects.map(project =>
                project.selected
                    ? {
                        ...project,
                        tasks: project.tasks.filter(task => task !== taskName) // Remove by string match
                    }
                    : project
            )
        );
    }

    function clearSelectedProject() {
        setProjects(prevProjects =>
            prevProjects.filter(project => !project.selected)
        );
    }

    function selectProject(selectedProject) {
        setProjects(prevProjects =>
            prevProjects.map(project =>
                project.title === selectedProject.title
                    ? { ...project, selected: true }
                    : { ...project, selected: false }
            )
        );
        setIsNewProject(false);
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectsOverview
                onAddProjectClicked={addProjectBtnClicked}
                projects={projects}
                onSelectProject={selectProject}
            />
            <ProjectDetails
                isNewProject={isNewProject}
                onAddProjectClicked={addProjectBtnClicked}
                saveProjectCallback={addProject}
                cancelProjectCallback={() => setIsNewProject(false)}
                addTaskCallback={addTaskToSelectedProject}
                clearTaskCallback={clearTaskFromSelectedProject}
                clearProjectCallback={clearSelectedProject}
                selectedProject={projects.find(project => project.selected)}
            />
        </main>
    );
}

export default AppAldo;
