package com.itepem.vibe.web.rest;

import com.itepem.vibe.VibeApp;

import com.itepem.vibe.domain.VibeUser;
import com.itepem.vibe.repository.VibeUserRepository;
import com.itepem.vibe.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.itepem.vibe.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the VibeUserResource REST controller.
 *
 * @see VibeUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VibeApp.class)
public class VibeUserResourceIntTest {

    private static final String DEFAULT_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME = "BBBBBBBBBB";

    @Autowired
    private VibeUserRepository vibeUserRepository;

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

    private MockMvc restVibeUserMockMvc;

    private VibeUser vibeUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VibeUserResource vibeUserResource = new VibeUserResource(vibeUserRepository);
        this.restVibeUserMockMvc = MockMvcBuilders.standaloneSetup(vibeUserResource)
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
    public static VibeUser createEntity(EntityManager em) {
        VibeUser vibeUser = new VibeUser()
            .username(DEFAULT_USERNAME);
        return vibeUser;
    }

    @Before
    public void initTest() {
        vibeUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createVibeUser() throws Exception {
        int databaseSizeBeforeCreate = vibeUserRepository.findAll().size();

        // Create the VibeUser
        restVibeUserMockMvc.perform(post("/api/vibe-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vibeUser)))
            .andExpect(status().isCreated());

        // Validate the VibeUser in the database
        List<VibeUser> vibeUserList = vibeUserRepository.findAll();
        assertThat(vibeUserList).hasSize(databaseSizeBeforeCreate + 1);
        VibeUser testVibeUser = vibeUserList.get(vibeUserList.size() - 1);
        assertThat(testVibeUser.getUsername()).isEqualTo(DEFAULT_USERNAME);
    }

    @Test
    @Transactional
    public void createVibeUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vibeUserRepository.findAll().size();

        // Create the VibeUser with an existing ID
        vibeUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVibeUserMockMvc.perform(post("/api/vibe-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vibeUser)))
            .andExpect(status().isBadRequest());

        // Validate the VibeUser in the database
        List<VibeUser> vibeUserList = vibeUserRepository.findAll();
        assertThat(vibeUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkUsernameIsRequired() throws Exception {
        int databaseSizeBeforeTest = vibeUserRepository.findAll().size();
        // set the field null
        vibeUser.setUsername(null);

        // Create the VibeUser, which fails.

        restVibeUserMockMvc.perform(post("/api/vibe-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vibeUser)))
            .andExpect(status().isBadRequest());

        List<VibeUser> vibeUserList = vibeUserRepository.findAll();
        assertThat(vibeUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVibeUsers() throws Exception {
        // Initialize the database
        vibeUserRepository.saveAndFlush(vibeUser);

        // Get all the vibeUserList
        restVibeUserMockMvc.perform(get("/api/vibe-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vibeUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME.toString())));
    }
    
    @Test
    @Transactional
    public void getVibeUser() throws Exception {
        // Initialize the database
        vibeUserRepository.saveAndFlush(vibeUser);

        // Get the vibeUser
        restVibeUserMockMvc.perform(get("/api/vibe-users/{id}", vibeUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vibeUser.getId().intValue()))
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVibeUser() throws Exception {
        // Get the vibeUser
        restVibeUserMockMvc.perform(get("/api/vibe-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVibeUser() throws Exception {
        // Initialize the database
        vibeUserRepository.saveAndFlush(vibeUser);

        int databaseSizeBeforeUpdate = vibeUserRepository.findAll().size();

        // Update the vibeUser
        VibeUser updatedVibeUser = vibeUserRepository.findById(vibeUser.getId()).get();
        // Disconnect from session so that the updates on updatedVibeUser are not directly saved in db
        em.detach(updatedVibeUser);
        updatedVibeUser
            .username(UPDATED_USERNAME);

        restVibeUserMockMvc.perform(put("/api/vibe-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVibeUser)))
            .andExpect(status().isOk());

        // Validate the VibeUser in the database
        List<VibeUser> vibeUserList = vibeUserRepository.findAll();
        assertThat(vibeUserList).hasSize(databaseSizeBeforeUpdate);
        VibeUser testVibeUser = vibeUserList.get(vibeUserList.size() - 1);
        assertThat(testVibeUser.getUsername()).isEqualTo(UPDATED_USERNAME);
    }

    @Test
    @Transactional
    public void updateNonExistingVibeUser() throws Exception {
        int databaseSizeBeforeUpdate = vibeUserRepository.findAll().size();

        // Create the VibeUser

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVibeUserMockMvc.perform(put("/api/vibe-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vibeUser)))
            .andExpect(status().isBadRequest());

        // Validate the VibeUser in the database
        List<VibeUser> vibeUserList = vibeUserRepository.findAll();
        assertThat(vibeUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVibeUser() throws Exception {
        // Initialize the database
        vibeUserRepository.saveAndFlush(vibeUser);

        int databaseSizeBeforeDelete = vibeUserRepository.findAll().size();

        // Delete the vibeUser
        restVibeUserMockMvc.perform(delete("/api/vibe-users/{id}", vibeUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<VibeUser> vibeUserList = vibeUserRepository.findAll();
        assertThat(vibeUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VibeUser.class);
        VibeUser vibeUser1 = new VibeUser();
        vibeUser1.setId(1L);
        VibeUser vibeUser2 = new VibeUser();
        vibeUser2.setId(vibeUser1.getId());
        assertThat(vibeUser1).isEqualTo(vibeUser2);
        vibeUser2.setId(2L);
        assertThat(vibeUser1).isNotEqualTo(vibeUser2);
        vibeUser1.setId(null);
        assertThat(vibeUser1).isNotEqualTo(vibeUser2);
    }
}
