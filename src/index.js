// console.log('hello world from index.JS!!');

const ul = document.querySelector('ul');

ul.addEventListener('click', async(ev) => {
    if (ev.target.tagName === 'LI') {
        // console.log(ev.target.getAttribute('db-id'));
        const id = ev.target.getAttribute('db-id');
        await axios.delete(`/api/technical_skills/${id}`);
    }
    init();
});

const init = async() => {
    const skills = (await axios.get('/api/technical_skills')).data;
    const list = `
        ${skills.map(skill => `
            <li db-id='${skill.id}'>${skill.name}: ${skill.category}</li>`).join('')}`;
    ul.innerHTML = list;
    // console.log(skills);
};

init();