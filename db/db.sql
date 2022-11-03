CREATE TABLE CLIENTE 
(
 id INT NOT NULL auto_increment , 
 nombre VARCHAR (50) NOT NULL, 
 apellido VARCHAR (50) NOT NULL, 
 ci INT NOT NULL,
 telefono int not null,
 direccion VARCHAR (20) NOT NULL, 
 primary key (id)
);

create table ROL
(
id int not null auto_increment,
nombre VARCHAR (50) NOT NULL,
descripcion varchar(120) not null,
primary key(id)
);

create table USUARIO
(
 id int not null auto_increment , 
 login varchar(40) not null, 
 Password varchar(40) not null, 
 primary key (id)
);

create table CARGO 
( 
  id int not null auto_increment , 
  nombre varchar (120) not null, 
  sueldo float not null, 
  primary key (id)
);

create table EMPLEADO
(
  id int not null auto_increment , 
  nombre varchar(40) not null, 
  apellido varchar(40) not null, 
  ci int not null, 
  direccion varchar(120) not null, 
  sexo varchar(1) not null,
  idCargo int not null, 
  idUsuario int not null, 
  primary key (id),
  foreign key (idCargo) references CARGO ( id)
   ON UPDATE CASCADE
   ON DELETE CASCADE, 
  foreign key (idUsuario) references USUARIO ( id)
   ON UPDATE CASCADE
   ON DELETE CASCADE 
);

create table PEDIDO
( 
 id int not null auto_increment , 
 detalle varchar(300) not null, 
 fecha date not null,
 fechaEntrega date not null, 
 total float not null,
 idEmpleado int not null, 
 idCliente int not null,
 primary key (id),
  foreign key (idEmpleado) references EMPLEADO ( id)
   ON UPDATE CASCADE
   ON DELETE CASCADE,
    foreign key (idCliente) references CLIENTE ( id)
   ON UPDATE CASCADE
   ON DELETE CASCADE 
);
create table DETALLEVENTA
(
 idPedido int not null, 
 idProducto int not null, 
 cantidad int not null, 
 precio float not null, 
 primary key ( idPedido , idProducto) , 
 foreign key  ( idPedido) references PEDIDO(id) 
 on update cascade 
  on delete cascade, 
  foreign key (idProducto) references PRODUCTO ( id) 
  on update cascade 
  on delete cascade
);

create table NOTAENTREGA(
 id int not null auto_increment,
 fecha date not null,
 primary key(id)
);

create table MAQUINA    
(
 id int not null auto_increment , 
 nombre varchar (120) not null, 
 capacidad varchar(120) not null, 
 estado boolean,
 primary key (id)
);

create table PROCESO 
(
 id int not null auto_increment, 
 nombre varchar(120) not null, 
 tiempo time not null, 
 descripcion varchar(300) not null, 
 idMaquina int not null,
 primary key (id),
  foreign key (idMaquina) references MAQUINA ( id)
   ON UPDATE CASCADE
   ON DELETE CASCADE 
 
);

create table MASA(
  id int not null auto_increment,
  nombre varchar(50) not null,
  idProceso int not null,
  primary key(id),
   foreign key (idProceso) references PROCESO (id)
   ON UPDATE CASCADE
   ON DELETE CASCADE
);

create table RECETA 
(
 id int not null auto_increment, 
 nombre varchar(100) not null, 
 descripcion varchar(300) not null, 
 idMasa int not null,
 primary key(id),
 foreign key (idMasa) references MASA (id)
   ON UPDATE CASCADE
   ON DELETE CASCADE
);

create table PRODUCTO
( 
 id int not null auto_increment , 
 nombre varchar(50) not null, 
 precio float not null, 
 descripcion varchar(300) not null, 
 idReceta int not null, 
 primary key(id),
 foreign key (idReceta) references RECETA ( id)
   ON UPDATE CASCADE
   ON DELETE CASCADE
);

create table entregaProducto(
  idNotaEntrega int not null,
  idProducto int not null,
  cantidad int not null,
  foreign key (idNotaEntrega) references NOTAENTREGA (id)
  ON UPDATE CASCADE
  ON DELETE CASCADE,
 foreign key (idProducto) references PRODUCTO (id)
  ON UPDATE CASCADE
  ON DELETE CASCADE
);
