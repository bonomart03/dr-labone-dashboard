package com.drlabone.api.repositories;

import com.drlabone.api.models.ObjetoMuseo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ObjetoMuseoRepository extends JpaRepository<ObjetoMuseo, Long> {
    // JpaRepository ya nos regala los métodos findAll(), findById(), save() y deleteById()
}