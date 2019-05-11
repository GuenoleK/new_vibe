package com.itepem.vibe.web.rest;

import com.itepem.vibe.VibeApp;
import com.itepem.vibe.domain.ArticleMediaType;
import com.itepem.vibe.repository.ArticleMediaTypeRepository;
import com.itepem.vibe.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
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
 * Integration tests for the {@Link ArticleMediaTypeResource} REST controller.
 */
@SpringBootTest(classes = VibeApp.class)
public class ArticleMediaTypeResourceIT {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    @Autowired
    private ArticleMediaTypeRepository articleMediaTypeRepository;

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

    private MockMvc restArticleMediaTypeMockMvc;

    private ArticleMediaType articleMediaType;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ArticleMediaTypeResource articleMediaTypeResource = new ArticleMediaTypeResource(articleMediaTypeRepository);
        this.restArticleMediaTypeMockMvc = MockMvcBuilders.standaloneSetup(articleMediaTypeResource)
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
    public static ArticleMediaType createEntity(EntityManager em) {
        ArticleMediaType articleMediaType = new ArticleMediaType()
            .code(DEFAULT_CODE);
        return articleMediaType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ArticleMediaType createUpdatedEntity(EntityManager em) {
        ArticleMediaType articleMediaType = new ArticleMediaType()
            .code(UPDATED_CODE);
        return articleMediaType;
    }

    @BeforeEach
    public void initTest() {
        articleMediaType = createEntity(em);
    }

    @Test
    @Transactional
    public void createArticleMediaType() throws Exception {
        int databaseSizeBeforeCreate = articleMediaTypeRepository.findAll().size();

        // Create the ArticleMediaType
        restArticleMediaTypeMockMvc.perform(post("/api/article-media-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleMediaType)))
            .andExpect(status().isCreated());

        // Validate the ArticleMediaType in the database
        List<ArticleMediaType> articleMediaTypeList = articleMediaTypeRepository.findAll();
        assertThat(articleMediaTypeList).hasSize(databaseSizeBeforeCreate + 1);
        ArticleMediaType testArticleMediaType = articleMediaTypeList.get(articleMediaTypeList.size() - 1);
        assertThat(testArticleMediaType.getCode()).isEqualTo(DEFAULT_CODE);
    }

    @Test
    @Transactional
    public void createArticleMediaTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = articleMediaTypeRepository.findAll().size();

        // Create the ArticleMediaType with an existing ID
        articleMediaType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArticleMediaTypeMockMvc.perform(post("/api/article-media-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleMediaType)))
            .andExpect(status().isBadRequest());

        // Validate the ArticleMediaType in the database
        List<ArticleMediaType> articleMediaTypeList = articleMediaTypeRepository.findAll();
        assertThat(articleMediaTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = articleMediaTypeRepository.findAll().size();
        // set the field null
        articleMediaType.setCode(null);

        // Create the ArticleMediaType, which fails.

        restArticleMediaTypeMockMvc.perform(post("/api/article-media-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleMediaType)))
            .andExpect(status().isBadRequest());

        List<ArticleMediaType> articleMediaTypeList = articleMediaTypeRepository.findAll();
        assertThat(articleMediaTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllArticleMediaTypes() throws Exception {
        // Initialize the database
        articleMediaTypeRepository.saveAndFlush(articleMediaType);

        // Get all the articleMediaTypeList
        restArticleMediaTypeMockMvc.perform(get("/api/article-media-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(articleMediaType.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())));
    }
    
    @Test
    @Transactional
    public void getArticleMediaType() throws Exception {
        // Initialize the database
        articleMediaTypeRepository.saveAndFlush(articleMediaType);

        // Get the articleMediaType
        restArticleMediaTypeMockMvc.perform(get("/api/article-media-types/{id}", articleMediaType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(articleMediaType.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingArticleMediaType() throws Exception {
        // Get the articleMediaType
        restArticleMediaTypeMockMvc.perform(get("/api/article-media-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArticleMediaType() throws Exception {
        // Initialize the database
        articleMediaTypeRepository.saveAndFlush(articleMediaType);

        int databaseSizeBeforeUpdate = articleMediaTypeRepository.findAll().size();

        // Update the articleMediaType
        ArticleMediaType updatedArticleMediaType = articleMediaTypeRepository.findById(articleMediaType.getId()).get();
        // Disconnect from session so that the updates on updatedArticleMediaType are not directly saved in db
        em.detach(updatedArticleMediaType);
        updatedArticleMediaType
            .code(UPDATED_CODE);

        restArticleMediaTypeMockMvc.perform(put("/api/article-media-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedArticleMediaType)))
            .andExpect(status().isOk());

        // Validate the ArticleMediaType in the database
        List<ArticleMediaType> articleMediaTypeList = articleMediaTypeRepository.findAll();
        assertThat(articleMediaTypeList).hasSize(databaseSizeBeforeUpdate);
        ArticleMediaType testArticleMediaType = articleMediaTypeList.get(articleMediaTypeList.size() - 1);
        assertThat(testArticleMediaType.getCode()).isEqualTo(UPDATED_CODE);
    }

    @Test
    @Transactional
    public void updateNonExistingArticleMediaType() throws Exception {
        int databaseSizeBeforeUpdate = articleMediaTypeRepository.findAll().size();

        // Create the ArticleMediaType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArticleMediaTypeMockMvc.perform(put("/api/article-media-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleMediaType)))
            .andExpect(status().isBadRequest());

        // Validate the ArticleMediaType in the database
        List<ArticleMediaType> articleMediaTypeList = articleMediaTypeRepository.findAll();
        assertThat(articleMediaTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteArticleMediaType() throws Exception {
        // Initialize the database
        articleMediaTypeRepository.saveAndFlush(articleMediaType);

        int databaseSizeBeforeDelete = articleMediaTypeRepository.findAll().size();

        // Delete the articleMediaType
        restArticleMediaTypeMockMvc.perform(delete("/api/article-media-types/{id}", articleMediaType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<ArticleMediaType> articleMediaTypeList = articleMediaTypeRepository.findAll();
        assertThat(articleMediaTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ArticleMediaType.class);
        ArticleMediaType articleMediaType1 = new ArticleMediaType();
        articleMediaType1.setId(1L);
        ArticleMediaType articleMediaType2 = new ArticleMediaType();
        articleMediaType2.setId(articleMediaType1.getId());
        assertThat(articleMediaType1).isEqualTo(articleMediaType2);
        articleMediaType2.setId(2L);
        assertThat(articleMediaType1).isNotEqualTo(articleMediaType2);
        articleMediaType1.setId(null);
        assertThat(articleMediaType1).isNotEqualTo(articleMediaType2);
    }
}
