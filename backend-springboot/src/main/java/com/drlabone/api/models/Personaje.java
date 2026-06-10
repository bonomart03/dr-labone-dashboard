package com.drlabone.api.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "personajes")
public class Personaje {

    // Clave Primaria Autoincremental
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Validación: El nombre no puede estar vacío
    @NotBlank(message = "El nombre del personaje es obligatorio")
    private String nombre;

    // Almacenamos el Enum como un texto (String) en la base de datos SQL
    @Enumerated(EnumType.STRING)
    private TipoPersonaje tipo; 

    // Permite textos largos (más de 255 caracteres)
    @Column(columnDefinition = "TEXT")
    private String descripcion;

    // Rutas de los archivos multimedia
    private String imagenUrl;
    private String audioEasterEggUrl; 

    // ===============================
    // CONSTRUCTOR VACÍO (Requerido por JPA)
    // ===============================
    public Personaje() {
    }

    // ===============================
    // GETTERS Y SETTERS
    // ===============================
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public TipoPersonaje getTipo() {
        return tipo;
    }

    public void setTipo(TipoPersonaje tipo) {
        this.tipo = tipo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    public String getAudioEasterEggUrl() {
        return audioEasterEggUrl;
    }

    public void setAudioEasterEggUrl(String audioEasterEggUrl) {
        this.audioEasterEggUrl = audioEasterEggUrl;
    }
}

// Enum para restringir los tipos de personajes permitidos
enum TipoPersonaje {
    MUÑECO, MASCOTA, TRIBUTO
}