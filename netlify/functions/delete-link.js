const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://netlifydb_owner:npg_0TNYOsogGE2Q@ep-billowing-mouse-ajuzvfkj.c-3.us-east-2.db.netlify.com/netlifydb?channel_binding=require&sslmode=require'
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'DELETE') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { userId } = JSON.parse(event.body);

    await pool.query(
      'DELETE FROM links WHERE user_id = $1',
      [userId]
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
