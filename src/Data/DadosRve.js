class dadosRve {  
    constructor() {  
        // Inicializa a lista de rves a partir do sessionStorage, se disponível  
        this.rves = this.getRvesFromStorage();  
    }  
  
    // Adiciona um rve ao array e ao sessionStorage  
    addRve(rve) {  
        this.rves.push(rve);  
        this.saveRvesToStorage();  
    }  
  
    // Obtém todos os rves  
    getRves() {  
        return this.rves;  
    }  
  
    // Encontra um rve pelo nome de usuário  
    findRve(username) {  
        return this.rves.find((rve) => rve.username === username);  
    }  
  
    // Limpa todos os dados dos rves  
    clearRves() {  
        this.rves = [];  
        sessionStorage.removeItem('rves'); // Limpa os dados do sessionStorage  
    }  
  
    // Salva os rves no sessionStorage  
    saveRvesToStorage() {  
        sessionStorage.setItem('rves', JSON.stringify(this.rves));  
    }  
  
    // Obtém os rves do sessionStorage  
    getRvesFromStorage() {  
        const storedRves = sessionStorage.getItem('rves');  
        return storedRves ? JSON.parse(storedRves) : [];  
    }  
}  
  
// Instância única da classe para ser usada em toda a aplicação  
const rveData = new dadosRve();  
export default rveData;
