const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://netlifydb_owner:npg_0TNYOsogGE2Q@ep-billowing-mouse-ajuzvfkj.c-3.us-east-2.db.netlify.com/netlifydb?channel_binding=require&sslmode=require'
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { userId, displayName, phone, photo, link } = JSON.parse(event.body);

    const result = await pool.query(
      'INSERT INTO links (id, user_id, display_name, photo, phone, link, likes, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [Date.now(), userId, displayName, photo, phone, link, 0, new Date().toISOString()]
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows[0])
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
