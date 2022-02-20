const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/technical_skills');

const Skills = db.define('skill', {
    name: {
        type: Sequelize.STRING,
        UNIQUE: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    category: {
        type: Sequelize.STRING,
        UNIQUE: true,
    }
});

const express = require('express');
const app = express();
const path = require('path');

app.use('/src', express.static(path.join(__dirname, '/src')));
// app.use(express.static(path.join(__dirname, '/src')));

app.get('/', async(req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, 'index.html'));
    }
    catch (err) {
        next(err);
    }
});

app.get('/api/technical_skills', async(req, res, next) => {
    try {
        const skill = await Skills.findAll();
        res.send(skill);
    }
    catch (err) {
        next(err);
    }
        
});

const init = async() => {
    try {
        await db.sync({ force: true });
        await Skills.create({ name: 'JavaScript', category: 'Programming languages'});
        await Skills.create({ name: 'Python', category: 'Programming languages'});
        await Skills.create({ name: 'HTML', category: 'Programming languages'});
        await Skills.create({ name: 'CSS', category: 'Programming languages'});
        await Skills.create({ name: 'Node.js', category: 'Back-end technologies'});
        await Skills.create({ name: 'Express', category: 'Back-end technologies'});
        await Skills.create({ name: 'React', category: 'Front-end technologies'});
        await Skills.create({ name: 'PostgreSQL', category: 'Databases'});
        await Skills.create({ name: 'Ubuntu', category: 'OS experience'});
        await Skills.create({ name: 'macOS', category: 'OS experience'});
        await Skills.create({ name: 'AWS', category: 'Cloud'});
        await Skills.create({ name: 'Git', category: 'IDE, tools'});

        const port = process.env.PORT || 1345;
        app.listen(port, () => `listen on port ${port} ...`);
    }
    catch (err) {
        console.log(err);
    }
};

init();