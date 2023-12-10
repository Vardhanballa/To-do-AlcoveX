// server/models/Project.js

const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tododb',
    password: 'admin',
    port: 5432,
  });


class Project {
    static async createProject(name) {
        const result = await pool.query('INSERT INTO projects (name) VALUES ($1) RETURNING *', [name]);
        return result.rows[0];
    }

    static async getAllProjects() {
        const result = await pool.query('SELECT * FROM projects');
        return result.rows;
    }
}

module.exports = Project;
