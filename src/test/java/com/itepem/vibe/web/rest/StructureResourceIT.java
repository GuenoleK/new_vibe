package com.itepem.vibe.web.rest;

import com.itepem.vibe.VibeApp;
import com.itepem.vibe.domain.Structure;
import com.itepem.vibe.repository.StructureRepository;
import com.itepem.vibe.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static com.itepem.vibe.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link StructureResource} REST controller.
 */
@SpringBootTest(classes = VibeApp.class)
public class StructureResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private StructureRepository structureRepository;

    @Mock
    private StructureRepository structureRepositoryMock;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restStructureMockMvc;

    private Structure structure;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StructureResource structureResource = new StructureResource(structureRepository);
        this.restStructureMockMvc = MockMvcBuilders.standaloneSetup(structureResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Structure createEntity(EntityManager em) {
        Structure structure = new Structure()
            .name(DEFAULT_NAME);
        return structure;
    }

    @BeforeEach
    public void initTest() {
        structure = createEntity(em);
    }

    @Test
    @Transactional
    public void createStructure() throws Exception {
        int databaseSizeBeforeCreate = structureRepository.findAll().size();

        // Create the Structure
        restStructureMockMvc.perform(post("/api/structures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(structure)))
            .andExpect(status().isCreated());

        // Validate the Structure in the database
        List<Structure> structureList = structureRepository.findAll();
        assertThat(structureList).hasSize(databaseSizeBeforeCreate + 1);
        Structure testStructure = structureList.get(structureList.size() - 1);
        assertThat(testStructure.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createStructureWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = structureRepository.findAll().size();

        // Create the Structure with an existing ID
        structure.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStructureMockMvc.perform(post("/api/structures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(structure)))
            .andExpect(status().isBadRequest());

        // Validate the Structure in the database
        List<Structure> structureList = structureRepository.findAll();
        assertThat(structureList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = structureRepository.findAll().size();
        // set the field null
        structure.setName(null);

        // Create the Structure, which fails.

        restStructureMockMvc.perform(post("/api/structures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(structure)))
            .andExpect(status().isBadRequest());

        List<Structure> structureList = structureRepository.findAll();
        assertThat(structureList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllStructures() throws Exception {
        // Initialize the database
        structureRepository.saveAndFlush(structure);

        // Get all the structureList
        restStructureMockMvc.perform(get("/api/structures?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(structure.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllStructuresWithEagerRelationshipsIsEnabled() throws Exception {
        StructureResource structureResource = new StructureResource(structureRepositoryMock);
        when(structureRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restStructureMockMvc = MockMvcBuilders.standaloneSetup(structureResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restStructureMockMvc.perform(get("/api/structures?eagerload=true"))
        .andExpect(status().isOk());

        verify(structureRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllStructuresWithEagerRelationshipsIsNotEnabled() throws Exception {
        StructureResource structureResource = new StructureResource(structureRepositoryMock);
            when(structureRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restStructureMockMvc = MockMvcBuilders.standaloneSetup(structureResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restStructureMockMvc.perform(get("/api/structures?eagerload=true"))
        .andExpect(status().isOk());

            verify(structureRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getStructure() throws Exception {
        // Initialize the database
        structureRepository.saveAndFlush(structure);

        // Get the structure
        restStructureMockMvc.perform(get("/api/structures/{id}", structure.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(structure.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStructure() throws Exception {
        // Get the structure
        restStructureMockMvc.perform(get("/api/structures/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStructure() throws Exception {
        // Initialize the database
        structureRepository.saveAndFlush(structure);

        int databaseSizeBeforeUpdate = structureRepository.findAll().size();

        // Update the structure
        Structure updatedStructure = structureRepository.findById(structure.getId()).get();
        // Disconnect from session so that the updates on updatedStructure are not directly saved in db
        em.detach(updatedStructure);
        updatedStructure
            .name(UPDATED_NAME);

        restStructureMockMvc.perform(put("/api/structures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStructure)))
            .andExpect(status().isOk());

        // Validate the Structure in the database
        List<Structure> structureList = structureRepository.findAll();
        assertThat(structureList).hasSize(databaseSizeBeforeUpdate);
        Structure testStructure = structureList.get(structureList.size() - 1);
        assertThat(testStructure.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingStructure() throws Exception {
        int databaseSizeBeforeUpdate = structureRepository.findAll().size();

        // Create the Structure

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStructureMockMvc.perform(put("/api/structures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(structure)))
            .andExpect(status().isBadRequest());

        // Validate the Structure in the database
        List<Structure> structureList = structureRepository.findAll();
        assertThat(structureList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStructure() throws Exception {
        // Initialize the database
        structureRepository.saveAndFlush(structure);

        int databaseSizeBeforeDelete = structureRepository.findAll().size();

        // Delete the structure
        restStructureMockMvc.perform(delete("/api/structures/{id}", structure.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Structure> structureList = structureRepository.findAll();
        assertThat(structureList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Structure.class);
        Structure structure1 = new Structure();
        structure1.setId(1L);
        Structure structure2 = new Structure();
        structure2.setId(structure1.getId());
        assertThat(structure1).isEqualTo(structure2);
        structure2.setId(2L);
        assertThat(structure1).isNotEqualTo(structure2);
        structure1.setId(null);
        assertThat(structure1).isNotEqualTo(structure2);
    }
}
