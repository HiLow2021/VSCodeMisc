USE mydb; 

DELETE 
    FROM
        user; 

INSERT 
    INTO user(name) 
    VALUES ('administrator'),('guest');