package com.suntech.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.UUID;

/**
 * A Residence.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "residence")
public class Residence implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Pattern(regexp = "\\d{8}")
    @Column(name = "zipcode")
    private String zipcode;

    @Pattern(regexp = "\\d{1,4}")
    @Column(name = "street_number")
    private String streetNumber;

    @NotNull
    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @NotNull
    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @NotNull
    @Column(name = "residents", nullable = false)
    private Integer residents;


    // jhipster-needle-entity-add-field - JHipster will add fields here


    public String getZipcode() {
        return zipcode;
    }

    public Residence zipcode(String zipcode) {
        this.zipcode = zipcode;
        return this;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public String getStreetNumber() {
        return streetNumber;
    }

    public Residence streetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
        return this;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Residence latitude(Double latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public Residence longitude(Double longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Integer getResidents() {
        return residents;
    }

    public Residence residents(Integer residents) {
        this.residents = residents;
        return this;
    }

    public void setResidents(Integer residents) {
        this.residents = residents;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID uid) {
        this.id = uid;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Residence)) {
            return false;
        }
        return id != null && id.equals(((Residence) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Residence{" +
            "id=" + getId() +
            ", zipcode='" + getZipcode() + "'" +
            ", streetNumber='" + getStreetNumber() + "'" +
            ", latitude=" + getLatitude() +
            ", longitude=" + getLongitude() +
            ", residents=" + getResidents() +
            "}";
    }
}
