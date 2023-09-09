/* eslint-disable react/prop-types */
export default function TaskInput(props) {


    return (
        <>
             <div className="input-container">
                <h3>Create a Task</h3>
                <label htmlFor="item"></label>
                <input
                    value={props.value}
                    onChange={(e) => props.setText(e.target.value)}
                    type="text"
                    name="item"
                    id="item"
                    className="task-input"
                />
                <br />
                <button onClick={props.handleAddTask}>Add Task</button>
                <button onClick={props.handleResetTaskList}>Reset List</button>
            </div>
        </>
    )
}