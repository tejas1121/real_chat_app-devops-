// Read API host from environment when available (works with `npm start` inside container)
// For create-react-app, env vars must be prefixed with REACT_APP_
// When the frontend bundle runs in the user's browser, it should use `localhost`
// so requests originate from the host machine and reach the backend published on :5000.
// `host.docker.internal` is only needed for container-to-host requests made from inside containers.
const DEFAULT_LOCAL = 'http://localhost:5000';

const APP_HOST = process.env.REACT_APP_API_URL || DEFAULT_LOCAL;

console.log('Using API host:', APP_HOST);

export default APP_HOST;