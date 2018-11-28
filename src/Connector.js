import React, { useState } from 'react';

/**
 * Connector displays a login form to connect to the chat server
 * @param props 
 * @param props.onSubmit A callback to be called with a login info object
 * submitted by the user:
 *   {
 *     token: string,
 *     username: string
 *   }
 */
export default function Connector(props) {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  return (
    <div>
      <form>
        <div>
          <label htmlFor="token">Token: </label>
          <input
            name="token"
            required
            value={token}
            onChange={e => setToken(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            name="username"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={() => props.onSubmit({ token, username })}>
          Connect
        </button>
      </form>
    </div>
  );
}
