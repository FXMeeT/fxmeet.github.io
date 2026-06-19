// Disable common redirects
window.open = () => null;

history.pushState = new Proxy(history.pushState, {
    apply() {
        console.log('Blocked pushState');
    }
});

history.replaceState = new Proxy(history.replaceState, {
    apply() {
        console.log('Blocked replaceState');
    }
});

// Block location methods
Location.prototype.assign = function(url) {
    console.log('Blocked location.assign:', url);
};

Location.prototype.replace = function(url) {
    console.log('Blocked location.replace:', url);
};

// Click tasks
document.querySelectorAll('#taskList > .task').forEach(task => {
    console.log('Clicking:', task);

    task.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    }));
});
