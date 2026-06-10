package com.drlabone.api.models;

import jakarta.persistence.*;

@Entity
@Table(name = "configuraciones")
public class Configuracion {

    @Id
    private String clave; // Acá guardaremos el identificador, ej: "VIDEO_INICIO"

    @Column(columnDefinition = "TEXT")
    private String valor; // Acá guardaremos la URL de YouTube

    // Constructor vacío
    public Configuracion() {
    }

    // Constructor con parámetros
    public Configuracion(String clave, String valor) {
        this.clave = clave;
        this.valor = valor;
    }

    // Getters y Setters
    public String getClave() { return clave; }
    public void setClave(String clave) { this.clave = clave; }

    public String getValor() { return valor; }
    public void setValor(String valor) { this.valor = valor; }
}