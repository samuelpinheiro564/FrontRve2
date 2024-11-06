class dadosRve {  
    constructor() {  
        // Inicializa o rve a partir do sessionStorage, se disponível  
        this.rve = this.getRveFromStorage();  
    }  
  
    // Define um rve e salva no sessionStorage  
    setRve(rve) {  
        this.rve = rve;  
        this.saveRveToStorage();  
    }  
  
    // Obtém o rve  
    getRve() {  
        return this.rve;  
    }  
  
    // Limpa o rve  
    clearRve() {  
        this.rve = null;  
        sessionStorage.removeItem('rve'); // Limpa os dados do sessionStorage  
    }  
  
    // Salva o rve no sessionStorage  
    saveRveToStorage() {  
        sessionStorage.setItem('rve', JSON.stringify(this.rve));  
    }  
  
    // Obtém o rve do sessionStorage  
    getRveFromStorage() {  
        const storedRve = sessionStorage.getItem('rve');  
        return storedRve ? JSON.parse(storedRve) : null;  
    }  
}  
  
// Instância única da classe para ser usada em toda a aplicação  
const rveData = new dadosRve();  
export default rveData;
