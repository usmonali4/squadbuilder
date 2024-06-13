import React, { useState } from 'react';
import ProjectSidebar from "./ProjectSidebar";
import NewProject from "./NewProject";
import NoProjectSelected from "./NoProjectSelected";
import SelectableProject from "./SelectedProject";

function ProjectManagement() {
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: []
    });

    function handleAddTask(complexity, text) {
        setProjectsState((prevState) => {
            const taskId = Math.random();
            const newTask = {
                text: text,
                complexity: complexity,
                projectId: prevState.selectedProjectId,
                id: taskId
            };

            return {
                ...prevState,
                tasks: [newTask, ...prevState.tasks]
            };
        });
    }

    function handleDeleteTask(id) {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter((task) => task.id !== id)
            };
        });
    }

    function handleSelectProject(id) {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: id
            };
        });
    }

    function handleStartAddProject() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: null
            };
        });
    }

    function handleCancelAddProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined
            };
        });
    }

    function handleAddProject(projectData) {
        const projectId = Math.random();

        setProjectsState(prevState => {
            const newProject = {
                ...projectData,
                id: projectId,
            };
            return {
                ...prevState,
                selectedProjectId: projectId,
                projects: [...prevState.projects, newProject]
            };
        });
    }

    function handleDeleteProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
            };
        });
    }

    const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

    let content = (
        <SelectableProject
            project={selectedProject}
            onDelete={handleDeleteProject}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            tasks={projectsState.tasks}
        />
    );

    if (projectsState.selectedProjectId === null) {
        content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
    } else if (projectsState.selectedProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectSidebar
                projects={projectsState.projects}
                onStartAddProject={handleStartAddProject}
                onSelectProject={handleSelectProject}
                selectedProjectId={projectsState.selectedProjectId}
            />
            {content}
        </main>
    );
}

export default ProjectManagement;
