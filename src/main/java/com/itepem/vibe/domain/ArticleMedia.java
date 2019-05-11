package com.itepem.vibe.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ArticleMedia.
 */
@Entity
@Table(name = "article_media")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ArticleMedia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne
    @JsonIgnoreProperties("articleMedias")
    private Article article;

    @ManyToOne
    @JsonIgnoreProperties("articleMedias")
    private ArticleMediaType articleMediaType;

    @ManyToOne
    @JsonIgnoreProperties("articleMedias")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public ArticleMedia name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Article getArticle() {
        return article;
    }

    public ArticleMedia article(Article article) {
        this.article = article;
        return this;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public ArticleMediaType getArticleMediaType() {
        return articleMediaType;
    }

    public ArticleMedia articleMediaType(ArticleMediaType articleMediaType) {
        this.articleMediaType = articleMediaType;
        return this;
    }

    public void setArticleMediaType(ArticleMediaType articleMediaType) {
        this.articleMediaType = articleMediaType;
    }

    public User getUser() {
        return user;
    }

    public ArticleMedia user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ArticleMedia)) {
            return false;
        }
        return id != null && id.equals(((ArticleMedia) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ArticleMedia{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
