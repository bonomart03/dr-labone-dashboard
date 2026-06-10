package com.drlabone.api.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "objetos_museo")
public class ObjetoMuseo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre del objeto es obligatorio")
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    private Integer anio; // Año aproximado del objeto o de la restauración

    // URLs para el paralelismo visual en el frontend
    private String imagenAntesUrl;
    private String imagenDespuesUrl;

    // Constructor vacío requerido por JPA
    public ObjetoMuseo() {
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public Integer getAnio() { return anio; }
    public void setAnio(Integer anio) { this.anio = anio; }

    public String getImagenAntesUrl() { return imagenAntesUrl; }
    public void setImagenAntesUrl(String imagenAntesUrl) { this.imagenAntesUrl = imagenAntesUrl; }

    public String getImagenDespuesUrl() { return imagenDespuesUrl; }
    public void setImagenDespuesUrl(String imagenDespuesUrl) { this.imagenDespuesUrl = imagenDespuesUrl; }
}