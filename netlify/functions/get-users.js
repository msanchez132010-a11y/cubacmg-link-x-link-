const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://netlifydb_owner:npg_0TNYOsogGE2Q@ep-billowing-mouse-ajuzvfkj.c-3.us-east-2.db.netlify.com/netlifydb?channel_binding=require&sslmode=require'
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const result = await pool.query(`
      SELECT 
        l.*,
        u.name,
        u.email
      FROM links l
      JOIN users u ON l.user_id = u.id
      WHERE l.created_at >= NOW() - INTERVAL '24 hours'
      ORDER BY l.created_at DESC
    `);

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
