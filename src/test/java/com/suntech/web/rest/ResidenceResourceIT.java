package com.suntech.web.rest;

import com.suntech.CityResidencesTrackApp;
import com.suntech.domain.Residence;
import com.suntech.repository.ResidenceRepository;
import com.suntech.service.ResidenceService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ResidenceResource} REST controller.
 */
@SpringBootTest(classes = CityResidencesTrackApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ResidenceResourceIT {

    private static final String DEFAULT_ZIPCODE = "00724808";
    private static final String UPDATED_ZIPCODE = "46265273";

    private static final String DEFAULT_STREET_NUMBER = "23";
    private static final String UPDATED_STREET_NUMBER = "32";

    private static final Double DEFAULT_LATITUDE = 1D;
    private static final Double UPDATED_LATITUDE = 2D;

    private static final Double DEFAULT_LONGITUDE = 1D;
    private static final Double UPDATED_LONGITUDE = 2D;

    private static final Integer DEFAULT_RESIDENTS = 1;
    private static final Integer UPDATED_RESIDENTS = 2;

    private static final UUID DEFAULT_UID = UUID.randomUUID();

    @Autowired
    private ResidenceRepository residenceRepository;

    @Autowired
    private ResidenceService residenceService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restResidenceMockMvc;

    private Residence residence;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Residence createEntity(EntityManager em) {
        Residence residence = Residence.builder()
            .zipcode(DEFAULT_ZIPCODE)
            .streetNumber(DEFAULT_STREET_NUMBER)
            .latitude(DEFAULT_LATITUDE)
            .longitude(DEFAULT_LONGITUDE)
            .residents(DEFAULT_RESIDENTS)
            .build();
        return residence;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Residence createUpdatedEntity(EntityManager em) {
        Residence residence = Residence.builder()
            .zipcode(UPDATED_ZIPCODE)
            .streetNumber(UPDATED_STREET_NUMBER)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE)
            .residents(UPDATED_RESIDENTS)
            .build();
        return residence;
    }

    @BeforeEach
    public void initTest() {
        residence = createEntity(em);
    }

    @Test
    @Transactional
    public void createResidence() throws Exception {
        int databaseSizeBeforeCreate = residenceRepository.findAll().size();
        // Create the Residence
        restResidenceMockMvc.perform(post("/api/residences")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(residence)))
            .andExpect(status().isCreated());

        // Validate the Residence in the database
        List<Residence> residenceList = residenceRepository.findAll();
        assertThat(residenceList).hasSize(databaseSizeBeforeCreate + 1);
        Residence testResidence = residenceList.get(residenceList.size() - 1);
        assertThat(testResidence.getZipcode()).isEqualTo(DEFAULT_ZIPCODE);
        assertThat(testResidence.getStreetNumber()).isEqualTo(DEFAULT_STREET_NUMBER);
        assertThat(testResidence.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testResidence.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
        assertThat(testResidence.getResidents()).isEqualTo(DEFAULT_RESIDENTS);
    }

    @Test
    @Transactional
    public void createResidenceWithExistingId() throws Exception {
        residenceRepository.saveAndFlush(residence);
        final List<Residence> residences = residenceRepository.findAll();
        int databaseSizeBeforeCreate = residences.size();

        // Create the Residence with an existing ID
        residence.setId(residences.get(0).getId());

        // An entity with an existing ID cannot be created, so this API call must fail
        restResidenceMockMvc.perform(post("/api/residences")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(residence)))
            .andExpect(status().isBadRequest());

        // Validate the Residence in the database
        List<Residence> residenceList = residenceRepository.findAll();
        assertThat(residenceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLatitudeIsRequired() throws Exception {
        int databaseSizeBeforeTest = residenceRepository.findAll().size();
        // set the field null
        residence.setLatitude(null);

        // Create the Residence, which fails.


        restResidenceMockMvc.perform(post("/api/residences")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(residence)))
            .andExpect(status().isBadRequest());

        List<Residence> residenceList = residenceRepository.findAll();
        assertThat(residenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLongitudeIsRequired() throws Exception {
        int databaseSizeBeforeTest = residenceRepository.findAll().size();
        // set the field null
        residence.setLongitude(null);

        // Create the Residence, which fails.


        restResidenceMockMvc.perform(post("/api/residences")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(residence)))
            .andExpect(status().isBadRequest());

        List<Residence> residenceList = residenceRepository.findAll();
        assertThat(residenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkResidentsIsRequired() throws Exception {
        int databaseSizeBeforeTest = residenceRepository.findAll().size();
        // set the field null
        residence.setResidents(null);

        // Create the Residence, which fails.


        restResidenceMockMvc.perform(post("/api/residences")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(residence)))
            .andExpect(status().isBadRequest());

        List<Residence> residenceList = residenceRepository.findAll();
        assertThat(residenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllResidences() throws Exception {
        // Initialize the database
        residenceRepository.saveAndFlush(residence);

        // Get all the residenceList
        restResidenceMockMvc.perform(get("/api/residences?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(residence.getId().toString())))
            .andExpect(jsonPath("$.[*].zipcode").value(hasItem(DEFAULT_ZIPCODE)))
            .andExpect(jsonPath("$.[*].streetNumber").value(hasItem(DEFAULT_STREET_NUMBER)))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE)))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE)))
            .andExpect(jsonPath("$.[*].residents").value(hasItem(DEFAULT_RESIDENTS)));
    }

    @Test
    @Transactional
    public void getResidence() throws Exception {
        // Initialize the database
        residenceRepository.saveAndFlush(residence);

        // Get the residence
        restResidenceMockMvc.perform(get("/api/residences/{id}", residence.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(residence.getId().toString()))
            .andExpect(jsonPath("$.zipcode").value(DEFAULT_ZIPCODE))
            .andExpect(jsonPath("$.streetNumber").value(DEFAULT_STREET_NUMBER))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE.doubleValue()))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE.doubleValue()))
            .andExpect(jsonPath("$.residents").value(DEFAULT_RESIDENTS));
    }
    @Test
    @Transactional
    public void getNonExistingResidence() throws Exception {
        // Get the residence
        restResidenceMockMvc.perform(get("/api/residences/{id}", UUID.randomUUID()))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateResidence() throws Exception {
        // Initialize the database
        residenceService.save(residence);

        int databaseSizeBeforeUpdate = residenceRepository.findAll().size();

        // Update the residence
        Residence updatedResidence = residenceRepository.findById(residence.getId()).get();
        // Disconnect from session so that the updates on updatedResidence are not directly saved in db
        em.detach(updatedResidence);

        updatedResidence
            .zipcode(UPDATED_ZIPCODE)
            .streetNumber(UPDATED_STREET_NUMBER)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE)
            .residents(UPDATED_RESIDENTS);

        restResidenceMockMvc.perform(put("/api/residences")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedResidence)))
            .andExpect(status().isOk());

        // Validate the Residence in the database
        List<Residence> residenceList = residenceRepository.findAll();
        assertThat(residenceList).hasSize(databaseSizeBeforeUpdate);
        Residence testResidence = residenceList.get(residenceList.size() - 1);
        assertThat(testResidence.getZipcode()).isEqualTo(UPDATED_ZIPCODE);
        assertThat(testResidence.getStreetNumber()).isEqualTo(UPDATED_STREET_NUMBER);
        assertThat(testResidence.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testResidence.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
        assertThat(testResidence.getResidents()).isEqualTo(UPDATED_RESIDENTS);
    }

    @Test
    @Transactional
    public void updateNonExistingResidence() throws Exception {
        int databaseSizeBeforeUpdate = residenceRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restResidenceMockMvc.perform(put("/api/residences")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(residence)))
            .andExpect(status().isBadRequest());

        // Validate the Residence in the database
        List<Residence> residenceList = residenceRepository.findAll();
        assertThat(residenceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteResidence() throws Exception {
        // Initialize the database
        residenceService.save(residence);

        int databaseSizeBeforeDelete = residenceRepository.findAll().size();

        // Delete the residence
        restResidenceMockMvc.perform(delete("/api/residences/{id}", residence.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Residence> residenceList = residenceRepository.findAll();
        assertThat(residenceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
