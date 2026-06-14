const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://netlifydb_owner:npg_0TNYOsogGE2Q@ep-billowing-mouse-ajuzvfkj.c-3.us-east-2.db.netlify.com/netlifydb?channel_binding=require&sslmode=require'
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { name, email, phone, password } = JSON.parse(event.body);

    // Check if user already exists
    const checkResult = await pool.query(
      'SELECT id FROM users WHERE email = $1 OR phone = $2',
      [email, phone]
    );

    if (checkResult.rows.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email o teléfono ya registrado' })
      };
    }

    // Create user
    const result = await pool.query(
      'INSERT INTO users (id, name, email, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [Date.now(), name, email, phone, password]
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
