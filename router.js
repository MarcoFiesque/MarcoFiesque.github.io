import {
        HomeComponent, 
        Page1Component, 
        Page2Component, 
        ErrorComponent,
        addTask
    } from './app.js';

const routes = [
    {path: '/',      component: HomeComponent, },
    {path: '/page1', component: Page1Component, },
    {path: '/page2', component: Page2Component, },
];


const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

// Router
export const router = async () => {

    // current path
    const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^${path}$`, 'gmi'))) || false;
    // Component based on the current path
    const path = parseLocation();
    // No matching route, get the "Error" component
    const { component = ErrorComponent } = findComponentByPath(path, routes) || {};
    // Render component in the "app" placeholder
    
    document.getElementById('app').innerHTML = await component.render();
    await setFormEvent();

}

const setFormEvent = () =>{
    
    const form = document.getElementById('taskForm');
    form.addEventListener('submit', (e)=>{addTask(e)});
    console.log("Ev");

    // console.log(router);
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
