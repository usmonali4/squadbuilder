import Button from "./Button.js";

export default function NoProjectSelected({onStartAddProject}) {
    return <div className="mt-24 text-center w-2/3">
        <h2 className="text-xl font-bold text-stone-500 my-4">No Activity Selected</h2>
        <p className="text-stone-400 mb-4">Select an activity or get started with a new one</p>
        <p className="mt-8">
            <Button children="Create new activity" onClick={onStartAddProject}></Button>
            {/*<button className="mt-8">Create new project</button>*/}
        </p>
    </div>
}