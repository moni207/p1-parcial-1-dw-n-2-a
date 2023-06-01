'use strict';

/*
 * HWANG, IN YOUNG MONICA
 */

let aDiscos = [], aCodigos = [];

function Disco() {
	let nombre = 'Nombre del disco';
	let autor = 'Nombre del autor o banda'; 
	let codigo = 0;
	let aPistas = [];

	this.pedirNombre = function(){
		let banderita = false;
		do{
			if (banderita) {
				alert ('Disco incorrecto. Ingrese nuevamente');
			}
				nombre = prompt('Ingrese nombre del disco');
				banderita = true;
			}while (!isNaN(nombre))
		}

	this.pedirAutor = function(){
		let banderita = false;
		do{
			if (banderita) {
				alert ('Autor o banda incorrecto. Ingrese nuevamente');
			}
			autor = prompt('Ingrese nombre del autor o banda');
			banderita = true;
		}while (!isNaN(autor))
	}
	
	this.pedirCodigo = function () {
		do {
			codigo = parseInt(prompt('Ingrese Codigo numerico unico del Disco'));
		} while (!codigoValido(codigo))
		aCodigos.push(codigo);
          
	}
	this.leerCodigo = function () {
		return codigo;
	}
	
	let codigoValido = function (cod) {
        let control = true;
		if (isNaN(cod)) {
			alert ('Codigo incorrecto. Debe ingresar un numero');
			control = false;
		}else if (!(cod >= 1 && cod <= 999)) {
			alert('Debe ingresar del 1 al 999');
			control = false;
		}else if (aCodigos.indexOf(cod) != -1) {
			alert ('Codigo existente. Ingrese otro codigo');
			control = false;
		}
		return control;
	}
		

	this.cantidadDeDiscos = function(){
		return aDiscos.length;
	}

	this.guardarPista = function(pista) {
		aPistas.push(pista);
	}

	this.cantidadDePistas = function() {
		return aPistas.length;
	}

	this.duracionTotal = function() {
		let acum = 0;
		for (let duracion of aPistas) {
			acum += duracion.darDuracion();
		}
		return acum;
	}

	let promedioDisco = function() {
		let acum = 0, cont = aPistas.length;
		for (let duracion of aPistas) {
			acum += duracion.darDuracion();
		}
		return acum / cont;
	}


	this.armarDisco = function() {
		let m = `
		
		<p><strong>Disco:</strong> ${nombre}</p>
		<p>Discos ingresados: ${this.cantidadDeDiscos()}</p>
		<p><strong>Autor o Banda:</strong> ${autor}</p>
		<p><strong>Codigo:</strong> ${codigo}</p>
		<p><strong>Pistas:</strong></p>
		<p>Pistas ingresadas: ${this.cantidadDePistas()}</p>
		<ul>`;
		
		for (let pista of aPistas) {
			m += pista.armarPista();
		}
		m += `
			</ul>
			<p>Promedio: ${promedioDisco()}</p>
            <p>Duracion total del disco: ${this.duracionTotal()}</p>
		`;
		return m;
		}
}


function Pista(){
	let nombre = 'Nombre de la pista';
	let duracion = 0;

	this.pedirPista = function(){
		let banderita = false;
		do {
			if (banderita) {
				alert('No ingreso ninguna pista');
			}
			nombre = prompt('Ingrese el nombre de la pista');
			banderita = true;
		}while (!isNaN(nombre))
	}

	this.pedirDuracion = function() {
		let banderita = false;
		do{
			if (banderita) {
				alert('Duracion debe ser de 0 a 7200 segundos');
			}
			duracion = parseInt(prompt('Ingrese la duracion de la pista en segundos'));
		}while (!duracionValida(duracion))
	}
	
	let duracionValida = function(dur) {
		if (isNaN(duracion)) {
			alert('Debe ingresar la duracion en segundos');
			return false;
		}else if (duracion >= 0 && duracion <= 7200){
			return true;
		}else {
			alert('Duracion debe ser de 0 a 7200 segundos');
			return false;
		}
	}
	
	this.darDuracion = function() {
		return duracion;
	}

	this.armarPista = function() {
		let m = `<li${duracion >= 180 ? ' style="color:red"':''}><strong>Nombre:</strong> ${nombre} - <strong>Duracion:</strong> ${duracion}</li>`;
		return m;
	}
}

function Cargar() {
	let disco;
	disco = new Disco();
	disco.pedirNombre();
	disco.pedirAutor();
	disco.pedirCodigo();

	do{
		let pista = new Pista();
		pista.pedirPista();
		pista.pedirDuracion();

		disco.guardarPista(pista);
	}while (confirm('Desea seguir ingresando pistas?'));

	aDiscos.push(disco);
}

function Mostrar() {
	let html = '';
	
	if (!aDiscos.length) {
		html += '<p>No se ha ingresado ningun disco</p>';
	} else {
		for (let disco of aDiscos) {
			html += disco.armarDisco();
			html += '<hr />'
		}
	}
	document.getElementById('info').innerHTML = html;
}
