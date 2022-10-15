const LOCAL_PORT = 4000;
const LOCAL_MONGODB_URL = 'mongodb://localhost/nest';

export const PORT = process.env.PORT || LOCAL_PORT;
export const MONGODB_URL = process.env.MONGODB_URL || LOCAL_MONGODB_URL;
