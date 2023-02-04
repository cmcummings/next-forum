CREATE TABLE Users (
    user_id SERIAL,
    user_name VARCHAR(30) NOT NULL,
    password text NOT NULL,
    email VARCHAR(319) NOT NULL,
    date_registered DATE DEFAULT CURRENT_DATE NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE Chatroom (
    chatroom_id SERIAL,
    chatroom_name VARCHAR(50),
    date_created DATE DEFAULT CURRENT_DATE NOT NULL,
    PRIMARY KEY (chatroom_id)
);

CREATE TABLE Message (
    message_id SERIAL,
    user_id SERIAL,
    chatroom_id SERIAL,
    content TEXT,
    time_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (message_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id),
    FOREIGN KEY (chatroom_id) REFERENCES Chatroom (chatroom_id)
);

CREATE TABLE User_In_Chatroom (
    user_id SERIAL,
    chatroom_id SERIAL,
    date_joined DATE DEFAULT CURRENT_DATE NOT NULL,
    is_owner BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES Users (user_id),
    FOREIGN KEY (chatroom_id) REFERENCES Chatroom (chatroom_id)
);
