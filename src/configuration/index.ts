const { env: Environment } = process;

export const PORT = Number(Environment.PORT) || 2111;
