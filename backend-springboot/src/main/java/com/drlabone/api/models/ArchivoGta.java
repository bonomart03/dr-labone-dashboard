package com.drlabone.api.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "archivo_gta")
public class ArchivoGta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El título es obligatorio")
    private String titulo;

    private String categoria; // Ej: Easter Egg, Curiosidad, Mito, Comparación
    
    private String juego; // Ej: GTA V, GTA San Andreas, Varios

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    private String imagenUrl;
    
    private String videoUrl; // Por si quiere vincular el video exacto donde habla de esto

    // Si es true, se ve en la web. Si es false, queda como borrador en tu panel.
    private boolean publicado = true;

    public ArchivoGta() {}

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public String getJuego() { return juego; }
    public void setJuego(String juego) { this.juego = juego; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getImagenUrl() { return imagenUrl; }
    public void setImagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; }

    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }

    public boolean isPublicado() { return publicado; }
    public void setPublicado(boolean publicado) { this.publicado = publicado; }
}