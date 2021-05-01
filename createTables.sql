CREATE TABLE DATA_ENTRIES (
    entryId int NOT NULL AUTO_INCREMENT,
    uuid varchar(80) NOT NULL,
    placeId varchar(255) NOT NULL,
    primary key (entryId)
);
CREATE TABLE GYRO (
    id int NOT NULL AUTO_INCREMENT,
    entryId int  NOT NULL,
    x decimal(40,30) NOT NULL,
    y decimal(40,30) NOT NULL,
    z decimal(40,30) NOT NULL,
    tsamp varchar(100) NOT NULL,
    primary key (id),
    foreign key (entryId) REFERENCES DATA_ENTRIES(entryId)
);
CREATE TABLE ACCEL (
    id int NOT NULL AUTO_INCREMENT,
    entryId int  NOT NULL,
    x decimal(40,30) NOT NULL,
    y decimal(40,30) NOT NULL,
    z decimal(40,30) NOT NULL,
    tsamp varchar(100) NOT NULL,
    primary key (id),
    foreign key (entryId) REFERENCES DATA_ENTRIES(entryId)
);
CREATE TABLE MAGN (
    id int NOT NULL AUTO_INCREMENT,
    entryId int  NOT NULL,
    x decimal(40,30) NOT NULL,
    y decimal(40,30) NOT NULL,
    z decimal(40,30) NOT NULL,
    tsamp varchar(100) NOT NULL,
    primary key (id),
    foreign key (entryId) REFERENCES DATA_ENTRIES(entryId)
);
CREATE TABLE BARO (
    id int NOT NULL AUTO_INCREMENT,
    entryId int  NOT NULL,
    pressure decimal(40,30) NOT NULL,
    tsamp varchar(100) NOT NULL,
    primary key (id),
    foreign key (entryId) REFERENCES DATA_ENTRIES(entryId)
);
