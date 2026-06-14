const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://netlifydb_owner:npg_0TNYOsogGE2Q@ep-billowing-mouse-ajuzvfkj.c-3.us-east-2.db.netlify.com/netlifydb?channel_binding=require&sslmode=require'
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { userId, linkId } = JSON.parse(event.body);

    // Check if already liked
    const checkResult = await pool.query(
      'SELECT id FROM likes WHERE user_id = $1 AND link_id = $2',
      [userId, linkId]
    );

    if (checkResult.rows.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Ya has dado like' })
      };
    }

    // Insert like
    await pool.query(
      'INSERT INTO likes (id, user_id, link_id) VALUES ($1, $2, $3)',
      [Date.now(), userId, linkId]
    );

    // Increment likes count
    await pool.query(
      'UPDATE links SET likes = likes + 1 WHERE id = $1',
      [linkId]
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
