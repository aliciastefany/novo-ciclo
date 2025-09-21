import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [idUser, setIdUser] = useState(null);

  return (
    <UserContext.Provider value={{idUser, setIdUser}}>
      {children}
    </UserContext.Provider>
  );
}
