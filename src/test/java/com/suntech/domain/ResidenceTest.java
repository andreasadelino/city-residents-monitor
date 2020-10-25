//package com.suntech.domain;
//
//import org.junit.jupiter.api.Test;
//import static org.assertj.core.api.Assertions.assertThat;
//import com.suntech.web.rest.TestUtil;
//
//public class ResidenceTest {
//
//    @Test
//    public void equalsVerifier() throws Exception {
//        TestUtil.equalsVerifier(Residence.class);
//        Residence residence1 = new Residence();
//        residence1.setId(1L);
//        Residence residence2 = new Residence();
//        residence2.setId(residence1.getId());
//        assertThat(residence1).isEqualTo(residence2);
//        residence2.setId(2L);
//        assertThat(residence1).isNotEqualTo(residence2);
//        residence1.setId(null);
//        assertThat(residence1).isNotEqualTo(residence2);
//    }
//}
