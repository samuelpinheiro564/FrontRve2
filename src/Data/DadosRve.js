class dadosRVE {  
    constructor() {  
        // Inicializa a lista de RVE a partir do sessionStorage, se disponível  
        this.rves = this.getRvesFromStorage();  
    }  

    // Adiciona um RVE ao array e ao sessionStorage  
    addRve(rve) {  
        this.rves.push(rve);  
        this.saveRvesToStorage();  
    }  

    // Adiciona assinaturas a um RVE e salva no sessionStorage  
    addAssinaturas(assinaturas) {  
        this.rves.push(assinaturas);  
        this.saveRvesToStorage();  
    }  

    // Obtém todos os RVE  
    getRves() {  
        return this.rves;  
    }  

    // Encontra um RVE pelo ID  
    findRve(rveId) {  
        return this.rves.find((rve) => rve.rveId === rveId);  
    }  

    // Limpa todos os dados dos RVE  
    clearRves() {  
        this.rves = [];  
        sessionStorage.removeItem('rves'); // Limpa os dados do sessionStorage  
    }  

    // Salva os RVE no sessionStorage  
    saveRvesToStorage() {  
        sessionStorage.setItem('rves', JSON.stringify(this.rves));  
    }  

    // Obtém os RVE do sessionStorage  
    getRvesFromStorage() {  
        const storedRves = sessionStorage.getItem('rves');  
        return storedRves ? JSON.parse(storedRves) : [];  
    }  
}  

// Instância única da classe para ser usada em toda a aplicação  
const rveData = new dadosRVE();  
export default rveData;