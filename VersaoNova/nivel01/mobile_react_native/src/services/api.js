import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;

/**
 * ioS com emulador: localhost
 * ios com físico: ip da máquina no lugar do localhost (ipconfig etc etc)
 * 
 * Android com emulador: adb reverse tcp:3333 tcp:3333, no cmd para redirecionar
 * o host do emulador
 * 
 * android com emulador: ip especifico para o emulador do android (10.0.2.2)
 * 
 */