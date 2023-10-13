-- DELIMITER //

-- CREATE FUNCTION InsertQueryAndGetID(
--     p_fk_user_id INT,
--     p_fk_pdf_id INT,
--     p_query_text VARCHAR(255)
-- )
-- RETURNS INT
-- BEGIN
--     DECLARE new_query_id INT;
    
--     INSERT INTO `query` (fk_user_id, fk_pdf_id, query_text)
--     VALUES (p_fk_user_id, p_fk_pdf_id, p_query_text);
    
--     SET new_query_id = LAST_INSERT_ID();
    
--     RETURN new_query_id;
-- END //

-- DELIMITER ;

-- DELIMITER //

-- CREATE FUNCTION InsertPDFAndGetID(
--     p_fk_user_id INT,
--     p_pdf_file VARCHAR(255)
-- )
-- RETURNS INT
-- BEGIN
--     DECLARE new_pdf_id INT;
    
--     INSERT INTO `pdf` (fk_user_id, pdf_file)
--     VALUES (p_fk_user_id, p_pdf_file);
    
--     SET new_pdf_id = LAST_INSERT_ID();
    
--     RETURN new_pdf_id;
-- END //

-- DELIMITER ;
DELIMITER //

CREATE FUNCTION InsertUserAndGetID(
    p_name VARCHAR(255),
    dob date,
    d_id int,
    p_email VARCHAR(255),
    p_address VARCHAR(255),
    gender VARCHAR(255),
    p_contact BIGINT,
    password VARCHAR(255)
)
RETURNS INT
BEGIN
    DECLARE new_user_id INT;
    
    INSERT INTO patient ( p_name,address,gender,dob,p_email,p_contact,d_id,password)
    VALUES (p_name, address,gender,dob, p_email, p_contact,d_id,password);
    
    SET new_user_id = LAST_INSERT_ID();
    
    RETURN new_user_id;
END //

DELIMITER ;

DELIMITER //
CREATE FUNCTION SetAppointmentAndGetID(
    p_id int,
    d_id int,
    a_date date,
    a_time time,
    description VARCHAR(255)
)
RETURNS INT
BEGIN
    DECLARE given_a_id INT;

    INSERT INTO appointment(p_id,d_id,a_date,a_time,description) 
    VALUES (p_id,d_id,a_date,a_time,description);

    SET given_a_id=LAST_INSERT_ID();

    RETURN given_a_id;

END //

DELIMITER ;

DELIMITER //
CREATE FUNCTION SetRecordAndGetID(
    p_id int,
    d_id int,
    dov date,
    prescription VARCHAR(255),
    diagnosis VARCHAR(255)
)
RETURNS INT
BEGIN
    DECLARE given_r_id INT;

    INSERT INTO medical_records(p_id,d_id,dov,prescription,diagnosis) 
    VALUES (p_id,d_id,dov,prescription,diagnosis);

    SET given_r_id=LAST_INSERT_ID();

    RETURN given_r_id;
END //





