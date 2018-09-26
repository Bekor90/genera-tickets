const fs = require('fs');

class Ticket{

	constructor(numero, escritorio){

		this.numero = numero;
		this.escritorio = escritorio;
	}
}


class TicketControl {

	constructor(){

		this.ultimo = 0;
		this.hoy = new Date().getDate();
		this.tickets = [];
		this.ticketsatendidos = [];

		let data = require('../data/data.json');

		if(data.hoy === this.hoy){

			this.ultimo = data.ultimo;
			this.tickets = data.tickets;
			this.ticketsatendidos = data.ticketsatendidos;

		}else{
				this.reiniciarConteo();
		}
	}

	siguiente(){

		this.ultimo += 1;
		let ticket = new Ticket(this.ultimo, null);
		this.tickets.push(ticket);

		this.grabarArchivo();

		return `Ticket ${ this.ultimo }`;
	}

	getUltimoTicket(){
		return `Ticket ${ this.ultimo }`;
	}
	getUltimos4(){
		return this.ticketsatendidos;
	}

	atenderTicket(escritorio){
		if(this.tickets.length === 0){
			return 'No hay tickets';
		}

		let numeroTicket = this.tickets[0].numero;
		this.tickets.shift();

		let atenderTicket = new Ticket(numeroTicket, escritorio);

		this.ticketsatendidos.unshift( atenderTicket);

		if (this.ticketsatendidos.length > 4){
			this.ticketsatendidos.splice(-1, 1); //eliminar el ultimo
		}

		console.log('tickets atendidos');
		console.log(this.ticketsatendidos);

		this.grabarArchivo();

		return atenderTicket;
	}

	reiniciarConteo(){
		this.ultimo = 0;
		this.tickets = [];
		this.ticketsatendidos =[];

		console.log('Se ha inicializa el sistema');
		this.grabarArchivo();
		
	}

	grabarArchivo(){
		let jsonData = {
			ultimo: this.ultimo,
			hoy: this.hoy,
			tickets: this.tickets,
			ticketsatendidos: this.ticketsatendidos
		};

		let jsonDataString = JSON.stringify(jsonData);

		fs.writeFileSync('./server/data/data.json', jsonDataString);

	}

}

module.exports = {
	TicketControl
}