package ru.sinitsynme.turingapi.rest.dto;

public class AlgorythmResponseDto {

    private String id;
    private String name;
    private boolean isBasic;

    public AlgorythmResponseDto() {
    }

    public AlgorythmResponseDto(String id, String name, boolean isBasic) {
        this.id = id;
        this.name = name;
        this.isBasic = isBasic;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isBasic() {
        return isBasic;
    }

    public void setBasic(boolean basic) {
        isBasic = basic;
    }
}
