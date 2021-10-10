package com.molveo.hotel.exception;

public class ApplicationException extends Exception{
    public ApplicationException(){
        super();
    }

    public ApplicationException(String message){
        super(message);
    }
}