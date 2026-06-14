const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://netlifydb_owner:npg_0TNYOsogGE2Q@ep-billowing-mouse-ajuzvfkj.c-3.us-east-2.db.netlify.com/netlifydb?channel_binding=require&sslmode=require'
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { emailOrPhone, password } = JSON.parse(event.body);

    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR phone = $1',
      [emailOrPhone]
    );

    if (result.rows.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Usuario no encontrado' })
      };
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Contraseña incorrecta' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(user)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
