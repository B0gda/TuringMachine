package ru.sinitsynme.turingapi.entity;

import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;

public enum MoveCaretOption {
    LEFT('L'),
    RIGHT('R'),
    NO_MOVE('N');

    private Character alias;
    private static final MoveCaretOption[] VALUES = values();

    MoveCaretOption(Character alias) {
        this.alias = alias;
    }

    public static MoveCaretOption parseFromAlias(Character alias) {
        return Arrays.stream(VALUES)
                .filter(it -> it.alias == alias)
                .findAny()
                .orElseThrow(() -> new IllegalArgumentException("Eligible arguments are 'L', 'R' and 'N'"));
    }

    @JsonValue
    public Character getAlias() {
        return alias;
    }
}
