CREATE TABLE profile (
     id varchar(36) PRIMARY KEY,
     email varchar(320) NOT NULL,
     name varchar(60) NOT NULL,
     description varchar(500),
     fb varchar(50),
     ig varchar(30)
);


CREATE TABLE video (
	id SERIAL PRIMARY KEY,
	profile_id varchar(36) NOT NULL REFERENCES profile(id) ON DELETE CASCADE,
	title varchar(100) NOT NULL,
	dt timestamp without time zone NOT NULL,
	description varchar(500),
	duration_hrs integer,
	duration_mins integer CHECK(duration_mins BETWEEN 0 and 59),
	duration_secs integer CHECK(duration_secs BETWEEN 0 and 59),
	likes integer DEFAULT 0,
	img_url text,
	video_url text NOT NULL
);

-- denormalized; title is repeated, should always be lowercase and stripped
CREATE TABLE tag (
	profile_id 	varchar(36) NOT NULL REFERENCES profile(id) ON DELETE CASCADE,
	title		varchar(100) NOT NULL,
	PRIMARY KEY (profile_id, title)
);
