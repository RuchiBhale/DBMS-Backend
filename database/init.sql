 create table doctor(
 d_id int primary key auto_increment,
 name varchar(255),
 contact_no bigint,
 email varchar(255),
 working_hrs int,
 specialization varchar(255)
 );


create table patient(
p_id int primary key auto_increment,
p_name varchar(255),
address varchar(255),
gender varchar(255),
dob date,
p_email varchar(255),
p_contact bigint,
d_id int, 
password varchar(255),
foreign key(d_id) references doctor(d_id)
);

create table medical_records(r_id int primary key auto_increment,
p_id int, 
d_id int,
dov date,
prescription varchar(255),
diagnosis varchar(255),
foreign key(p_id) references patient(p_id),foreign key(d_id) references doctor(d_id));

create table appointment(a_id int primary key auto_increment,
p_id int,
d_id int,
a_date date,
a_time time,
description varchar(255),
foreign key(p_id) references patient(p_id),foreign key(d_id) references doctor(d_id));

-- CREATE TABLE `interaction` (
--   `interaction_id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
--   `fk_user_id` int,
--   `fk_collection_id` int,
--   `timestamp` datetime DEFAULT (now()),
--   `interaction_type` varchar(255),
--   `interaction_details` varchar(255)
-- );



-- ALTER TABLE `query` ADD FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`);

-- ALTER TABLE `query` ADD FOREIGN KEY (`fk_pdf_id`) REFERENCES `pdf` (`pdf_id`);

-- ALTER TABLE `admin` ADD FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`);

-- ALTER TABLE `pdf` ADD FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`);

-- ALTER TABLE `collection` ADD FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`);

-- ALTER TABLE `collection` ADD FOREIGN KEY (`fk_pdf_id`) REFERENCES `pdf` (`pdf_id`);

-- ALTER TABLE `interaction` ADD FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`);

-- ALTER TABLE `interaction` ADD FOREIGN KEY (`fk_collection_id`) REFERENCES `collection` (`collection_id`);

-- -- ALTER TABLE `sso_tokens` ADD FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`);