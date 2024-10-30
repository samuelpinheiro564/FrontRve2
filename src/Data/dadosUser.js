class dadosUser {  
  constructor() {  
      // Inicializa a lista de usuários a partir do sessionStorage, se disponível  
      this.users = this.getUsersFromStorage();  
  }  

  // Adiciona um usuário ao array e ao sessionStorage  
  addUser(user) {  
      this.users.push(user);  
      this.saveUsersToStorage();  
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
      sessionStorage.removeItem('users'); // Limpa os dados do sessionStorage  
  }  

  // Salva os usuários no sessionStorage  
  saveUsersToStorage() {  
      sessionStorage.setItem('users', JSON.stringify(this.users));  
  }  

  // Obtém os usuários do sessionStorage  
  getUsersFromStorage() {  
      const storedUsers = sessionStorage.getItem('users');  
      return storedUsers ? JSON.parse(storedUsers) : [];  
  }  
}  

// Instância única da classe para ser usada em toda a aplicação  
const userData = new dadosUser();  
export default userData;