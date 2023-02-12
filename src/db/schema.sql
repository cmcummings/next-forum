CREATE TABLE Users (
    user_id SERIAL,
    user_name VARCHAR(30) UNIQUE NOT NULL,
    password text NOT NULL,
    email VARCHAR(319) NOT NULL,
    date_registered DATE DEFAULT CURRENT_DATE NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE Forum (
    forum_id SERIAL,
    forum_name VARCHAR(30) UNIQUE NOT NULL,
    forum_description TEXT,
    private BOOLEAN DEFAULT FALSE,
    date_created DATE DEFAULT CURRENT_DATE NOT NULL,
    PRIMARY KEY (forum_id)
);

/*
   User ranks:
   -200 = banned from viewing and posting
   -100 = banned from posting but able to view
    0   = default
    100 = member (relevant if forum is private)
    200 = mod (can delete messages)
    300 = admin (mod powers + can change topics, pin posts, assign mods, ban users)
    400 = owner (admin powers + can assign admins, change forum settings)
*/

CREATE TABLE User_In_Forum (
    user_id SERIAL,
    forum_id SERIAL,
    rank SMALLINT DEFAULT 0, 
    follows BOOLEAN DEFAULT FALSE, -- True = follows
    PRIMARY KEY (user_id, forum_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (forum_id) REFERENCES Forum(forum_id) ON DELETE CASCADE
);

CREATE TABLE Topic (
    topic_id SERIAL,
    forum_id SERIAL,
    topic_name VARCHAR(50) NOT NULL,
    topic_description TEXT,
    PRIMARY KEY (topic_id),
    FOREIGN KEY (forum_id) REFERENCES Forum(forum_id) ON DELETE CASCADE
);

CREATE TABLE Thread (
    thread_id SERIAL,
    forum_id SERIAL,
    topic_id SERIAL,
    title VARCHAR(300) NOT NULL,
    PRIMARY KEY (thread_id),
    FOREIGN KEY (forum_id) REFERENCES Forum(forum_id) ON DELETE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES Topic(topic_id) ON DELETE CASCADE
);

CREATE TABLE Post (
    post_id SERIAL,
    thread_id SERIAL,
    user_id SERIAL,
    original_post BOOLEAN DEFAULT FALSE,
    content TEXT NOT NULL,
    timestamp_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE, 
    FOREIGN KEY (thread_id) REFERENCES Thread(thread_id) ON DELETE CASCADE
);