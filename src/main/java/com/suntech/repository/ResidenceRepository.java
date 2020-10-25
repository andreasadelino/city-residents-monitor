package com.suntech.repository;

import com.suntech.domain.Residence;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Spring Data  repository for the Residence entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResidenceRepository extends JpaRepository<Residence, UUID> {
}
