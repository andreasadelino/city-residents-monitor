package com.suntech.web.rest;

import com.suntech.domain.Residence;
import com.suntech.service.ResidenceService;
import com.suntech.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * REST controller for managing {@link com.suntech.domain.Residence}.
 */
@RestController
@RequestMapping("/api")
public class ResidenceResource {

    private final Logger log = LoggerFactory.getLogger(ResidenceResource.class);

    private static final String ENTITY_NAME = "residence";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ResidenceService residenceService;

    public ResidenceResource(ResidenceService residenceService) {
        this.residenceService = residenceService;
    }

    /**
     * {@code POST  /residences} : Create a new residence.
     *
     * @param residence the residence to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new residence, or with status {@code 400 (Bad Request)} if the residence has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/residences")
    public ResponseEntity<Residence> createResidence(@Valid @RequestBody Residence residence) throws URISyntaxException {
        log.debug("REST request to save Residence : {}", residence);
        if (residence.getId() != null) {
            throw new BadRequestAlertException("A new residence cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Residence result = residenceService.save(residence);
        return ResponseEntity.created(new URI("/api/residences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /residences} : Updates an existing residence.
     *
     * @param residence the residence to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated residence,
     * or with status {@code 400 (Bad Request)} if the residence is not valid,
     * or with status {@code 500 (Internal Server Error)} if the residence couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/residences")
    public ResponseEntity<Residence> updateResidence(@Valid @RequestBody Residence residence) throws URISyntaxException {
        log.debug("REST request to update Residence : {}", residence);
        if (residence.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Residence result = residenceService.save(residence);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, residence.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /residences} : get all the residences.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of residences in body.
     */
    @GetMapping("/residences")
    public List<Residence> getAllResidences() {
        log.debug("REST request to get all Residences");
        return residenceService.findAll();
    }

    /**
     * {@code GET  /residences/:id} : get the "id" residence.
     *
     * @param id the id of the residence to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the residence, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/residences/{id}")
    public ResponseEntity<Residence> getResidence(@PathVariable UUID id) {
        log.debug("REST request to get Residence : {}", id);
        Optional<Residence> residence = residenceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(residence);
    }

    /**
     * {@code DELETE  /residences/:id} : delete the "id" residence.
     *
     * @param id the id of the residence to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/residences/{id}")
    public ResponseEntity<Void> deleteResidence(@PathVariable UUID id) {
        log.debug("REST request to delete Residence : {}", id);
        residenceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/residences/coordinates")
    public ResponseEntity<List<ResidenceService.ResidentHeatValue>> getAllCoordinates() {
        return ResponseEntity.ok(residenceService.getAllCoordinates());
    }

}
