// console.log('hello world from index.JS!!');

const ul = document.querySelector('ul');

const init = async() => {
    const skills = (await axios.get('/api/technical_skills')).data;
    const list = `
        ${skills.map(skill => `
            <li>${skill.name}: ${skill.category}</li>`).join('')}`;
    ul.innerHTML = list;
    // console.log(skills);
};

init();