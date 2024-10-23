class dadosUser {
    constructor() {
      this.users = [];
    }
  
    // Adiciona um usuário ao array
    addUser(user) {
      this.users.push(user);
    }
  
    // Obtém todos os usuários
    getUsers() {
      return this.users;
    }
  
    // Encontra um usuário pelo nome de usuário
    findUser(username) {
      return this.users.find((user) => user.username === username);
    }
  
    // Limpa todos os dados dos usuários
    clearUsers() {
      this.users = [];
    }
  }
  
  // Instancia única da classe para ser usada em toda a aplicação
  const userData = new dadosUser();
  export default userData;