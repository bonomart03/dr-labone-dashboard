package com.drlabone.api.repositories;

import com.drlabone.api.models.Personaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonajeRepository extends JpaRepository<Personaje, Long> {
    // Podés agregar métodos de búsqueda personalizados, ej:
    // List<Personaje> findByTipo(TipoPersonaje tipo);
}