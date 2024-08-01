import dotenv from 'dotenv';
import app from './app';
import db from './knex-instance';

dotenv.config();

// Função para rodar as migrations
const runMigrations = async () => {
  try {
    await db.migrate.latest(); // Executa todas as migrations que ainda não foram aplicadas
    console.log('Migrations completed successfully.');
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1); // Sai com código de erro se as migrations falharem
  }
};

const PORT = process.env.PORT || 3001;

// Executa as migrations e inicia o servidor
runMigrations().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
