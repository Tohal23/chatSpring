package com.project.chat.model;

public class Message {
    private String author;
    private String text;
    private MessageType type;

    public enum MessageType {
        MESSAGE,
        JOIN,
        LEFT
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }
}
