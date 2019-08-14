package com.itepem.vibe.repository;

import com.itepem.vibe.domain.Role;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Role entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    @Query("select role from Role role join UserRoleStructure user_role_structure on user_role_structure.role.id = role.id where user_role_structure.user.id =:userId and user_role_structure.structure.id =:structureId")
    Role getRoleByUserAndStructure(@Param("userId") Long userId, @Param("structureId") Long structureId);

    @Query("select role from Role role where role.name =:roleName")
    Role getRoleByName(@Param("roleName") String roleName);
}
