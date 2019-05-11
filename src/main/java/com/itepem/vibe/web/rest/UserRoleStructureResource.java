package com.itepem.vibe.web.rest;

import com.itepem.vibe.domain.UserRoleStructure;
import com.itepem.vibe.repository.UserRoleStructureRepository;
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
 * REST controller for managing {@link com.itepem.vibe.domain.UserRoleStructure}.
 */
@RestController
@RequestMapping("/api")
public class UserRoleStructureResource {

    private final Logger log = LoggerFactory.getLogger(UserRoleStructureResource.class);

    private static final String ENTITY_NAME = "userRoleStructure";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserRoleStructureRepository userRoleStructureRepository;

    public UserRoleStructureResource(UserRoleStructureRepository userRoleStructureRepository) {
        this.userRoleStructureRepository = userRoleStructureRepository;
    }

    /**
     * {@code POST  /user-role-structures} : Create a new userRoleStructure.
     *
     * @param userRoleStructure the userRoleStructure to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userRoleStructure, or with status {@code 400 (Bad Request)} if the userRoleStructure has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-role-structures")
    public ResponseEntity<UserRoleStructure> createUserRoleStructure(@RequestBody UserRoleStructure userRoleStructure) throws URISyntaxException {
        log.debug("REST request to save UserRoleStructure : {}", userRoleStructure);
        if (userRoleStructure.getId() != null) {
            throw new BadRequestAlertException("A new userRoleStructure cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserRoleStructure result = userRoleStructureRepository.save(userRoleStructure);
        return ResponseEntity.created(new URI("/api/user-role-structures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-role-structures} : Updates an existing userRoleStructure.
     *
     * @param userRoleStructure the userRoleStructure to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userRoleStructure,
     * or with status {@code 400 (Bad Request)} if the userRoleStructure is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userRoleStructure couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-role-structures")
    public ResponseEntity<UserRoleStructure> updateUserRoleStructure(@RequestBody UserRoleStructure userRoleStructure) throws URISyntaxException {
        log.debug("REST request to update UserRoleStructure : {}", userRoleStructure);
        if (userRoleStructure.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserRoleStructure result = userRoleStructureRepository.save(userRoleStructure);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userRoleStructure.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-role-structures} : get all the userRoleStructures.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userRoleStructures in body.
     */
    @GetMapping("/user-role-structures")
    public List<UserRoleStructure> getAllUserRoleStructures(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all UserRoleStructures");
        return userRoleStructureRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /user-role-structures/:id} : get the "id" userRoleStructure.
     *
     * @param id the id of the userRoleStructure to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userRoleStructure, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-role-structures/{id}")
    public ResponseEntity<UserRoleStructure> getUserRoleStructure(@PathVariable Long id) {
        log.debug("REST request to get UserRoleStructure : {}", id);
        Optional<UserRoleStructure> userRoleStructure = userRoleStructureRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(userRoleStructure);
    }

    /**
     * {@code DELETE  /user-role-structures/:id} : delete the "id" userRoleStructure.
     *
     * @param id the id of the userRoleStructure to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-role-structures/{id}")
    public ResponseEntity<Void> deleteUserRoleStructure(@PathVariable Long id) {
        log.debug("REST request to delete UserRoleStructure : {}", id);
        userRoleStructureRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
