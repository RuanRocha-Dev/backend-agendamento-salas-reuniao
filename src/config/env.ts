import 'dotenv/config';

function requiredEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Variável de ambiente obrigatória: ${name}`);
    }

    return value;
}

export const envGlobal = {
    app: {
        port: Number(requiredEnv('APP_PORT')),
    },

    db: {
        host: requiredEnv('DB_HOST'),
        port: Number(requiredEnv('DB_PORT')),
        name: requiredEnv('DB_NAME'),
        user: requiredEnv('DB_USER'),
        password: requiredEnv('DB_PASSWORD'),
        timezone: requiredEnv('DB_TIMEZONE'),
    }
};
