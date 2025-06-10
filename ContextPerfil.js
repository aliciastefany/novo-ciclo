import {createContext, useState} from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [dados, setDados] = useState({
    username: 'Pedro_Henrique',
    email: 'etectaboaosp@etec.sp.gov.br',
    cpf: '015.516.690-47',
    senha: 'etec2024',
    numero: '11 98457-2561',
    img: null,

    usernameMercado: 'Kaçula Supermercados',
    emailMercado: 'kaculasuper@gmail.com',
    cnpj: '54.839.485/0002-11',
    senhaMercado: 'kacula2024',
    numeroMercado: '(11) 4701-6181',
    descricaoMercado: 'O Kaçula Supermercado é um dos parceiros do nosso aplicativo Novo Ciclo, servindo como ponto de coleta para materiais recicláveis como papel, papelão, metal e vidro.',
    site: 'https://www.kacula.com.br/',
    enderecoMercado: 'Rua José Milani, 244 - Jardim Irapua, Taboão da Serra - SP, 06766-420',
    imgMercado: null,

    pontos: 275.5,
  });

  return (
    <UserContext.Provider value={{dados, setDados}}>
      {children}
    </UserContext.Provider>
  );
}
