CREATE TABLE Users (
    user_id SERIAL,
    user_name VARCHAR(30) NOT NULL,
    password text NOT NULL,
    email VARCHAR(319) NOT NULL,
    date_registered DATE DEFAULT CURRENT_DATE NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE Forum (
    forum_id SERIAL,
    forum_name VARCHAR(30) UNIQUE NOT NULL,
    forum_description TEXT,
    date_created DATE DEFAULT CURRENT_DATE NOT NULL,
    PRIMARY KEY (forum_id)
);

CREATE TABLE Topic (
    topic_id SERIAL,
    forum_id SERIAL,
    topic_name VARCHAR(50) NOT NULL,
    topic_description TEXT,
    PRIMARY KEY (topic_id),
    FOREIGN KEY (forum_id) REFERENCES Forum(forum_id)
);

CREATE TABLE Post (
    post_id SERIAL,
    forum_id SERIAL,
    topic_id SERIAL,
    user_id SERIAL,
    content TEXT NOT NULL,
    timestamp_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    original_post_id SERIAL,
    reply_post_id SERIAL,
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (original_post_id) REFERENCES Post(post_id),
    FOREIGN KEY (reply_post_id) REFERENCES Post(post_id)
);