package com.itepem.vibe.web.rest;
import com.itepem.vibe.domain.Structure;
import com.itepem.vibe.repository.StructureRepository;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing Structure.
 */
@RestController
@RequestMapping("/api")
public class StructureResource {

    private final Logger log = LoggerFactory.getLogger(StructureResource.class);

    private static final String ENTITY_NAME = "structure";

    private final StructureRepository structureRepository;

    public StructureResource(StructureRepository structureRepository) {
        this.structureRepository = structureRepository;
    }

    /**
     * POST  /structures : Create a new structure.
     *
     * @param structure the structure to create
     * @return the ResponseEntity with status 201 (Created) and with body the new structure, or with status 400 (Bad Request) if the structure has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/structures")
    public ResponseEntity<Structure> createStructure(@Valid @RequestBody Structure structure) throws URISyntaxException {
        log.debug("REST request to save Structure : {}", structure);
        if (structure.getId() != null) {
            throw new BadRequestAlertException("A new structure cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Structure result = structureRepository.save(structure);
        return ResponseEntity.created(new URI("/api/structures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /structures : Updates an existing structure.
     *
     * @param structure the structure to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated structure,
     * or with status 400 (Bad Request) if the structure is not valid,
     * or with status 500 (Internal Server Error) if the structure couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/structures")
    public ResponseEntity<Structure> updateStructure(@Valid @RequestBody Structure structure) throws URISyntaxException {
        log.debug("REST request to update Structure : {}", structure);
        if (structure.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Structure result = structureRepository.save(structure);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, structure.getId().toString()))
            .body(result);
    }

    /**
     * GET  /structures : get all the structures.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of structures in body
     */
    @GetMapping("/structures")
    public List<Structure> getAllStructures(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Structures");
        return structureRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /structures/labels : get all the structure names.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of structures in body
     */
    @GetMapping("/structures/names")
    public List<String> getAllStructureNames(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Structures");
        List<Structure> structureList = structureRepository.findAllWithEagerRelationships();
        if(!structureList.isEmpty()) {
            List<String> structureNameList = structureList.stream().map(Structure::getName).collect(Collectors.toList());
            return structureNameList;
        }
        return new ArrayList<>();
    }

    /**
     * GET  /structures/:id : get the "id" structure.
     *
     * @param id the id of the structure to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the structure, or with status 404 (Not Found)
     */
    @GetMapping("/structures/{id}")
    public ResponseEntity<Structure> getStructure(@PathVariable Long id) {
        log.debug("REST request to get Structure : {}", id);
        Optional<Structure> structure = structureRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(structure);
    }

    /**
     * DELETE  /structures/:id : delete the "id" structure.
     *
     * @param id the id of the structure to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/structures/{id}")
    public ResponseEntity<Void> deleteStructure(@PathVariable Long id) {
        log.debug("REST request to delete Structure : {}", id);
        structureRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
