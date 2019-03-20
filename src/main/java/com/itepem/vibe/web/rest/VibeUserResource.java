package com.itepem.vibe.web.rest;
import com.itepem.vibe.domain.VibeUser;
import com.itepem.vibe.repository.VibeUserRepository;
import com.itepem.vibe.web.rest.errors.BadRequestAlertException;
import com.itepem.vibe.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing VibeUser.
 */
@RestController
@RequestMapping("/api")
public class VibeUserResource {

    private final Logger log = LoggerFactory.getLogger(VibeUserResource.class);

    private static final String ENTITY_NAME = "vibeUser";

    private final VibeUserRepository vibeUserRepository;

    public VibeUserResource(VibeUserRepository vibeUserRepository) {
        this.vibeUserRepository = vibeUserRepository;
    }

    /**
     * POST  /vibe-users : Create a new vibeUser.
     *
     * @param vibeUser the vibeUser to create
     * @return the ResponseEntity with status 201 (Created) and with body the new vibeUser, or with status 400 (Bad Request) if the vibeUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/vibe-users")
    public ResponseEntity<VibeUser> createVibeUser(@Valid @RequestBody VibeUser vibeUser) throws URISyntaxException {
        log.debug("REST request to save VibeUser : {}", vibeUser);
        if (vibeUser.getId() != null) {
            throw new BadRequestAlertException("A new vibeUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VibeUser result = vibeUserRepository.save(vibeUser);
        return ResponseEntity.created(new URI("/api/vibe-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /vibe-users : Updates an existing vibeUser.
     *
     * @param vibeUser the vibeUser to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated vibeUser,
     * or with status 400 (Bad Request) if the vibeUser is not valid,
     * or with status 500 (Internal Server Error) if the vibeUser couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vibe-users")
    public ResponseEntity<VibeUser> updateVibeUser(@Valid @RequestBody VibeUser vibeUser) throws URISyntaxException {
        log.debug("REST request to update VibeUser : {}", vibeUser);
        if (vibeUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VibeUser result = vibeUserRepository.save(vibeUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, vibeUser.getId().toString()))
            .body(result);
    }

    /**
     * GET  /vibe-users : get all the vibeUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of vibeUsers in body
     */
    @GetMapping("/vibe-users")
    public List<VibeUser> getAllVibeUsers() {
        log.debug("REST request to get all VibeUsers");
        return vibeUserRepository.findAll();
    }

    /**
     * GET  /vibe-users/:id : get the "id" vibeUser.
     *
     * @param id the id of the vibeUser to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the vibeUser, or with status 404 (Not Found)
     */
    @GetMapping("/vibe-users/{id}")
    public ResponseEntity<VibeUser> getVibeUser(@PathVariable Long id) {
        log.debug("REST request to get VibeUser : {}", id);
        Optional<VibeUser> vibeUser = vibeUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vibeUser);
    }

    /**
     * DELETE  /vibe-users/:id : delete the "id" vibeUser.
     *
     * @param id the id of the vibeUser to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/vibe-users/{id}")
    public ResponseEntity<Void> deleteVibeUser(@PathVariable Long id) {
        log.debug("REST request to delete VibeUser : {}", id);
        vibeUserRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
