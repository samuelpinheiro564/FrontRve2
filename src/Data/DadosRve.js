
class dadosRve {  
    constructor() {  
        // Inicializa o rve a partir do sessionStorage, se disponível  
        this.rve = this.getRveFromStorage();  
    }  
  
    // Define um rve e salva no sessionStorage  
    setRve(rve) {  
        this.clearRve(); // Limpa a rve existente
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
    addRve(rve) {  
        this.clearRve(); // Limpa a rve existente
        this.rve = [rve];  // Define o array rve para conter apenas o novo rve
        this.saveRveToStorage();  // Salva o rve no sessionStorage
    }  
}  
  
// Instância única da classe para ser usada em toda a aplicação  
const rveData = new dadosRve();  
export default rveData;
