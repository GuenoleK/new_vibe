package com.itepem.vibe.domain.enumeration;

/**
 * The RoleType enumeration.
 */
public enum RoleEnum {
    ADMIN("ADMIN"),
    VIEWER("VIEWER"),
    EDITOR("EDITOR"),
    MANAGER("MANAGER");

    private String code;

    RoleEnum(String code) {
        this.code = code;
    }
}
