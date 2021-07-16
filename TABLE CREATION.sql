DROP TABLE CWUR

CREATE TABLE CWUR (
		world_rank INT NOT NULL, 
		institution VARCHAR(60) NOT NULL, 
		country VARCHAR(20) NOT NULL, 
		national_rank INT NOT NULL,	
		quality_of_education INT NOT NULL,
		alumni_employment INT NOT NULL,
		quality_of_faculty INT NOT NULL,     
		publications INT NOT NULL,              
		influence INT NOT NULL,                 
		citations INT NOT NULL,                
		broad_impact DECIMAL,           
		patents INT NOT NULL,                 
		score DECIMAL NOT NULL,  
		year int NOT NULL 
		);
		
select * from CWUR;

DROP TABLE shanghai

CREATE TABLE shanghai (
		world_rank VARCHAR(30),
		university_name VARCHAR(100),     
		national_rank VARCHAR(20),    
		total_score DECIMAL,
		alumni DECIMAL,      
		award DECIMAL,      
		hici DECIMAL,    
		ns DECIMAL,       
		pcp DECIMAL,          
		year DECIMAL,
		blank varchar(20)
		);
		
SELECT * FROM shanghai

DROP TABLE times

CREATE TABLE times (
		world_rank VARCHAR(30),               
		university_name VARCHAR(100),   
		country VARCHAR(50),                    
		teaching VARCHAR(30),             
		international VARCHAR(30),            
		research VARCHAR(30),                 
		citations VARCHAR(30),                
		income VARCHAR(20),                   
		total_score VARCHAR(10),             
		num_students VARCHAR(50),             
		student_staff_ratio VARCHAR(30),     
		international_students VARCHAR(10),     
		female_male_ratio VARCHAR(30),        
		year DECIMAL 
		);
		
SELECT * FROM times

