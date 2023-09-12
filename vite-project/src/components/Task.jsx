/* eslint-disable react/prop-types */
export default function Task(props) {
    return (
        <section className="task-container">
            {props.tasks.map((item) => {
                return (
                    <div key={item.id} className="task-card">
                        <label htmlFor="checkbox"></label>
                        <input
                            className="task-checkbox"
                            type="checkbox"
                            name="checkbox"
                            id="checkbox"
                            checked={item.checked}
                            onChange={() => props.handleToggleTask(item.id)}
                        />

                        <div
                            className={
                                item.checked
                                    ? 'input-box-true'
                                    : 'input-box-false'
                            }
                        >
                            <div> {item.title}</div>
                        </div>

                        <img
                            className="task-btn-trash"
                            onClick={() => props.handleDeleteTask(item.id)}
                            src="./trash.png"
                            alt=""
                        />
                    </div>
                );
            })}
        </section>
    );
}
