USE mysql;

CREATE TABLE IF NOT EXISTS t_sex(id SMALLINT PRIMARY KEY, name VARCHAR (8)); 

CREATE TABLE IF NOT EXISTS t_zodiac( 
    id SMALLINT PRIMARY KEY, 
    namehiragana VARCHAR (16), 
    namekanji VARCHAR (16), 
    nameenglish VARCHAR (16), 
    symbol CHAR (2)
); 

CREATE TABLE IF NOT EXISTS t_member( 
    id INT PRIMARY KEY, 
    name VARCHAR (256) NOT NULL, 
    sex_id SMALLINT NOT NULL, 
    birth_day DATE, 
    zodiac_id SMALLINT, 
    FOREIGN KEY (sex_id) REFERENCES t_sex(id), 
    FOREIGN KEY (zodiac_id) REFERENCES t_zodiac(id)
);

