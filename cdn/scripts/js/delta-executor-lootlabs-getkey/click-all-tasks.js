document.querySelectorAll('#taskList > .task').forEach(task => {
    task.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    }));
});
