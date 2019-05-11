package com.itepem.vibe.web.rest;

import com.itepem.vibe.VibeApp;
import com.itepem.vibe.domain.UserRoleStructure;
import com.itepem.vibe.repository.UserRoleStructureRepository;
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
 * Integration tests for the {@Link UserRoleStructureResource} REST controller.
 */
@SpringBootTest(classes = VibeApp.class)
public class UserRoleStructureResourceIT {

    @Autowired
    private UserRoleStructureRepository userRoleStructureRepository;

    @Mock
    private UserRoleStructureRepository userRoleStructureRepositoryMock;

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

    private MockMvc restUserRoleStructureMockMvc;

    private UserRoleStructure userRoleStructure;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserRoleStructureResource userRoleStructureResource = new UserRoleStructureResource(userRoleStructureRepository);
        this.restUserRoleStructureMockMvc = MockMvcBuilders.standaloneSetup(userRoleStructureResource)
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
    public static UserRoleStructure createEntity(EntityManager em) {
        UserRoleStructure userRoleStructure = new UserRoleStructure();
        return userRoleStructure;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserRoleStructure createUpdatedEntity(EntityManager em) {
        UserRoleStructure userRoleStructure = new UserRoleStructure();
        return userRoleStructure;
    }

    @BeforeEach
    public void initTest() {
        userRoleStructure = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserRoleStructure() throws Exception {
        int databaseSizeBeforeCreate = userRoleStructureRepository.findAll().size();

        // Create the UserRoleStructure
        restUserRoleStructureMockMvc.perform(post("/api/user-role-structures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRoleStructure)))
            .andExpect(status().isCreated());

        // Validate the UserRoleStructure in the database
        List<UserRoleStructure> userRoleStructureList = userRoleStructureRepository.findAll();
        assertThat(userRoleStructureList).hasSize(databaseSizeBeforeCreate + 1);
        UserRoleStructure testUserRoleStructure = userRoleStructureList.get(userRoleStructureList.size() - 1);
    }

    @Test
    @Transactional
    public void createUserRoleStructureWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userRoleStructureRepository.findAll().size();

        // Create the UserRoleStructure with an existing ID
        userRoleStructure.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserRoleStructureMockMvc.perform(post("/api/user-role-structures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRoleStructure)))
            .andExpect(status().isBadRequest());

        // Validate the UserRoleStructure in the database
        List<UserRoleStructure> userRoleStructureList = userRoleStructureRepository.findAll();
        assertThat(userRoleStructureList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUserRoleStructures() throws Exception {
        // Initialize the database
        userRoleStructureRepository.saveAndFlush(userRoleStructure);

        // Get all the userRoleStructureList
        restUserRoleStructureMockMvc.perform(get("/api/user-role-structures?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userRoleStructure.getId().intValue())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllUserRoleStructuresWithEagerRelationshipsIsEnabled() throws Exception {
        UserRoleStructureResource userRoleStructureResource = new UserRoleStructureResource(userRoleStructureRepositoryMock);
        when(userRoleStructureRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restUserRoleStructureMockMvc = MockMvcBuilders.standaloneSetup(userRoleStructureResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restUserRoleStructureMockMvc.perform(get("/api/user-role-structures?eagerload=true"))
        .andExpect(status().isOk());

        verify(userRoleStructureRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllUserRoleStructuresWithEagerRelationshipsIsNotEnabled() throws Exception {
        UserRoleStructureResource userRoleStructureResource = new UserRoleStructureResource(userRoleStructureRepositoryMock);
            when(userRoleStructureRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restUserRoleStructureMockMvc = MockMvcBuilders.standaloneSetup(userRoleStructureResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restUserRoleStructureMockMvc.perform(get("/api/user-role-structures?eagerload=true"))
        .andExpect(status().isOk());

            verify(userRoleStructureRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getUserRoleStructure() throws Exception {
        // Initialize the database
        userRoleStructureRepository.saveAndFlush(userRoleStructure);

        // Get the userRoleStructure
        restUserRoleStructureMockMvc.perform(get("/api/user-role-structures/{id}", userRoleStructure.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userRoleStructure.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUserRoleStructure() throws Exception {
        // Get the userRoleStructure
        restUserRoleStructureMockMvc.perform(get("/api/user-role-structures/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserRoleStructure() throws Exception {
        // Initialize the database
        userRoleStructureRepository.saveAndFlush(userRoleStructure);

        int databaseSizeBeforeUpdate = userRoleStructureRepository.findAll().size();

        // Update the userRoleStructure
        UserRoleStructure updatedUserRoleStructure = userRoleStructureRepository.findById(userRoleStructure.getId()).get();
        // Disconnect from session so that the updates on updatedUserRoleStructure are not directly saved in db
        em.detach(updatedUserRoleStructure);

        restUserRoleStructureMockMvc.perform(put("/api/user-role-structures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserRoleStructure)))
            .andExpect(status().isOk());

        // Validate the UserRoleStructure in the database
        List<UserRoleStructure> userRoleStructureList = userRoleStructureRepository.findAll();
        assertThat(userRoleStructureList).hasSize(databaseSizeBeforeUpdate);
        UserRoleStructure testUserRoleStructure = userRoleStructureList.get(userRoleStructureList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingUserRoleStructure() throws Exception {
        int databaseSizeBeforeUpdate = userRoleStructureRepository.findAll().size();

        // Create the UserRoleStructure

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserRoleStructureMockMvc.perform(put("/api/user-role-structures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRoleStructure)))
            .andExpect(status().isBadRequest());

        // Validate the UserRoleStructure in the database
        List<UserRoleStructure> userRoleStructureList = userRoleStructureRepository.findAll();
        assertThat(userRoleStructureList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserRoleStructure() throws Exception {
        // Initialize the database
        userRoleStructureRepository.saveAndFlush(userRoleStructure);

        int databaseSizeBeforeDelete = userRoleStructureRepository.findAll().size();

        // Delete the userRoleStructure
        restUserRoleStructureMockMvc.perform(delete("/api/user-role-structures/{id}", userRoleStructure.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<UserRoleStructure> userRoleStructureList = userRoleStructureRepository.findAll();
        assertThat(userRoleStructureList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserRoleStructure.class);
        UserRoleStructure userRoleStructure1 = new UserRoleStructure();
        userRoleStructure1.setId(1L);
        UserRoleStructure userRoleStructure2 = new UserRoleStructure();
        userRoleStructure2.setId(userRoleStructure1.getId());
        assertThat(userRoleStructure1).isEqualTo(userRoleStructure2);
        userRoleStructure2.setId(2L);
        assertThat(userRoleStructure1).isNotEqualTo(userRoleStructure2);
        userRoleStructure1.setId(null);
        assertThat(userRoleStructure1).isNotEqualTo(userRoleStructure2);
    }
}
