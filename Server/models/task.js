// server/models/Task.js

const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tododb',
    password: 'admin',
    port: 5432,
  });

class Task {
    static async createTask(title, startDate, endDate, status, projectId) {
        console.log('Creating task with projectId:', projectId);

        const result = await pool.query(
            'INSERT INTO tasks (title, start_date, end_date, status, project_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, startDate, endDate, status, projectId]
        );
        return result.rows[0];
    }

    static async getTasksByProject(projectId) {
        const result = await pool.query('SELECT * FROM tasks WHERE project_id = $1', [projectId]);
        return result.rows;
    }

    static async getTasksByStatus(status) {
        const result = await pool.query('SELECT * FROM tasks WHERE status = $1', [status]);
        return result.rows;
      }
    static async updateTask(id, title, startDate, endDate, status) {
        const result = await pool.query(
          'UPDATE tasks SET title = $1, start_date = $2, end_date = $3, status = $4 WHERE id = $5 RETURNING *',
          [title, startDate, endDate, status, id]
        );
        return result.rows[0];
      }
      
    static async deleteTask(id) {
        await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
      }
      
    static async getTaskById(taskId) {
        const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [taskId]);
        return result.rows[0];
      }
}

module.exports = Task;
