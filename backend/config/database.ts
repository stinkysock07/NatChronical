import path from 'path';

export default ({ env }) => {
  const connection = env('DATABASE_URL');

  if (connection) {
    // Production: Use Railway's Persistent PostgreSQL
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: connection,
          ssl: env.bool('DATABASE_SSL', false) ? { rejectUnauthorized: false } : false,
        },
        pool: { min: 2, max: 10 },
      },
    };
  }

  // Local/Dev: Stay on SQLite (Private)
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };
};