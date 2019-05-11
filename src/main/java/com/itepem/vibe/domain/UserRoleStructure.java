package com.itepem.vibe.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A UserRoleStructure.
 */
@Entity
@Table(name = "user_role_structure")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserRoleStructure implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "user_role_structure_user",
               joinColumns = @JoinColumn(name = "user_role_structure_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    private Set<User> users = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "user_role_structure_role",
               joinColumns = @JoinColumn(name = "user_role_structure_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<Role> roles = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "user_role_structure_structure",
               joinColumns = @JoinColumn(name = "user_role_structure_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "structure_id", referencedColumnName = "id"))
    private Set<Structure> structures = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<User> getUsers() {
        return users;
    }

    public UserRoleStructure users(Set<User> users) {
        this.users = users;
        return this;
    }

    public UserRoleStructure addUser(User user) {
        this.users.add(user);
        return this;
    }

    public UserRoleStructure removeUser(User user) {
        this.users.remove(user);
        return this;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public UserRoleStructure roles(Set<Role> roles) {
        this.roles = roles;
        return this;
    }

    public UserRoleStructure addRole(Role role) {
        this.roles.add(role);
        role.getUserRoleStructures().add(this);
        return this;
    }

    public UserRoleStructure removeRole(Role role) {
        this.roles.remove(role);
        role.getUserRoleStructures().remove(this);
        return this;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Set<Structure> getStructures() {
        return structures;
    }

    public UserRoleStructure structures(Set<Structure> structures) {
        this.structures = structures;
        return this;
    }

    public UserRoleStructure addStructure(Structure structure) {
        this.structures.add(structure);
        structure.getUserRoleStructures().add(this);
        return this;
    }

    public UserRoleStructure removeStructure(Structure structure) {
        this.structures.remove(structure);
        structure.getUserRoleStructures().remove(this);
        return this;
    }

    public void setStructures(Set<Structure> structures) {
        this.structures = structures;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserRoleStructure)) {
            return false;
        }
        return id != null && id.equals(((UserRoleStructure) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserRoleStructure{" +
            "id=" + getId() +
            "}";
    }
}
