// console.log('hello world from index.JS!!');

const ul = document.querySelector('ul');
// console.log(ul);

/* First of all, for dynamically generated button, use querySelector here won't work.. and will return null in all cases
   If one put this button into index.html, querySelector will work.
   For element has an id, such as <button id='thisList'>, one can use querySelector('#thisList')
   For element has an attribute, such as <button db-id='1'>, one has to do querySelector("button[db-id='1']")
   Even an id is also an attribute, such as <button id='1'>, one can do querySelector("button[id='1']") Or using querySelector("#\\31"), where \31 is the unicode of number 1
   Or using CSS.escape: querySelector(`#${CSS.escape('1')}`) 
   Basically, digits or alphanumeric strings with leading digit does not qualify as a valid identifier.
   In order to work with "leading digits" Identifiers, one has to do the above tricks.
   Reference: https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers 
*/
// const btn = document.querySelector(`#${CSS.escape('1')}`);
// console.log(btn);

ul.addEventListener('click', async(ev) => {
    // if (ev.target.tagName === 'LI') {
    // console.log(ev.target.tagName);
    if (ev.target.tagName === 'BUTTON') {
        // console.log(ev.target.getAttribute('db-id'));
        const id = ev.target.getAttribute('btn-id');
        await axios.delete(`/api/technical_skills/${id}`);
    }
    init();
});

const init = async() => {
    const skills = (await axios.get('/api/technical_skills')).data;
    const list = `
        ${skills.map(skill => `
            <li db-id='${skill.id}'>${skill.name}: ${skill.category}
                <button btn-id='${skill.id}'>Delete</button>
            </li>`).join('')}`;
    ul.innerHTML = list;
    // console.log(skills);
};

init();

