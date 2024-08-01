// test-db.ts
import knex from 'knex';
import config from '../knexfile';

const environment = 'development'; // ou 'production', conforme o caso
const dbConfig = config[environment];

if (!dbConfig) {
  throw new Error(`Configuração para o ambiente '${environment}' não encontrada.`);
}

const db = knex(dbConfig);

(async function() {
  try {
    const result = await db.raw('SELECT 1+1 AS result');
    console.log('Database connection successful:', result);
  } catch (error) {
    console.error('Database connection error:', error);
  } finally {
    await db.destroy();
  }
})();
