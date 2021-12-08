class Task{
    constructor(title, description=""){
        this.id = Math.floor(Math.random() * Date.now());
        this.title = title;
        this.description = description;
        this.state = false;
    }
}

export default Task;