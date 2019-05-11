package com.itepem.vibe.web.rest;

import com.itepem.vibe.domain.ExtendedUser;
import com.itepem.vibe.repository.ExtendedUserRepository;
import com.itepem.vibe.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.itepem.vibe.domain.ExtendedUser}.
 */
@RestController
@RequestMapping("/api")
public class ExtendedUserResource {

    private final Logger log = LoggerFactory.getLogger(ExtendedUserResource.class);

    private static final String ENTITY_NAME = "extendedUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExtendedUserRepository extendedUserRepository;

    public ExtendedUserResource(ExtendedUserRepository extendedUserRepository) {
        this.extendedUserRepository = extendedUserRepository;
    }

    /**
     * {@code POST  /extended-users} : Create a new extendedUser.
     *
     * @param extendedUser the extendedUser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new extendedUser, or with status {@code 400 (Bad Request)} if the extendedUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/extended-users")
    public ResponseEntity<ExtendedUser> createExtendedUser(@RequestBody ExtendedUser extendedUser) throws URISyntaxException {
        log.debug("REST request to save ExtendedUser : {}", extendedUser);
        if (extendedUser.getId() != null) {
            throw new BadRequestAlertException("A new extendedUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExtendedUser result = extendedUserRepository.save(extendedUser);
        return ResponseEntity.created(new URI("/api/extended-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /extended-users} : Updates an existing extendedUser.
     *
     * @param extendedUser the extendedUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated extendedUser,
     * or with status {@code 400 (Bad Request)} if the extendedUser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the extendedUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/extended-users")
    public ResponseEntity<ExtendedUser> updateExtendedUser(@RequestBody ExtendedUser extendedUser) throws URISyntaxException {
        log.debug("REST request to update ExtendedUser : {}", extendedUser);
        if (extendedUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ExtendedUser result = extendedUserRepository.save(extendedUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, extendedUser.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /extended-users} : get all the extendedUsers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of extendedUsers in body.
     */
    @GetMapping("/extended-users")
    public List<ExtendedUser> getAllExtendedUsers() {
        log.debug("REST request to get all ExtendedUsers");
        return extendedUserRepository.findAll();
    }

    /**
     * {@code GET  /extended-users/:id} : get the "id" extendedUser.
     *
     * @param id the id of the extendedUser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the extendedUser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/extended-users/{id}")
    public ResponseEntity<ExtendedUser> getExtendedUser(@PathVariable Long id) {
        log.debug("REST request to get ExtendedUser : {}", id);
        Optional<ExtendedUser> extendedUser = extendedUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(extendedUser);
    }

    /**
     * {@code DELETE  /extended-users/:id} : delete the "id" extendedUser.
     *
     * @param id the id of the extendedUser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/extended-users/{id}")
    public ResponseEntity<Void> deleteExtendedUser(@PathVariable Long id) {
        log.debug("REST request to delete ExtendedUser : {}", id);
        extendedUserRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
