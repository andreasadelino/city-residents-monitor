package com.suntech.service;

import com.suntech.domain.Residence;
import com.suntech.repository.ResidenceRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Residence}.
 */
@Service
@Transactional
public class ResidenceService {

    private final Logger log = LoggerFactory.getLogger(ResidenceService.class);

    private final ResidenceRepository residenceRepository;

    public ResidenceService(ResidenceRepository residenceRepository) {
        this.residenceRepository = residenceRepository;
    }

    /**
     * Save a residence.
     *
     * @param residence the entity to save.
     * @return the persisted entity.
     */
    public Residence save(Residence residence) {
        log.debug("Request to save Residence : {}", residence);
        return residenceRepository.save(residence);
    }

    /**
     * Get all the residences.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Residence> findAll() {
        log.debug("Request to get all Residences");
        return residenceRepository.findAll();
    }


    /**
     * Get one residence by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Residence> findOne(UUID id) {
        log.debug("Request to get Residence : {}", id);
        return residenceRepository.findById(id);
    }

    /**
     * Delete the residence by id.
     *
     * @param id the id of the entity.
     */
    public void delete(UUID id) {
        log.debug("Request to delete Residence : {}", id);
        residenceRepository.deleteById(id);
    }

    public List<ResidentHeatValue> getAllCoordinates() {
        final List<Residence> residencies = residenceRepository.findAll();

        final Integer higherResidentNumber = residencies.stream()
            .map(Residence::getResidents)
            .max(Comparator.comparingInt(value -> value))
            .orElse(null);

        return residencies
            .stream()
            .map(residence -> new ResidentHeatValue(
                residence.getLatitude(),
                residence.getLongitude(),
                (double) residence.getResidents() / higherResidentNumber)
            ).collect(Collectors.toList());
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ResidentHeatValue {
        Double latitude;
        Double longitude;
        Double cap;
    }
}
