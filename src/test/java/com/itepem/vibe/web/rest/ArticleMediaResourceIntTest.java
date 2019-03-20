package com.itepem.vibe.web.rest;

import com.itepem.vibe.VibeApp;

import com.itepem.vibe.domain.ArticleMedia;
import com.itepem.vibe.repository.ArticleMediaRepository;
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

import com.itepem.vibe.domain.enumeration.ArticleMediaType;
/**
 * Test class for the ArticleMediaResource REST controller.
 *
 * @see ArticleMediaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VibeApp.class)
public class ArticleMediaResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final ArticleMediaType DEFAULT_ARTICLE_MEDIA_TYPE = ArticleMediaType.IMAGE;
    private static final ArticleMediaType UPDATED_ARTICLE_MEDIA_TYPE = ArticleMediaType.PDF;

    @Autowired
    private ArticleMediaRepository articleMediaRepository;

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

    private MockMvc restArticleMediaMockMvc;

    private ArticleMedia articleMedia;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ArticleMediaResource articleMediaResource = new ArticleMediaResource(articleMediaRepository);
        this.restArticleMediaMockMvc = MockMvcBuilders.standaloneSetup(articleMediaResource)
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
    public static ArticleMedia createEntity(EntityManager em) {
        ArticleMedia articleMedia = new ArticleMedia()
            .name(DEFAULT_NAME)
            .articleMediaType(DEFAULT_ARTICLE_MEDIA_TYPE);
        return articleMedia;
    }

    @Before
    public void initTest() {
        articleMedia = createEntity(em);
    }

    @Test
    @Transactional
    public void createArticleMedia() throws Exception {
        int databaseSizeBeforeCreate = articleMediaRepository.findAll().size();

        // Create the ArticleMedia
        restArticleMediaMockMvc.perform(post("/api/article-medias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleMedia)))
            .andExpect(status().isCreated());

        // Validate the ArticleMedia in the database
        List<ArticleMedia> articleMediaList = articleMediaRepository.findAll();
        assertThat(articleMediaList).hasSize(databaseSizeBeforeCreate + 1);
        ArticleMedia testArticleMedia = articleMediaList.get(articleMediaList.size() - 1);
        assertThat(testArticleMedia.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testArticleMedia.getArticleMediaType()).isEqualTo(DEFAULT_ARTICLE_MEDIA_TYPE);
    }

    @Test
    @Transactional
    public void createArticleMediaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = articleMediaRepository.findAll().size();

        // Create the ArticleMedia with an existing ID
        articleMedia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArticleMediaMockMvc.perform(post("/api/article-medias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleMedia)))
            .andExpect(status().isBadRequest());

        // Validate the ArticleMedia in the database
        List<ArticleMedia> articleMediaList = articleMediaRepository.findAll();
        assertThat(articleMediaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = articleMediaRepository.findAll().size();
        // set the field null
        articleMedia.setName(null);

        // Create the ArticleMedia, which fails.

        restArticleMediaMockMvc.perform(post("/api/article-medias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleMedia)))
            .andExpect(status().isBadRequest());

        List<ArticleMedia> articleMediaList = articleMediaRepository.findAll();
        assertThat(articleMediaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkArticleMediaTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = articleMediaRepository.findAll().size();
        // set the field null
        articleMedia.setArticleMediaType(null);

        // Create the ArticleMedia, which fails.

        restArticleMediaMockMvc.perform(post("/api/article-medias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleMedia)))
            .andExpect(status().isBadRequest());

        List<ArticleMedia> articleMediaList = articleMediaRepository.findAll();
        assertThat(articleMediaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllArticleMedias() throws Exception {
        // Initialize the database
        articleMediaRepository.saveAndFlush(articleMedia);

        // Get all the articleMediaList
        restArticleMediaMockMvc.perform(get("/api/article-medias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(articleMedia.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].articleMediaType").value(hasItem(DEFAULT_ARTICLE_MEDIA_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getArticleMedia() throws Exception {
        // Initialize the database
        articleMediaRepository.saveAndFlush(articleMedia);

        // Get the articleMedia
        restArticleMediaMockMvc.perform(get("/api/article-medias/{id}", articleMedia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(articleMedia.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.articleMediaType").value(DEFAULT_ARTICLE_MEDIA_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingArticleMedia() throws Exception {
        // Get the articleMedia
        restArticleMediaMockMvc.perform(get("/api/article-medias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArticleMedia() throws Exception {
        // Initialize the database
        articleMediaRepository.saveAndFlush(articleMedia);

        int databaseSizeBeforeUpdate = articleMediaRepository.findAll().size();

        // Update the articleMedia
        ArticleMedia updatedArticleMedia = articleMediaRepository.findById(articleMedia.getId()).get();
        // Disconnect from session so that the updates on updatedArticleMedia are not directly saved in db
        em.detach(updatedArticleMedia);
        updatedArticleMedia
            .name(UPDATED_NAME)
            .articleMediaType(UPDATED_ARTICLE_MEDIA_TYPE);

        restArticleMediaMockMvc.perform(put("/api/article-medias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedArticleMedia)))
            .andExpect(status().isOk());

        // Validate the ArticleMedia in the database
        List<ArticleMedia> articleMediaList = articleMediaRepository.findAll();
        assertThat(articleMediaList).hasSize(databaseSizeBeforeUpdate);
        ArticleMedia testArticleMedia = articleMediaList.get(articleMediaList.size() - 1);
        assertThat(testArticleMedia.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testArticleMedia.getArticleMediaType()).isEqualTo(UPDATED_ARTICLE_MEDIA_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingArticleMedia() throws Exception {
        int databaseSizeBeforeUpdate = articleMediaRepository.findAll().size();

        // Create the ArticleMedia

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArticleMediaMockMvc.perform(put("/api/article-medias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleMedia)))
            .andExpect(status().isBadRequest());

        // Validate the ArticleMedia in the database
        List<ArticleMedia> articleMediaList = articleMediaRepository.findAll();
        assertThat(articleMediaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteArticleMedia() throws Exception {
        // Initialize the database
        articleMediaRepository.saveAndFlush(articleMedia);

        int databaseSizeBeforeDelete = articleMediaRepository.findAll().size();

        // Delete the articleMedia
        restArticleMediaMockMvc.perform(delete("/api/article-medias/{id}", articleMedia.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ArticleMedia> articleMediaList = articleMediaRepository.findAll();
        assertThat(articleMediaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ArticleMedia.class);
        ArticleMedia articleMedia1 = new ArticleMedia();
        articleMedia1.setId(1L);
        ArticleMedia articleMedia2 = new ArticleMedia();
        articleMedia2.setId(articleMedia1.getId());
        assertThat(articleMedia1).isEqualTo(articleMedia2);
        articleMedia2.setId(2L);
        assertThat(articleMedia1).isNotEqualTo(articleMedia2);
        articleMedia1.setId(null);
        assertThat(articleMedia1).isNotEqualTo(articleMedia2);
    }
}
