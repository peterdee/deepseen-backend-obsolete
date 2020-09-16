export default (connection: any, token: string) => {
  console.log('-- authenticate', connection.id, token);

  // TODO: decode and verify the token

  if (!token) {
    return connection.emit('authenticate', ({
      info: 'MISSING_TOKEN',
      status: 400,
    }));
  }
  return connection.emit('authenticate', ({
    info: 'OK',
    status: 200,
  }));
};
