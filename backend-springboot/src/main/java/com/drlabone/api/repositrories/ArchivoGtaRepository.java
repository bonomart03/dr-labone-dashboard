package com.drlabone.api.repositories;

import com.drlabone.api.models.ArchivoGta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArchivoGtaRepository extends JpaRepository<ArchivoGta, Long> {
}